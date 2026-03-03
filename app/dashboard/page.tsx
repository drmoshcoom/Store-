'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  Bell,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  XCircle,
  Clock,
  MoreVertical,
  Filter,
  Download,
  Eye,
  Trash2,
  Edit,
  ExternalLink,
  Wallet,
  Phone,
  User,
  CreditCard
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'السبت', sales: 4000 },
  { name: 'الأحد', sales: 3000 },
  { name: 'الاثنين', sales: 2000 },
  { name: 'الثلاثاء', sales: 2780 },
  { name: 'الأربعاء', sales: 1890 },
  { name: 'الخميس', sales: 2390 },
  { name: 'الجمعة', sales: 3490 },
];

import AIAssistant from '@/components/AIAssistant';

import { db, Notification } from '@/lib/db';
import { NotificationService } from '@/lib/notifications';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = () => {
      setNotifications(db.getNotificationsByStoreId('1'));
    };

    // Load initial notifications
    fetchNotifications();
    
    // In a real app, we'd use WebSockets or polling here
    const interval = setInterval(fetchNotifications, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    db.markNotificationAsRead(id);
    setNotifications(db.getNotificationsByStoreId('1'));
  };

  const menuItems = [
    { id: 'overview', label: 'نظرة عامة', icon: <LayoutDashboard size={20} />, href: '/dashboard' },
    { id: 'products', label: 'المنتجات', icon: <Package size={20} />, href: '/dashboard/products' },
    { id: 'orders', label: 'الطلبات', icon: <ShoppingCart size={20} />, href: '/dashboard/orders' },
    { id: 'customers', label: 'العملاء', icon: <Users size={20} />, href: '/dashboard/customers' },
    { id: 'wallets', label: 'المحافظ المالية', icon: <Wallet size={20} />, href: '/dashboard/wallets' },
    { id: 'settings', label: 'الإعدادات', icon: <Settings size={20} />, href: '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        animate={{ width: isSidebarOpen ? 256 : 80 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-white border-l border-slate-200 flex flex-col relative z-30"
      >
        <div className="p-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-100">
              <ShoppingCart size={24} />
            </div>
            <AnimatePresence mode="wait">
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="text-xl font-bold text-slate-900 truncate"
                >
                  يمن ساس
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-indigo-600 transition-all border border-transparent hover:border-slate-100"
          >
            {isSidebarOpen ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-x-hidden">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group ${
                activeTab === item.id 
                ? 'bg-indigo-50 text-indigo-600 font-bold' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="shrink-0">{item.icon}</span>
              <AnimatePresence mode="wait">
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="truncate whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {!isSidebarOpen && (
                <div className="absolute right-full mr-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all relative group`}>
            <LogOut size={20} className="shrink-0" />
            <AnimatePresence mode="wait">
              {isSidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="truncate"
                >
                  تسجيل الخروج
                </motion.span>
              )}
            </AnimatePresence>
            {!isSidebarOpen && (
              <div className="absolute right-full mr-2 px-2 py-1 bg-red-600 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                تسجيل الخروج
              </div>
            )}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-900">
              {menuItems.find(i => i.id === activeTab)?.label}
            </h1>
            <Link href="/s/tech-store" target="_blank" className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-all">
              معاينة المتجر <ExternalLink size={12} />
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="بحث..." 
                className="bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64"
              />
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-all"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                )}
              </button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden"
                    >
                      <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                        <h4 className="font-bold text-sm text-slate-900">الإشعارات</h4>
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{unreadCount} جديد</span>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center text-slate-400">
                            <Bell size={32} className="mx-auto mb-2 opacity-20" />
                            <p className="text-xs">لا توجد إشعارات حالياً</p>
                          </div>
                        ) : (
                          notifications.map((n) => (
                            <div 
                              key={n.id} 
                              onClick={() => handleMarkAsRead(n.id)}
                              className={`p-4 border-b border-slate-50 hover:bg-slate-50 transition-all cursor-pointer ${!n.read ? 'bg-indigo-50/30' : ''}`}
                            >
                              <div className="flex gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                  n.type === 'order' ? 'bg-indigo-100 text-indigo-600' : 
                                  n.type === 'payment' ? 'bg-emerald-100 text-emerald-600' : 
                                  'bg-slate-100 text-slate-600'
                                }`}>
                                  {n.type === 'order' ? <ShoppingCart size={14} /> : <CreditCard size={14} />}
                                </div>
                                <div className="flex-1">
                                  <p className="text-xs font-bold text-slate-900">{n.title}</p>
                                  <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">{n.message}</p>
                                  <p className="text-[9px] text-slate-400 mt-1">منذ قليل</p>
                                </div>
                                {!n.read && <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-1" />}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                      <button className="w-full p-3 text-center text-[11px] font-bold text-indigo-600 hover:bg-indigo-50 transition-all border-t border-slate-50">
                        عرض جميع الإشعارات
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-3 border-r border-slate-200 pr-6">
              <div className="text-left">
                <p className="text-sm font-bold text-slate-900">محمد أحمد</p>
                <p className="text-xs text-slate-500">مدير المتجر</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img src="https://picsum.photos/seed/user/100/100" alt="User" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'products' && <ProductsTab />}
          {activeTab === 'orders' && <OrdersTab />}
          {activeTab === 'wallets' && <WalletsTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
        <AIAssistant />
      </main>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'إجمالي المبيعات', value: '450,000 ر.ي', icon: <DollarSign />, color: 'bg-emerald-500', trend: '+12.5%' },
          { label: 'الطلبات الجديدة', value: '24', icon: <ShoppingCart />, color: 'bg-indigo-500', trend: '+8.2%' },
          { label: 'العملاء النشطون', value: '156', icon: <Users />, color: 'bg-orange-500', trend: '+5.1%' },
          { label: 'معدل التحويل', value: '3.2%', icon: <TrendingUp />, color: 'bg-purple-500', trend: '+2.4%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                {stat.icon}
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{stat.trend}</span>
            </div>
            <p className="text-slate-500 text-sm mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-900">إحصائيات المبيعات</h3>
            <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-sm outline-none">
              <option>آخر 7 أيام</option>
              <option>آخر 30 يوم</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-6">أحدث الطلبات</h3>
          <div className="space-y-6">
            {[
              { name: 'أحمد علي', total: '15,000 ر.ي', status: 'pending', time: 'منذ 5 دقائق' },
              { name: 'سارة محمد', total: '24,500 ر.ي', status: 'approved', time: 'منذ 15 دقيقة' },
              { name: 'خالد حسن', total: '8,000 ر.ي', status: 'rejected', time: 'منذ ساعة' },
              { name: 'ليلى عبدالله', total: '12,000 ر.ي', status: 'pending', time: 'منذ ساعتين' },
            ].map((order, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold">
                    {order.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{order.name}</p>
                    <p className="text-xs text-slate-500">{order.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">{order.total}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    order.status === 'approved' ? 'bg-emerald-50 text-emerald-600' :
                    order.status === 'rejected' ? 'bg-red-50 text-red-600' :
                    'bg-amber-50 text-amber-600'
                  }`}>
                    {order.status === 'approved' ? 'مقبول' : order.status === 'rejected' ? 'مرفوض' : 'قيد الانتظار'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 text-sm font-bold text-indigo-600 bg-indigo-50 rounded-2xl hover:bg-indigo-100 transition-all">
            عرض جميع الطلبات
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductsTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="البحث عن منتج..." 
              className="bg-white border border-slate-200 rounded-xl pr-10 pl-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64"
            />
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={18} /> تصفية
          </button>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
          <Plus size={20} /> إضافة منتج جديد
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-right">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">المنتج</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">النوع</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">السعر</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">المخزون</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">الحالة</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { id: 1, name: 'هاتف ذكي برو', type: 'مادي', price: '45,000 ر.ي', stock: 12, status: 'active', image: 'https://picsum.photos/seed/p1/100/100' },
              { id: 2, name: 'ساعة ذكية S3', type: 'مادي', price: '12,500 ر.ي', stock: 5, status: 'active', image: 'https://picsum.photos/seed/p2/100/100' },
              { id: 3, name: 'دورة البرمجة', type: 'رقمي', price: '15,000 ر.ي', stock: '∞', status: 'active', image: 'https://picsum.photos/seed/p3/100/100' },
              { id: 4, name: 'سماعات بلوتوث', type: 'مادي', price: '8,000 ر.ي', stock: 0, status: 'inactive', image: 'https://picsum.photos/seed/p4/100/100' },
            ].map((product) => (
              <tr key={product.id} className="hover:bg-slate-50/50 transition-all">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={product.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                    <span className="font-bold text-slate-900">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{product.type}</td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900">{product.price}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{product.stock}</td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                    product.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {product.status === 'active' ? 'نشط' : 'غير نشط'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><Edit size={18} /></button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OrdersTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="البحث عن طلب..." 
              className="bg-white border border-slate-200 rounded-xl pr-10 pl-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64"
            />
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={18} /> تصفية
          </button>
        </div>
        <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
          <Download size={18} /> تصدير البيانات
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-right">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">رقم الطلب</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">العميل</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">التاريخ</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">الإجمالي</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">حالة الدفع</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { id: '#ORD-1024', customer: 'أحمد علي', date: '2024/03/01', total: '15,000 ر.ي', status: 'pending', method: 'جيب' },
              { id: '#ORD-1023', customer: 'سارة محمد', date: '2024/03/01', total: '24,500 ر.ي', status: 'approved', method: 'جوالي' },
              { id: '#ORD-1022', customer: 'خالد حسن', date: '2024/02/29', total: '8,000 ر.ي', status: 'rejected', method: 'فلوسك' },
              { id: '#ORD-1021', customer: 'ليلى عبدالله', date: '2024/02/29', total: '12,000 ر.ي', status: 'approved', method: 'كاش' },
            ].map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50 transition-all">
                <td className="px-6 py-4 font-mono text-xs font-bold text-slate-900">{order.id}</td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900">{order.customer}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{order.date}</td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900">{order.total}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase w-fit ${
                      order.status === 'approved' ? 'bg-emerald-50 text-emerald-600' :
                      order.status === 'rejected' ? 'bg-red-50 text-red-600' :
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {order.status === 'approved' ? 'مقبول' : order.status === 'rejected' ? 'مرفوض' : 'قيد الانتظار'}
                    </span>
                    <span className="text-[10px] text-slate-400 mr-2">{order.method}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="عرض التفاصيل"><Eye size={18} /></button>
                    {order.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => NotificationService.notifyOwnerPaymentStatusChange(order.id, 'approved')}
                          className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" 
                          title="قبول الدفع"
                        >
                          <CheckCircle2 size={18} />
                        </button>
                        <button 
                          onClick={() => NotificationService.notifyOwnerPaymentStatusChange(order.id, 'rejected')}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" 
                          title="رفض الدفع"
                        >
                          <XCircle size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function WalletsTab() {
  const wallets = [
    { id: 'jeeb', name: 'جيب (JeeB)', icon: 'https://picsum.photos/seed/jeeb/40/40' },
    { id: 'jawali', name: 'جوالي (Jawali)', icon: 'https://picsum.photos/seed/jawali/40/40' },
    { id: 'sabacash', name: 'سبأ كاش (SabaCash)', icon: 'https://picsum.photos/seed/saba/40/40' },
    { id: 'floosak', name: 'فلوسك (Floosak)', icon: 'https://picsum.photos/seed/floosak/40/40' },
    { id: 'mpay', name: 'mPay', icon: 'https://picsum.photos/seed/mpay/40/40' },
    { id: 'oen', name: 'OEN', icon: 'https://picsum.photos/seed/oen/40/40' },
    { id: 'bankylite', name: 'Banky Lite', icon: 'https://picsum.photos/seed/banky/40/40' },
  ];

  return (
    <div className="max-w-4xl space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-2">إعدادات الدفع</h3>
        <p className="text-slate-500 mb-8 text-sm">أدخل أرقام حساباتك في المحافظ الإلكترونية ليتمكن العملاء من التحويل إليك.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wallets.map((wallet) => (
            <div key={wallet.id} className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <img src={wallet.icon} className="w-6 h-6 rounded-md" alt="" />
                {wallet.name}
              </label>
              <input 
                type="text" 
                placeholder="أدخل رقم الحساب..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
          ))}
        </div>
        
        <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            حفظ الإعدادات
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="max-w-4xl space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-6">إعدادات المتجر العامة</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">اسم المتجر</label>
              <input type="text" defaultValue="متجر التقنية" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">رابط المتجر</label>
              <div className="flex items-center">
                <span className="bg-slate-100 border border-l-0 border-slate-200 rounded-r-xl px-3 py-3 text-xs text-slate-500">.yemensass.ye</span>
                <input type="text" defaultValue="tech-store" className="flex-1 bg-slate-50 border border-slate-200 rounded-l-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-left" dir="ltr" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">وصف المتجر</label>
            <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="اكتب وصفاً مختصراً لمتجرك..."></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">شعار المتجر</label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                  <Plus size={24} />
                </div>
                <button className="text-sm font-bold text-indigo-600 hover:underline">تغيير الشعار</button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">اللون الأساسي</label>
              <div className="flex items-center gap-3">
                <input type="color" defaultValue="#4f46e5" className="w-12 h-12 rounded-xl border-none cursor-pointer" />
                <span className="text-sm text-slate-500 font-mono">#4F46E5</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            حفظ التغييرات
          </button>
        </div>
      </div>
    </div>
  );
}
