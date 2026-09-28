import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

const FEEDBACK_FILE = path.join(process.cwd(), 'data', 'feedbacks.json');

// Ensure the directory and file exist
function initDatabase() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(FEEDBACK_FILE)) {
    const initialFeedbacks = [
      {
        id: 'fb-1',
        name: 'Lê Minh Tuấn',
        email: 'tuan.le@glowbeauty.vn',
        company: 'Glow Beauty Cosmetics',
        rating: 5,
        projectType: 'E-Commerce Platform',
        message: 'Hưng Lê làm việc cực kỳ chuyên nghiệp và tận tâm. Giao diện trang e-commerce rất sang trọng, các thao tác mượt mà và giúp tăng tỷ lệ chuyển đổi của shop lên tới 35% ngay trong tháng đầu chạy thử nghiệm. Sẽ chắc chắn tiếp tục hợp tác với bạn trong dự án tiếp theo!',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        status: 'completed'
      },
      {
        id: 'fb-2',
        name: 'Nguyễn Tiến Đạt',
        email: 'dat.nguyen@apexmetrics.io',
        company: 'Apex Logistics & Tech',
        rating: 5,
        projectType: 'SaaS & Enterprise Data Portal',
        message: 'Hệ thống báo cáo Dashboard trực quan hóa dữ liệu được viết bằng SVG vô cùng mượt mà. Thời gian tải dữ liệu phức tạp chỉ mất chưa đầy 1 giây. Sự chuyên nghiệp trong kiến trúc luồng dữ liệu và tư vấn giải pháp của Hưng là điều chúng tôi đánh giá cao nhất.',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        status: 'contacted'
      },
      {
        id: 'fb-3',
        name: 'Trần Mai Lan',
        email: 'lan.tran@workpulse.com',
        company: 'WorkPulse Teamwork',
        rating: 5,
        projectType: 'Productivity & Project Management Tool',
        message: 'Bảng Kanban TaskFlow hoạt động tuyệt vời, đội ngũ nhân sự của chúng tôi học cách sử dụng vô cùng nhanh chóng nhờ thiết kế tối giản, trực quan. Khả năng drag-drop tức thời mượt mà hơn nhiều so với các giải pháp cồng kềnh trước đây.',
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
        status: 'pending'
      }
    ];
    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(initialFeedbacks, null, 2), 'utf-8');
  }
}

// Read feedbacks
function readFeedbacks() {
  try {
    initDatabase();
    const data = fs.readFileSync(FEEDBACK_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading feedbacks:', error);
    return [];
  }
}

// Write feedbacks
function writeFeedbacks(feedbacks: any[]) {
  try {
    initDatabase();
    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedbacks, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing feedbacks:', error);
  }
}

// API Routes
app.get('/api/feedbacks', (req, res) => {
  const feedbacks = readFeedbacks();
  res.json(feedbacks);
});

app.post('/api/feedbacks', (req, res) => {
  const { name, email, company, rating, projectType, message } = req.body;

  if (!name || !email || !rating || !projectType || !message) {
    return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
  }

  const feedbacks = readFeedbacks();
  const newFeedback = {
    id: `fb-${Date.now()}`,
    name,
    email,
    company: company || '',
    rating: Number(rating),
    projectType,
    message,
    createdAt: new Date().toISOString(),
    status: 'pending'
  };

  feedbacks.unshift(newFeedback); // Insert at the beginning
  writeFeedbacks(feedbacks);

  res.status(201).json(newFeedback);
});

// Update status
app.patch('/api/feedbacks/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !['pending', 'contacted', 'completed'].includes(status)) {
    return res.status(400).json({ error: 'Trạng thái không hợp lệ' });
  }

  const feedbacks = readFeedbacks();
  const feedbackIndex = feedbacks.findIndex((fb: any) => fb.id === id);

  if (feedbackIndex === -1) {
    return res.status(404).json({ error: 'Không tìm thấy phản hồi' });
  }

  feedbacks[feedbackIndex].status = status;
  writeFeedbacks(feedbacks);

  res.json(feedbacks[feedbackIndex]);
});

// Reset feedbacks back to defaults (for demo reset capability)
app.post('/api/feedbacks/reset', (req, res) => {
  if (fs.existsSync(FEEDBACK_FILE)) {
    fs.unlinkSync(FEEDBACK_FILE);
  }
  initDatabase();
  res.json({ message: 'Database reset successfully', feedbacks: readFeedbacks() });
});

// Start server
async function start() {
  initDatabase();

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Serve index.html for client route fallback
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express custom server running on http://localhost:${PORT}`);
  });
}

start();
