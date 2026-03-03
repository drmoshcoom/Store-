'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Store, 
  Users, 
  BarChart3, 
  Settings, 
  Search, 
  Bell, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Globe,
  LayoutDashboard,
  Edit,
  Trash2
} from 'lucide-react';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('stores');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-slate-950 border-l border-slate-800 flex flex-col">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Shield size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">لوحة الإدارة</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {[
            { id: 'overview', label: 'الإحصائيات العامة', icon: <BarChart3 size={20} /> },
            { id: 'stores', label: 'إدارة المتاجر', icon: <Store size={20} /> },
            { id: 'users', label: 'المستخدمين', icon: <Users size={20} /> },
            { id: 'subscriptions', label: 'الاشتراكات', icon: <DollarSign size={20} /> },
            { id: 'settings', label: 'إعدادات المنصة', icon: <Settings size={20} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                ? 'bg-indigo-600 text-white font-bold' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Admin Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-8 shrink-0">
          <h1 className="text-2xl font-bold">إدارة المنصة</h1>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="بحث..." 
                className="bg-slate-900 border border-slate-800 rounded-xl pr-10 pl-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64 text-white"
              />
            </div>
            <button className="p-2 text-slate-400 hover:bg-slate-800 rounded-xl transition-all">
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-3 border-r border-slate-800 pr-6">
              <div className="text-left">
                <p className="text-sm font-bold">المدير العام</p>
                <p className="text-xs text-slate-500">admin@yemensass.ye</p>
              </div>
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center font-bold">AD</div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'overview' && <AdminOverview />}
          {activeTab === 'stores' && <AdminStores />}
        </div>
      </main>
    </div>
  );
}

function AdminOverview() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'إجمالي المتاجر', value: '1,284', icon: <Store />, color: 'text-indigo-500' },
          { label: 'المتاجر النشطة', value: '1,150', icon: <CheckCircle2 />, color: 'text-emerald-500' },
          { label: 'إجمالي المبيعات', value: '12.5M ر.ي', icon: <TrendingUp />, color: 'text-blue-500' },
          { label: 'عمولة المنصة', value: '625K ر.ي', icon: <DollarSign />, color: 'text-amber-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center ${stat.color} shadow-inner`}>
                {stat.icon}
              </div>
            </div>
            <p className="text-slate-500 text-sm mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 shadow-xl">
        <h3 className="text-xl font-bold mb-6">المتاجر المنشأة حديثاً</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-indigo-500 font-bold">S{i}</div>
                <div>
                  <p className="font-bold">متجر الأمل {i}</p>
                  <p className="text-xs text-slate-500">hope-store-{i}.yemensass.ye</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-xs text-slate-500">تاريخ الانضمام</p>
                  <p className="text-sm">2024/03/02</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-full">نشط</span>
                <button className="p-2 text-slate-500 hover:text-white"><MoreVertical size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminStores() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="البحث عن متجر..." 
              className="bg-slate-950 border border-slate-800 rounded-xl pr-10 pl-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64 text-white"
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <table className="w-full text-right">
          <thead className="bg-slate-900 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-slate-400">المتجر</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-400">المالك</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-400">الاشتراك</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-400">المبيعات</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-400">الحالة</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-400">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {[
              { id: 1, name: 'متجر التقنية', owner: 'محمد أحمد', plan: 'احترافي', sales: '450,000 ر.ي', status: 'active' },
              { id: 2, name: 'أزياء عدن', owner: 'سارة علي', plan: 'مجاني', sales: '85,000 ر.ي', status: 'active' },
              { id: 3, name: 'بهارات صنعاء', owner: 'خالد حسن', plan: 'أساسي', sales: '120,000 ر.ي', status: 'inactive' },
              { id: 4, name: 'مكتبة الجيل', owner: 'ليلى عبدالله', plan: 'احترافي', sales: '310,000 ر.ي', status: 'active' },
            ].map((store) => (
              <tr key={store.id} className="hover:bg-slate-900/50 transition-all">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-indigo-500 font-bold">{store.name[0]}</div>
                    <span className="font-bold">{store.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">{store.owner}</td>
                <td className="px-6 py-4 text-sm text-slate-400">{store.plan}</td>
                <td className="px-6 py-4 text-sm font-bold">{store.sales}</td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                    store.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {store.status === 'active' ? 'نشط' : 'معطل'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-500 hover:text-indigo-500 hover:bg-indigo-500/10 rounded-lg transition-all"><Edit size={18} /></button>
                    <button className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"><Trash2 size={18} /></button>
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
