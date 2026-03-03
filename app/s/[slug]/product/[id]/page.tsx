'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingCart, 
  ChevronLeft, 
  Star, 
  ShieldCheck, 
  Download,
  Share2,
  CheckCircle2,
  ArrowRight,
  FileText,
  Zap,
  Globe,
  User
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

// Mock Data (In a real app, fetch from db)
const products = [
  { 
    id: 'p1', 
    name: 'دورة تعلم البرمجة بلغة بايثون', 
    price: 15000, 
    image: 'https://picsum.photos/seed/python/800/800', 
    category: 'هواتف',
    description: 'دورة شاملة من الصفر إلى الاحتراف في لغة بايثون، تشمل المشاريع العملية والتمارين التفاعلية. ستتعلم أساسيات اللغة، التعامل مع البيانات، وبناء تطبيقات ويب حقيقية.',
    fileSize: '1.2 GB',
    fileType: 'MP4',
    features: ['أكثر من 20 ساعة فيديو', 'مشاريع عملية حقيقية', 'شهادة إتمام الدورة', 'دعم فني مباشر']
  },
  { 
    id: 'p2', 
    name: 'كتاب التصميم الجرافيكي للمبتدئين', 
    price: 5000, 
    image: 'https://picsum.photos/seed/design/800/800', 
    category: 'ساعات',
    description: 'دليل شامل لتعلم أساسيات التصميم الجرافيكي باستخدام أدوات مجانية. يغطي الكتاب نظريات الألوان، اختيار الخطوط، وتنسيق العناصر البصرية بشكل احترافي.',
    fileSize: '45 MB',
    fileType: 'PDF',
    features: ['دليل خطوة بخطوة', 'أمثلة تطبيقية', 'قوالب مجانية مرفقة', 'تحديثات مجانية مدى الحياة']
  },
  { 
    id: 'p3', 
    name: 'قوالب إكسل للمحاسبة المالية', 
    price: 3500, 
    image: 'https://picsum.photos/seed/excel/800/800', 
    category: 'إكسسوارات',
    description: 'مجموعة من القوالب الجاهزة لتنظيم حساباتك المالية الشخصية أو التجارية. تشمل قوالب للميزانية، تتبع المصاريف، وإدارة المخزون بشكل مبسط.',
    fileSize: '5 MB',
    fileType: 'XLSX',
    features: ['سهولة الاستخدام', 'معادلات جاهزة', 'دليل استخدام مرفق', 'متوافق مع جميع إصدارات إكسل']
  }
];

export default function ProductDetail() {
  const { slug, id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const loadProduct = () => {
      const found = products.find(p => p.id === id);
      if (found) {
        setProduct(found);
      }
    };
    loadProduct();
  }, [id]);

  if (!product) return <div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-50 rounded-xl transition-all flex items-center gap-2 text-slate-600">
            <ChevronLeft size={20} /> العودة
          </button>
          <div className="flex items-center gap-2">
            <Link href={`/s/${slug}/account`} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400"><User size={20} /></Link>
            <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-400"><Share2 size={20} /></button>
            <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-400"><Star size={20} /></button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-square rounded-[2rem] overflow-hidden bg-slate-100 border border-slate-100 shadow-2xl shadow-slate-200/50">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden cursor-pointer hover:border-indigo-300 transition-all">
                  <img src={`https://picsum.photos/seed/${product.id}${i}/200/200`} className="w-full h-full object-cover" alt="" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">منتج رقمي</span>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-bold text-slate-900">4.9</span>
                  <span className="text-xs text-slate-400">(120 تقييم)</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">{product.name}</h1>
              <p className="text-4xl font-black text-indigo-600">{product.price.toLocaleString()} <span className="text-lg font-bold">ر.ي</span></p>
            </div>

            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2"><Download size={16} /> حجم الملف</span>
                <span className="font-bold text-slate-900">{product.fileSize}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2"><FileText size={16} /> نوع الملف</span>
                <span className="font-bold text-slate-900">{product.fileType}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2"><Zap size={16} /> التسليم</span>
                <span className="font-bold text-emerald-600">تلقائي فوري</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-900">وصف المنتج</h3>
              <p className="text-slate-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-900">ماذا ستحصل عليه؟</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => addToCart(product)}
                className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3"
              >
                <ShoppingCart size={24} /> أضف للسلة
              </button>
              <button className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all">
                اشتري الآن
              </button>
            </div>

            <div className="flex items-center justify-center gap-8 pt-4">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck size={24} className="text-slate-400" />
                <span className="text-[10px] text-slate-500">دفع آمن</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Globe size={24} className="text-slate-400" />
                <span className="text-[10px] text-slate-500">وصول عالمي</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Zap size={24} className="text-slate-400" />
                <span className="text-[10px] text-slate-500">تحميل فوري</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
