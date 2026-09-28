import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'apexmetrics',
    title: 'ApexMetrics SaaS Dashboard',
    category: 'SaaS & Enterprise Data Portal',
    shortDesc: {
      vi: 'Bảng quản trị phân tích dữ liệu kinh doanh thời gian thực với các biểu đồ trực quan động.',
      en: 'Real-time business data analysis dashboard featuring dynamic, interactive SVG charts.'
    },
    problem: {
      vi: 'Khách hàng có khối lượng dữ liệu giao dịch lớn từ nhiều nền tảng nhưng thiếu hệ thống trực quan hóa tập trung, dẫn đến việc đưa ra quyết định kinh doanh chậm trễ và khó khăn trong việc theo dõi chuyển đổi.',
      en: 'The client had a high volume of transaction data across platforms but lacked a centralized visualization system, leading to delayed business decisions and difficulties in conversion tracking.'
    },
    solution: {
      vi: 'Xây dựng một Dashboard Full-stack có tính tản mát dữ liệu cực thấp, tích hợp công nghệ kết xuất đồ họa SVG mượt mà, bộ lọc linh hoạt theo thời gian, giúp khách hàng tối ưu hóa doanh số và giảm thời gian tải trang từ 8 giây xuống 1.2 giây.',
      en: 'Built a low-latency fullstack dashboard integrated with smooth custom SVG charting and real-time filters, helping the client optimize sales and reduce page load times from 8s to 1.2s.'
    },
    techStack: ['React 19', 'Tailwind CSS v4', 'SVG Charts', 'Express API', 'LocalStorage State Cache'],
    specs: {
      lighthousePerformance: 99,
      lighthouseSeo: 100,
      lighthouseBestPractices: 98,
      loadTime: '0.8 giây',
      bundleSize: '42KB gzipped',
      serverLatency: '15ms'
    },
    demoRef: '/demo/apex',
    metric: {
      label: {
        vi: 'Tăng trưởng chuyển đổi khách hàng',
        en: 'Customer conversion rate growth'
      },
      value: '+38%'
    }
  },
  {
    id: 'glowstore',
    title: 'Glow&Store Cozy Shop',
    category: 'Premium E-Commerce Platform',
    shortDesc: {
      vi: 'Trải nghiệm mua sắm mỹ phẩm cao cấp với giỏ hàng tương tác thời gian thực và quy trình thanh toán tối ưu.',
      en: 'Premium cosmetics shopping experience with real-time cart interaction and streamlined one-step checkout.'
    },
    problem: {
      vi: 'Shop mỹ phẩm truyền thống gặp khó khăn khi chuyển đổi số vì giao diện di động bị giật lag, quy trình thanh toán rườm rà (trải qua 5 bước) làm tỷ lệ bỏ giỏ hàng của người dùng lên đến 74%.',
      en: 'A traditional cosmetics boutique struggled with digitalization due to laggy mobile UI and a cumbersome 5-step checkout process, resulting in a high cart abandonment rate of 74%.'
    },
    solution: {
      vi: 'Thiết kế trải nghiệm mua sắm Single Page siêu tốc, thu nhỏ quy trình mua hàng vào 1 bước duy nhất (One-step checkout), tối ưu dung lượng ảnh sản phẩm tự động, tích hợp hiệu ứng chuyển động mượt mà bằng Framer Motion giúp tăng trải nghiệm mua sắm trên thiết bị di động.',
      en: 'Designed a single-page shopping checkout experience, condensing the buying flow into a single step, auto-optimizing product assets, and utilizing Framer Motion animations to boost mobile conversions.'
    },
    techStack: ['React Functional Hooks', 'Motion (Framer)', 'Tailwind Responsive Utilities', 'JSON/Restful Cart API'],
    specs: {
      lighthousePerformance: 98,
      lighthouseSeo: 100,
      lighthouseBestPractices: 97,
      loadTime: '1.1 giây',
      bundleSize: '55KB gzipped',
      serverLatency: '22ms'
    },
    demoRef: '/demo/glow',
    metric: {
      label: {
        vi: 'Giảm tỷ lệ bỏ giỏ hàng',
        en: 'Cart abandonment rate reduction'
      },
      value: '-45%'
    }
  },
  {
    id: 'taskflow',
    title: 'TaskFlow Agile Kanban Core',
    category: 'Productivity & Project Management Tool',
    shortDesc: {
      vi: 'Ứng dụng quản lý dự án Agile theo dạng kéo thả Kanban giúp các đội nhóm cộng tác nhanh chóng.',
      en: 'Agile Kanban board application enabling teams to collaborate rapidly with fluid drag-and-drop actions.'
    },
    problem: {
      vi: 'Doanh nghiệp khởi nghiệp có các dự án thay đổi liên tục, các công cụ sẵn có quá cồng kềnh, cấu hình phức tạp, giao diện không trực quan và nhân viên mất nhiều thời gian học cách sử dụng.',
      en: 'A fast-paced startup faced constantly changing project requirements. Available tools were bloated, complex to configure, non-intuitive, and required steep learning curves for team onboarding.'
    },
    solution: {
      vi: 'Phát triển bảng Kanban tối giản nhưng đầy đủ tính năng: kéo thả trạng thái tức thì, phân loại thẻ công việc theo mức độ ưu tiên, bộ lọc nhanh cho thành viên và gắn thẻ trực quan giúp đội nhóm tăng hiệu quả công việc lên 25% ngay tuần đầu áp dụng.',
      en: 'Developed a minimalist, feature-rich Kanban board supporting instant status drag-drop, task prioritizing, quick filtering by member, and visual labels, boosting team execution by 25% in week one.'
    },
    techStack: ['React Hooks', 'Sleek Keyboard Accessibilities', 'Context API State Management', 'SVG Icon Library'],
    specs: {
      lighthousePerformance: 100,
      lighthouseSeo: 99,
      lighthouseBestPractices: 100,
      loadTime: '0.6 giây',
      bundleSize: '35KB gzipped',
      serverLatency: '10ms'
    },
    demoRef: '/demo/taskflow',
    metric: {
      label: {
        vi: 'Tăng tiến độ hoàn thành dự án',
        en: 'Project completion rate boost'
      },
      value: '+25%'
    }
  }
];
