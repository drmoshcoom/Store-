'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Download, 
  ShoppingBag, 
  User, 
  LogOut, 
  ChevronLeft, 
  ExternalLink,
  FileText,
  ShieldCheck,
  Clock,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

// Mock Orders for Customer
const mockOrders = [
  {
    id: 'ORD-123456',
    date: '2024-03-01',
    total: 15000,
    status: 'approved',
    items: [
      { id: 'p1', name: 'دورة تعلم البرمجة بلغة بايثون', price: 15000, downloadUrl: '#' }
    ]
  },
  {
    id: 'ORD-789012',
    date: '2024-02-25',
    total: 5000,
    status: 'pending',
    items: [
      { id: 'p2', name: 'كتاب التصميم الجرافيكي للمبتدئين', price: 5000, downloadUrl: '#' }
    ]
  }
];

export default function CustomerAccount() {
  const { slug } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('downloads');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-slate-50 rounded-xl transition-all">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-xl font-bold text-slate-900">حسابي</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
              م
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-bold text-slate-900">محمد أحمد</p>
              <p className="text-[10px] text-slate-500">mohamed@example.com</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar Nav */}
          <div className="md:col-span-1 space-y-2">
            <button 
              onClick={() => setActiveTab('downloads')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'downloads' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Download size={20} /> <span className="font-bold">تحميلاتي</span>
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'orders' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ShoppingBag size={20} /> <span className="font-bold">طلباتي</span>
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              <User size={20} /> <span className="font-bold">الملف الشخصي</span>
            </button>
            <div className="pt-4">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all">
                <LogOut size={20} /> <span className="font-bold">تسجيل الخروج</span>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="md:col-span-3 space-y-6">
            {activeTab === 'downloads' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">المنتجات الجاهزة للتحميل</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {mockOrders.filter(o => o.status === 'approved').flatMap(o => o.items).map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="flex gap-4 mb-6">
                        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                          <FileText size={32} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 leading-tight mb-1">{item.name}</h4>
                          <p className="text-[10px] text-slate-400">تم الشراء في 2024-03-01</p>
                        </div>
                      </div>
                      <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all">
                        <Download size={18} /> تحميل الملف
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">سجل الطلبات</h2>
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                  <table className="w-full text-right">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-6 py-4 text-xs font-bold text-slate-500">رقم الطلب</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500">التاريخ</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500">الإجمالي</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500">الحالة</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {mockOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50/50 transition-all">
                          <td className="px-6 py-4 text-sm font-bold text-slate-900">{order.id}</td>
                          <td className="px-6 py-4 text-sm text-slate-500">{order.date}</td>
                          <td className="px-6 py-4 text-sm font-bold text-indigo-600">{order.total.toLocaleString()} ر.ي</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                              order.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                            }`}>
                              {order.status === 'approved' ? 'مكتمل' : 'قيد المراجعة'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-slate-400 hover:text-indigo-600 transition-all"><ExternalLink size={18} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">إعدادات الملف الشخصي</h2>
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center text-3xl font-black shadow-inner">
                      م
                    </div>
                    <button className="text-sm font-bold text-indigo-600 hover:underline">تغيير الصورة</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500">الاسم الكامل</label>
                      <input type="text" defaultValue="محمد أحمد" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500">البريد الإلكتروني</label>
                      <input type="email" defaultValue="mohamed@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-left" dir="ltr" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500">رقم الهاتف</label>
                      <input type="tel" defaultValue="777123456" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-left" dir="ltr" />
                    </div>
                  </div>
                  <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                    حفظ التغييرات
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 py-12 border-t border-slate-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">تحميلات آمنة</p>
              <p className="text-[10px] text-slate-500">روابط مشفرة ومؤقتة</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">وصول مدى الحياة</p>
              <p className="text-[10px] text-slate-500">لمنتجاتك المشتراة</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">تحديثات مجانية</p>
              <p className="text-[10px] text-slate-500">للمحتوى الرقمي</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
              <Download size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">تحميل فوري</p>
              <p className="text-[10px] text-slate-500">بعد تأكيد الدفع</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
