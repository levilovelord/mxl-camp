const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// 接收答卷提交
app.post('/api/submit', (req, res) => {
  const { orderId, role, answers } = req.body;
  if (!orderId || !role || !answers) {
    return res.status(400).json({ code: -1, msg: '参数缺失' });
  }

  const filePath = path.join(DATA_DIR, `${orderId}.json`);
  let caseData = { orderId, createdAt: new Date().toISOString() };
  if (fs.existsSync(filePath)) {
    try {
      caseData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {}
  }

  caseData[role] = answers;
  caseData.updatedAt = new Date().toISOString();

  fs.writeFileSync(filePath, JSON.stringify(caseData, null, 2), 'utf8');
  res.json({ code: 0, msg: '提交成功', data: { orderId, role } });
});

// 咨询师后台查询个案
app.get('/api/case', (req, res) => {
  const orderId = req.query.orderId;
  if (!orderId) {
    return res.status(400).json({ code: -1, msg: '缺少订单号' });
  }

  const filePath = path.join(DATA_DIR, `${orderId}.json`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ code: -1, msg: '未找到该订单答卷' });
  }

  try {
    const caseData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json({ code: 0, data: caseData });
  } catch (e) {
    res.status(500).json({ code: -1, msg: '数据解析失败' });
  }
});

app.listen(PORT, () => {
  console.log(`慕喜乐夫妻营评估系统服务已启动，端口: ${PORT}`);
});
