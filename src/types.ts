export interface Project {
  id: string;
  title: string;
  category: string; // Tên phân khúc (thường là tiếng Anh chuẩn chung)
  shortDesc: { vi: string; en: string };
  problem: { vi: string; en: string };
  solution: { vi: string; en: string };
  techStack: string[];
  specs: {
    lighthousePerformance: number;
    lighthouseSeo: number;
    lighthouseBestPractices: number;
    loadTime: string;
    bundleSize: string;
    serverLatency: string;
  };
  demoRef: string;
  metric: {
    label: { vi: string; en: string };
    value: string;
  };
}

export interface Feedback {
  id: string;
  name: string;
  email: string;
  company?: string;
  rating: number;
  projectType: string;
  message: string;
  createdAt: string;
  status: 'pending' | 'contacted' | 'completed';
}
