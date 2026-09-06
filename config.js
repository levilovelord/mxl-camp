// 慕喜乐夫妻营 · 云端数据库配置文件
// 只要在此处填入 Supabase 的配置（或在后台界面输入），
// 即可实现：客户在微信/手机里点击提交，咨询师电脑后台 1 秒内自动刷新呈现！无需复制粘贴凭证！

var configObj = {
  provider: "supabase",
  supabaseUrl: "https://xxfhegzsyhmxggbdtlxo.supabase.co",
  supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4ZmhlZ3pzeWhteGdnYmR0bHhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2MTE3MzksImV4cCI6MjEwNDE4NzczOX0.hCmcuFQpOJEJBCdPTgQXLLrp77G0DVFuoN2d7X_WRfI"
};

if (typeof window !== "undefined") window.CLOUD_CONFIG = configObj;
if (typeof globalThis !== "undefined") globalThis.CLOUD_CONFIG = configObj;
if (typeof module !== "undefined" && module.exports) module.exports = configObj;
