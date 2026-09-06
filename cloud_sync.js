// cloud_sync.js - 慕喜乐夫妻营全自动云端数据同步引擎
// 支持标准 REST API (Supabase / LeanCloud)，无需任何第三方库，微信及全浏览器秒速打通

var CloudSync = (typeof window !== "undefined" && window.CloudSync) ? window.CloudSync : {
  getConfig() {
    let cfg = (typeof window !== "undefined" && window.CLOUD_CONFIG) ? window.CLOUD_CONFIG : {};
    try {
      if (typeof localStorage !== "undefined") {
        const local = localStorage.getItem("MXL_CLOUD_CONFIG");
        if (local) {
          const parsed = JSON.parse(local);
          cfg = Object.assign({}, cfg, parsed);
        }
      }
    } catch(e) {}
    return cfg;
  },

  saveConfig(newCfg) {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("MXL_CLOUD_CONFIG", JSON.stringify(newCfg));
      }
      if (typeof window !== "undefined") {
        window.CLOUD_CONFIG = Object.assign({}, window.CLOUD_CONFIG || {}, newCfg);
      }
      return true;
    } catch(e) {
      return false;
    }
  },

  isConfigured() {
    const cfg = this.getConfig();
    if (cfg.provider === "supabase") {
      return !!(cfg.supabaseUrl && cfg.supabaseKey);
    } else if (cfg.provider === "leancloud") {
      return !!(cfg.appId && cfg.appKey);
    }
    return false;
  },

  // 保存客户档案（支持夫妻双方答卷智能无损合并）
  async saveCase(caseObj) {
    if (!this.isConfigured()) return { success: false, reason: "unconfigured" };
    const cfg = this.getConfig();
    const code = caseObj.code;
    if (!code) return { success: false, reason: "no_code" };

    try {
      if (cfg.provider === "supabase") {
        const baseUrl = cfg.supabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
        const key = cfg.supabaseKey;

        // 1. 先查询云端是否已有该记录（防止第二位伴侣提交时冲掉前一位的数据）
        let existingData = {};
        try {
          const checkRes = await fetch(baseUrl + "/rest/v1/mxl_cases?code=eq." + encodeURIComponent(code) + "&select=*", {
            method: "GET",
            headers: {
              "apikey": key,
              "Authorization": "Bearer " + key
            }
          });
          if (checkRes.ok) {
            const list = await checkRes.json();
            if (list && list.length > 0 && list[0].data) {
              existingData = list[0].data;
            }
          }
        } catch(e) {}

        // 深度合并双人数据
        const mergedCase = Object.assign({}, existingData, caseObj);
        if (existingData.wife && caseObj.wife) mergedCase.wife = Object.assign({}, existingData.wife, caseObj.wife);
        else if (existingData.wife && !caseObj.wife) mergedCase.wife = existingData.wife;

        if (existingData.husband && caseObj.husband) mergedCase.husband = Object.assign({}, existingData.husband, caseObj.husband);
        else if (existingData.husband && !caseObj.husband) mergedCase.husband = existingData.husband;

        // 2. 写入或合并更新
        const payload = {
          code: code,
          data: mergedCase,
          updated_at: new Date().toISOString()
        };

        const postRes = await fetch(baseUrl + "/rest/v1/mxl_cases", {
          method: "POST",
          headers: {
            "apikey": key,
            "Authorization": "Bearer " + key,
            "Content-Type": "application/json",
            "Prefer": "resolution=merge-duplicates"
          },
          body: JSON.stringify(payload)
        });

        if (postRes.ok) {
          return { success: true, data: mergedCase };
        } else {
          const errTxt = await postRes.text();
          return { success: false, error: errTxt };
        }
      } else if (cfg.provider === "leancloud") {
        const appId = cfg.appId;
        const appKey = cfg.appKey;
        const serverUrl = (cfg.serverURL || "").replace(/\/+$/, "") || ("https://" + appId.slice(0, 8) + ".api.lncldglobal.com");

        let objectId = null;
        let existingData = {};
        try {
          const qUrl = serverUrl + "/1.1/classes/MxlCase?where=" + encodeURIComponent(JSON.stringify({ code: code }));
          const qRes = await fetch(qUrl, {
            headers: {
              "X-LC-Id": appId,
              "X-LC-Key": appKey,
              "Content-Type": "application/json"
            }
          });
          if (qRes.ok) {
            const json = await qRes.json();
            if (json.results && json.results.length > 0) {
              objectId = json.results[0].objectId;
              existingData = json.results[0].data || {};
            }
          }
        } catch(e) {}

        const mergedCase = Object.assign({}, existingData, caseObj);
        if (existingData.wife && caseObj.wife) mergedCase.wife = Object.assign({}, existingData.wife, caseObj.wife);
        else if (existingData.wife && !caseObj.wife) mergedCase.wife = existingData.wife;

        if (existingData.husband && caseObj.husband) mergedCase.husband = Object.assign({}, existingData.husband, caseObj.husband);
        else if (existingData.husband && !caseObj.husband) mergedCase.husband = existingData.husband;

        if (objectId) {
          const putRes = await fetch(serverUrl + "/1.1/classes/MxlCase/" + objectId, {
            method: "PUT",
            headers: {
              "X-LC-Id": appId,
              "X-LC-Key": appKey,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: mergedCase })
          });
          return { success: putRes.ok, data: mergedCase };
        } else {
          const postRes = await fetch(serverUrl + "/1.1/classes/MxlCase", {
            method: "POST",
            headers: {
              "X-LC-Id": appId,
              "X-LC-Key": appKey,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ code: code, data: mergedCase })
          });
          return { success: postRes.ok, data: mergedCase };
        }
      }
    } catch(err) {
      console.warn("Cloud save failed:", err);
      return { success: false, error: err.message };
    }
  },

  // 获取云端全部档案列表并同步合并到本地
  async fetchAllCases() {
    if (!this.isConfigured()) return { success: false, reason: "unconfigured" };
    const cfg = this.getConfig();

    try {
      let cases = [];
      if (cfg.provider === "supabase") {
        const baseUrl = cfg.supabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
        const key = cfg.supabaseKey;
        const res = await fetch(baseUrl + "/rest/v1/mxl_cases?select=*&order=updated_at.desc&limit=200", {
          method: "GET",
          headers: {
            "apikey": key,
            "Authorization": "Bearer " + key
          }
        });
        if (res.ok) {
          const rows = await res.json();
          cases = rows.map(r => r.data).filter(Boolean);
        } else {
          return { success: false, error: await res.text() };
        }
      } else if (cfg.provider === "leancloud") {
        const appId = cfg.appId;
        const appKey = cfg.appKey;
        const serverUrl = (cfg.serverURL || "").replace(/\/+$/, "") || ("https://" + appId.slice(0, 8) + ".api.lncldglobal.com");
        const res = await fetch(serverUrl + "/1.1/classes/MxlCase?order=-updatedAt&limit=200", {
          headers: {
            "X-LC-Id": appId,
            "X-LC-Key": appKey,
            "Content-Type": "application/json"
          }
        });
        if (res.ok) {
          const json = await res.json();
          cases = (json.results || []).map(r => r.data).filter(Boolean);
        } else {
          return { success: false, error: await res.text() };
        }
      }

      // 将云端最新档案同步合并入本地 localStorage
      let indexList = [];
      try { indexList = JSON.parse(localStorage.getItem("MXL_CASE_INDEX") || "[]"); } catch(e) {}
      let newCount = 0;

      cases.forEach(c => {
        if (!c || !c.code) return;
        const code = c.code;
        const localRaw = localStorage.getItem("MXL_CASE_" + code);
        let merged = c;
        if (localRaw) {
          try {
            const old = JSON.parse(localRaw);
            merged = Object.assign({}, old, c);
            if (old.wife && c.wife) merged.wife = Object.assign({}, old.wife, c.wife);
            else if (old.wife && !c.wife) merged.wife = old.wife;

            if (old.husband && c.husband) merged.husband = Object.assign({}, old.husband, c.husband);
            else if (old.husband && !c.husband) merged.husband = old.husband;
          } catch(e) {}
        }
        localStorage.setItem("MXL_CASE_" + code, JSON.stringify(merged));
        if (!indexList.includes(code)) {
          indexList.unshift(code);
          newCount++;
        }
      });

      localStorage.setItem("MXL_CASE_INDEX", JSON.stringify(indexList));
      return { success: true, count: cases.length, newCount: newCount, cases: cases };
    } catch(err) {
      console.warn("Cloud fetch failed:", err);
      return { success: false, error: err.message };
    }
  },

  // 根据配对码获取单个档案
  async fetchCaseByCode(code) {
    if (!this.isConfigured() || !code) return null;
    const cfg = this.getConfig();

    try {
      if (cfg.provider === "supabase") {
        const baseUrl = cfg.supabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
        const key = cfg.supabaseKey;
        const res = await fetch(baseUrl + "/rest/v1/mxl_cases?code=eq." + encodeURIComponent(code) + "&select=*", {
          method: "GET",
          headers: {
            "apikey": key,
            "Authorization": "Bearer " + key
          }
        });
        if (res.ok) {
          const list = await res.json();
          if (list && list.length > 0) return list[0].data;
        }
      } else if (cfg.provider === "leancloud") {
        const appId = cfg.appId;
        const appKey = cfg.appKey;
        const serverUrl = (cfg.serverURL || "").replace(/\/+$/, "") || ("https://" + appId.slice(0, 8) + ".api.lncldglobal.com");
        const qUrl = serverUrl + "/1.1/classes/MxlCase?where=" + encodeURIComponent(JSON.stringify({ code: code }));
        const res = await fetch(qUrl, {
          headers: {
            "X-LC-Id": appId,
            "X-LC-Key": appKey,
            "Content-Type": "application/json"
          }
        });
        if (res.ok) {
          const json = await res.json();
          if (json.results && json.results.length > 0) return json.results[0].data;
        }
      }
    } catch(e) {}
    return null;
  },


  // 删除云端档案
  async deleteCase(code) {
    if (!this.isConfigured() || !code) return { success: false, reason: "unconfigured" };
    const cfg = this.getConfig();
    try {
      if (cfg.provider === "supabase") {
        const baseUrl = cfg.supabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
        const key = cfg.supabaseKey;
        await fetch(baseUrl + "/rest/v1/mxl_cases?code=eq." + encodeURIComponent(code), {
          method: "DELETE",
          headers: {
            "apikey": key,
            "Authorization": "Bearer " + key
          }
        });
        return { success: true };
      } else if (cfg.provider === "leancloud") {
        const appId = cfg.appId;
        const appKey = cfg.appKey;
        const serverUrl = (cfg.serverURL || "").replace(/\/+$/, "") || ("https://" + appId.slice(0, 8) + ".api.lncldglobal.com");
        const queryRes = await fetch(serverUrl + "/1.1/classes/MxlCase?where=" + encodeURIComponent(JSON.stringify({ code: code })), {
          headers: { "X-LC-Id": appId, "X-LC-Key": appKey }
        });
        if (queryRes.ok) {
          const qJson = await queryRes.json();
          if (qJson.results && qJson.results[0] && qJson.results[0].objectId) {
            await fetch(serverUrl + "/1.1/classes/MxlCase/" + qJson.results[0].objectId, {
              method: "DELETE",
              headers: { "X-LC-Id": appId, "X-LC-Key": appKey }
            });
          }
        }
        return { success: true };
      }
    } catch(e) {
      console.warn("Cloud delete failed:", e);
      return { success: false, error: e.message };
    }
  },

  // 测试云端配置连接状态
  async testConnection(testCfg) {
    const cfg = testCfg || this.getConfig();
    try {
      if (cfg.provider === "supabase") {
        if (!cfg.supabaseUrl || !cfg.supabaseKey) {
          return { success: false, error: "请先填写 Supabase URL 和 Key" };
        }
        const baseUrl = cfg.supabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
        const key = cfg.supabaseKey;
        const res = await fetch(baseUrl + "/rest/v1/mxl_cases?select=code&limit=1", {
          method: "GET",
          headers: {
            "apikey": key,
            "Authorization": "Bearer " + key
          }
        });
        if (res.ok) {
          return { success: true, message: "🎉 Supabase 云端数据库连接成功！数据表正常响应，已开启全自动秒级同步。" };
        } else {
          const txt = await res.text();
          if (res.status === 403 || txt.includes("not allowed by policy") || txt.includes("row-level security policy")) {
            return {
              success: false,
              error: "已成功连接到 Supabase，但数据表【mxl_cases】开启了行级安全保护(RLS)，正在拦截匿名访问！\n\n【一键解决方式】：\n请前往 Supabase 控制台 -> 点击左侧「SQL Editor」-> 粘贴并运行下面这行命令即可彻底放行：\nALTER TABLE mxl_cases DISABLE ROW LEVEL SECURITY;"
            };
          }
          if (res.status === 404 || txt.includes("does not exist") || txt.includes("relation \"mxl_cases\" does not exist")) {
            return {
              success: false,
              error: "已成功连接到 Supabase，但数据表【mxl_cases】尚未创建！\n\n【建表方式】：\n请前往 Supabase 控制台 -> 点击左侧「SQL Editor」，粘贴并运行：\nCREATE TABLE mxl_cases (code TEXT PRIMARY KEY, data JSONB NOT NULL, updated_at TIMESTAMPTZ DEFAULT NOW());\nALTER TABLE mxl_cases DISABLE ROW LEVEL SECURITY;"
            };
          }
          return { success: false, error: "Supabase 响应错误 (" + res.status + "): " + txt };
        }
      } else if (cfg.provider === "leancloud") {
        if (!cfg.appId || !cfg.appKey) {
          return { success: false, error: "请先填写 LeanCloud App ID 和 App Key" };
        }
        const serverUrl = (cfg.serverURL || "").replace(/\/+$/, "") || ("https://" + cfg.appId.slice(0, 8) + ".api.lncldglobal.com");
        const res = await fetch(serverUrl + "/1.1/classes/MxlCase?limit=1", {
          headers: {
            "X-LC-Id": cfg.appId,
            "X-LC-Key": cfg.appKey
          }
        });
        if (res.ok) {
          return { success: true, message: "🎉 LeanCloud 连接成功！" };
        } else {
          return { success: false, error: "LeanCloud 响应错误 (" + res.status + "): " + (await res.text()) };
        }
      }
      return { success: false, error: "未选择有效的云服务商" };
    } catch(err) {
      return { success: false, error: "网络请求失败: " + err.message };
    }
  }
};

if (typeof window !== "undefined") { window.CloudSync = CloudSync; }
if (typeof globalThis !== "undefined") { globalThis.CloudSync = CloudSync; }
if (typeof module !== "undefined" && module.exports) {
  module.exports = CloudSync;
}
