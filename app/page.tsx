'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Store, 
  ShoppingBag, 
  LayoutDashboard, 
  Settings, 
  Plus, 
  ArrowLeft, 
  User, 
  LogOut,
  ChevronRight,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  Menu,
  X,
  Smartphone,
  Globe,
  Wallet
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <ShoppingBag size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">يمن ساس</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-slate-600 hover:text-indigo-600 transition-colors">المميزات</Link>
              <Link href="#pricing" className="text-slate-600 hover:text-indigo-600 transition-colors">الأسعار</Link>
              <Link href="/login" className="text-slate-600 hover:text-indigo-600 transition-colors">تسجيل الدخول</Link>
              <Link href="/signup" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">ابدأ متجرك مجاناً</Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-4">
                <Link href="#features" className="block text-slate-600 py-2">المميزات</Link>
                <Link href="#pricing" className="block text-slate-600 py-2">الأسعار</Link>
                <Link href="/login" className="block text-slate-600 py-2">تسجيل الدخول</Link>
                <Link href="/signup" className="block bg-indigo-600 text-white text-center px-6 py-3 rounded-xl font-medium">ابدأ متجرك مجاناً</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-50/50 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-indigo-600 uppercase bg-indigo-50 rounded-full">
              مستقبل التجارة الإلكترونية في اليمن
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">
              أنشئ متجرك الإلكتروني <br />
              <span className="text-indigo-600">في أقل من دقيقة</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              منصة متكاملة تتيح لك بيع منتجاتك، إدارة طلباتك، وقبول المدفوعات عبر المحافظ الإلكترونية اليمنية بكل سهولة وأمان.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup" className="w-full sm:w-auto bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2">
                ابدأ الآن مجاناً <ChevronRight size={20} />
              </Link>
              <Link href="#demo" className="w-full sm:w-auto bg-white text-slate-700 border border-slate-200 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                شاهد عرضاً توضيحياً
              </Link>
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-20 relative"
          >
            <div className="relative mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white border border-slate-200 rounded-md py-1 px-3 text-xs text-slate-400 text-left">
                  dashboard.yemensass.ye
                </div>
              </div>
              <img 
                src="https://picsum.photos/seed/dashboard/1200/800" 
                alt="Dashboard Preview" 
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">كل ما تحتاجه للنجاح</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">صممنا المنصة لتكون بسيطة وقوية في نفس الوقت، مع التركيز على احتياجات السوق اليمني.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Smartphone className="text-indigo-600" />,
                title: "دعم المحافظ اليمنية",
                desc: "اقبل المدفوعات عبر جيب، جوالي، فلوسك، سبأ كاش، وغيرها من المحافظ المحلية."
              },
              {
                icon: <Globe className="text-emerald-600" />,
                title: "نطاق فرعي مجاني",
                desc: "احصل على رابط خاص بمتجرك فور التسجيل (storename.yemensass.ye)."
              },
              {
                icon: <Package className="text-orange-600" />,
                title: "إدارة المنتجات",
                desc: "سواء كانت منتجات مادية أو رقمية، يمكنك إدارتها وتتبع المخزون بسهولة."
              },
              {
                icon: <BarChart3 className="text-blue-600" />,
                title: "تحليلات المبيعات",
                desc: "لوحة تحكم شاملة لمتابعة مبيعاتك، طلباتك، وعملائك في مكان واحد."
              },
              {
                icon: <Users className="text-purple-600" />,
                title: "إدارة العملاء",
                desc: "احتفظ ببيانات عملائك وتواصل معهم لبناء علاقات طويلة الأمد."
              },
              {
                icon: <Settings className="text-slate-600" />,
                title: "تخصيص كامل",
                desc: "تحكم في ألوان متجرك، شعارك، وطرق التواصل الخاصة بك بكل حرية."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <ShoppingBag size={18} />
              </div>
              <span className="text-lg font-bold text-slate-900">يمن ساس</span>
            </div>
            <div className="flex gap-8 text-slate-500 text-sm">
              <Link href="#" className="hover:text-indigo-600">الشروط والأحكام</Link>
              <Link href="#" className="hover:text-indigo-600">سياسة الخصوصية</Link>
              <Link href="#" className="hover:text-indigo-600">اتصل بنا</Link>
            </div>
            <p className="text-slate-400 text-sm">© 2024 يمن ساس. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
