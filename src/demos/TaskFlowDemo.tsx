import React, { useState } from 'react';
import { Kanban, Plus, Trash2, Edit2, ArrowRight, ArrowLeft, Tag, Calendar, User, CheckCircle, Clock } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  desc: string;
  priority: 'High' | 'Medium' | 'Low';
  category: string;
  dueDate: string;
  assignee: string;
}

export default function TaskFlowDemo() {
  const [todoTasks, setTodoTasks] = useState<Task[]>([
    {
      id: 'task-1',
      title: 'Tối ưu hóa Lighthouse SEO',
      desc: 'Cần phân tích và bổ sung đầy đủ thẻ meta, JSON-LD schema, tối ưu hóa kích thước hình ảnh để đạt điểm 100.',
      priority: 'High',
      category: 'SEO & Content',
      dueDate: '18/06/2026',
      assignee: 'Hùng Lê'
    },
    {
      id: 'task-2',
      title: 'Thiết kế Mockup Landing Page',
      desc: 'Vẽ dây chuyền phân bố cục giao diện trang chủ, bố cục bento grid theo phản hồi từ phòng thiết kế mỹ thuật.',
      priority: 'Low',
      category: 'UI/UX Design',
      dueDate: '22/06/2026',
      assignee: 'Thanh Hà'
    }
  ]);

  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([
    {
      id: 'task-3',
      title: 'Xây dựng API RESTful lưu phản hồi',
      desc: 'Viết endpoint POST và GET cho bảng phản hồi ý kiến kết nối file feedbacks.json trên hệ thống Node.js.',
      priority: 'Medium',
      category: 'Backend Core',
      dueDate: '17/06/2026',
      assignee: 'Hùng Lê'
    }
  ]);

  const [doneTasks, setDoneTasks] = useState<Task[]>([
    {
      id: 'task-4',
      title: 'Setup môi trường CI/CD Cloud Run',
      desc: 'Tự động biên dịch mã nguồn với Vite, xuất bản mã nguồn thông qua pipeline Github Actions lên nền tảng container.',
      priority: 'High',
      category: 'Devops Pipeline',
      dueDate: '15/06/2026',
      assignee: 'Bảo Khánh'
    }
  ]);

  // Form input state
  const [showAddForm, setShowAddForm] = useState(false);
  const [columnToAddTo, setColumnToAddTo] = useState<'todo' | 'progress' | 'done'>('todo');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [newCategory, setNewCategory] = useState('Frontend UI');
  const [newAssignee, setNewAssignee] = useState('Hùng Lê');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) {
      alert('Vui lòng điền vào tiêu đề thẻ công việc!');
      return;
    }

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTitle,
      desc: newDesc || 'Không có mô tả chi tiết.',
      priority: newPriority,
      category: newCategory,
      dueDate: new Date().toLocaleDateString('vi-VN'),
      assignee: newAssignee
    };

    if (columnToAddTo === 'todo') {
      setTodoTasks([...todoTasks, newTask]);
    } else if (columnToAddTo === 'progress') {
      setInProgressTasks([...inProgressTasks, newTask]);
    } else {
      setDoneTasks([...doneTasks, newTask]);
    }

    // Reset Form fields
    setNewTitle('');
    setNewDesc('');
    setNewPriority('Medium');
    setNewCategory('Frontend UI');
    setShowAddForm(false);
  };

  const moveTask = (taskId: string, source: 'todo' | 'progress' | 'done', target: 'todo' | 'progress' | 'done') => {
    let taskToMove: Task | undefined;

    // Remove from source
    if (source === 'todo') {
      taskToMove = todoTasks.find(t => t.id === taskId);
      setTodoTasks(todoTasks.filter(t => t.id !== taskId));
    } else if (source === 'progress') {
      taskToMove = inProgressTasks.find(t => t.id === taskId);
      setInProgressTasks(inProgressTasks.filter(t => t.id !== taskId));
    } else {
      taskToMove = doneTasks.find(t => t.id === taskId);
      setDoneTasks(doneTasks.filter(t => t.id !== taskId));
    }

    if (!taskToMove) return;

    // Add to target
    if (target === 'todo') {
      setTodoTasks([...todoTasks, taskToMove]);
    } else if (target === 'progress') {
      setInProgressTasks([...inProgressTasks, taskToMove]);
    } else {
      setDoneTasks([...doneTasks, taskToMove]);
    }
  };

  const deleteTask = (taskId: string, currentColumn: 'todo' | 'progress' | 'done') => {
    if (currentColumn === 'todo') {
      setTodoTasks(todoTasks.filter(t => t.id !== taskId));
    } else if (currentColumn === 'progress') {
      setInProgressTasks(inProgressTasks.filter(t => t.id !== taskId));
    } else {
      setDoneTasks(doneTasks.filter(t => t.id !== taskId));
    }
  };

  const getPriorityColor = (priority: 'High' | 'Medium' | 'Low') => {
    switch (priority) {
      case 'High': return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
      case 'Medium': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'Low': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#0d111d] text-slate-100 flex flex-col font-sans">
      
      {/* Kanban Navigation header */}
      <nav className="bg-[#121829] border-b border-slate-800 py-3.5 px-4 sticky top-0 z-20 text-left">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
              <Kanban className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-wide block">TASKFLOW AGILE</span>
              <span className="text-[9px] font-mono text-teal-400 leading-none block">COLLABORATIVE PLANNER HUB</span>
            </div>
          </div>

          <button
            onClick={() => {
              setColumnToAddTo('todo');
              setShowAddForm(true);
            }}
            className="flex items-center gap-1.5 bg-teal-600/10 hover:bg-teal-600 border border-teal-500/25 hover:text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold text-teal-400 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Thẻ Mới</span>
          </button>
        </div>
      </nav>

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 space-y-6 text-left">
        {/* Kanban Board header text */}
        <div>
          <h2 className="text-xl font-bold font-display text-white">Bảng Quản Lý Dự Án Dự Phòng 📊</h2>
          <p className="text-xs text-slate-400">Trực quan hóa luồng công việc Agile. Bạn có thể tự do thêm việc, kéo chuyển tiếp công việc hoặc xóa thẻ.</p>
        </div>

        {/* 3 Columns Layout row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Column 1: TODO */}
          <div className="bg-[#0f1423] border border-slate-800 rounded-2xl p-4 flex flex-col min-h-[460px]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                <h3 className="font-bold text-sm text-white">Chờ thực hiện</h3>
              </div>
              <span className="text-xs font-mono font-bold bg-[#161c31] text-slate-400 px-2 py-0.5 rounded-full border border-slate-800">
                {todoTasks.length}
              </span>
            </div>

            <div className="flex-1 space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {todoTasks.map(t => (
                <div key={t.id} className="bg-[#161d31] border border-slate-800 p-4 rounded-xl space-y-3 shadow-md hover:border-slate-700 transition-all relative group">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-semibold bg-slate-900 text-indigo-400 px-2 py-0.5 rounded border border-slate-800 uppercase font-mono">
                      {t.category}
                    </span>

                    {/* Delete handle */}
                    <button
                      onClick={() => deleteTask(t.id, 'todo')}
                      className="text-slate-500 hover:text-rose-400 cursor-pointer p-0.5 opacity-60 hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="font-bold text-sm text-white leading-tight">{t.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{t.desc}</p>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/40 text-[10px] font-mono text-slate-400">
                    <span className={`px-2 py-0.5 rounded-full ${getPriorityColor(t.priority)} font-bold text-[9px]`}>
                      {t.priority === 'High' ? 'Cao' : t.priority === 'Medium' ? 'Trung' : 'Thấp'}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-teal-400" /> {t.assignee}
                    </span>
                  </div>

                  {/* Flow control triggers */}
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => moveTask(t.id, 'todo', 'progress')}
                      className="flex items-center gap-1 bg-slate-900 border border-slate-800 hover:border-teal-500 hover:bg-teal-950/20 text-[11px] font-bold text-slate-300 hover:text-teal-400 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      <span>Tiếp Tiến Độ</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: IN PROGRESS */}
          <div className="bg-[#0f1423] border border-slate-800 rounded-2xl p-4 flex flex-col min-h-[460px]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                <h3 className="font-bold text-sm text-white">Đang thực hiện</h3>
              </div>
              <span className="text-xs font-mono font-bold bg-[#161c31] text-amber-400 px-2 py-0.5 rounded-full border border-slate-800">
                {inProgressTasks.length}
              </span>
            </div>

            <div className="flex-1 space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {inProgressTasks.map(t => (
                <div key={t.id} className="bg-[#161d31] border border-slate-800 p-4 rounded-xl space-y-3 shadow-md hover:border-slate-700 transition-all relative group">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-semibold bg-slate-900 text-indigo-400 px-2 py-0.5 rounded border border-slate-800 uppercase font-mono">
                      {t.category}
                    </span>

                    <button
                      onClick={() => deleteTask(t.id, 'progress')}
                      className="text-slate-500 hover:text-rose-400 cursor-pointer p-0.5 opacity-60 hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="font-bold text-sm text-white leading-tight">{t.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{t.desc}</p>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/40 text-[10px] font-mono text-slate-400">
                    <span className={`px-2 py-0.5 rounded-full ${getPriorityColor(t.priority)} font-bold text-[9px]`}>
                      {t.priority === 'High' ? 'Cao' : t.priority === 'Medium' ? 'Trung' : 'Thấp'}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-teal-400" /> {t.assignee}
                    </span>
                  </div>

                  {/* Flow control triggers back vs front */}
                  <div className="flex justify-between pt-1 gap-2">
                    <button
                      onClick={() => moveTask(t.id, 'progress', 'todo')}
                      className="flex items-center gap-1 bg-slate-900 border border-slate-800 text-[11px] hover:text-slate-100 text-slate-400 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Lùi Thẻ</span>
                    </button>
                    
                    <button
                      onClick={() => moveTask(t.id, 'progress', 'done')}
                      className="flex items-center gap-1 bg-slate-900 border border-slate-800 hover:border-teal-500 hover:bg-teal-950/20 text-[11px] font-bold text-slate-300 hover:text-teal-400 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      <span>Hoàn Thành</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: DONE */}
          <div className="bg-[#0f1423] border border-slate-800 rounded-2xl p-4 flex flex-col min-h-[460px]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <h3 className="font-bold text-sm text-white">Đã xong</h3>
              </div>
              <span className="text-xs font-mono font-bold bg-[#161c31] text-emerald-400 px-2 py-0.5 rounded-full border border-slate-800">
                {doneTasks.length}
              </span>
            </div>

            <div className="flex-1 space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {doneTasks.map(t => (
                <div key={t.id} className="bg-[#161d31] border border-slate-800 p-4 rounded-xl space-y-3 shadow-md hover:border-slate-700 transition-all relative group">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-semibold bg-slate-900 text-indigo-400 px-2 py-0.5 rounded border border-slate-800 uppercase font-mono">
                      {t.category}
                    </span>

                    <button
                      onClick={() => deleteTask(t.id, 'done')}
                      className="text-slate-500 hover:text-rose-400 cursor-pointer p-0.5 opacity-60 hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="font-bold text-sm text-white leading-tight flex items-center gap-1.5 line-through decoration-slate-600 text-slate-400">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    {t.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed line-through">{t.desc}</p>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/40 text-[10px] font-mono text-slate-500">
                    <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 font-bold text-[9px] text-slate-500">
                      Đã xong
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" /> {t.assignee}
                    </span>
                  </div>

                  {/* Flow control triggers back */}
                  <div className="flex justify-start pt-1">
                    <button
                      onClick={() => moveTask(t.id, 'done', 'progress')}
                      className="flex items-center gap-1 bg-slate-900 border border-slate-800 text-[11px] hover:text-slate-100 text-slate-400 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Xử Lý Lại</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Slide / Popup to Add new card */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-[#070b13]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4 text-left animate-fade-in relative shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-teal-400" /> Thêm Thẻ Công Việc Mới
            </h3>

            <form onSubmit={handleAddTask} className="space-y-3.5">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-400">Tiêu đề việc <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Lập trình cổng bảo mật OAuth..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#080b13] border border-slate-800 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-400">Mô tả tóm tắt</label>
                <textarea
                  rows={3}
                  placeholder="Mô tả các công nghệ và giải pháp cần tích hợp trong thẻ này..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-[#080b13] border border-slate-800 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-teal-500"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-400">Độ ưu tiên</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full bg-[#080b13] border border-slate-800 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-teal-500"
                  >
                    <option value="Low">Thấp (Low)</option>
                    <option value="Medium">Trung bình (Medium)</option>
                    <option value="High">Cao (High)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-400">Ngành nghề / Phân mục</label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-[#080b13] border border-slate-800 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-slate-800 text-xs rounded-xl hover:bg-slate-900 cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs rounded-xl cursor-pointer"
                >
                  Xác nhận thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
