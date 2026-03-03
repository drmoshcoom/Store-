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
    features: ['أكثر من 20 ساعة فيديو', 'مشاريع عملية حقيقية', 'شهادة إتمام الدورة', 'دعم فني مباشر'],
    rating: 4.9,
    reviewCount: 124,
    reviews: [
      { id: 1, user: 'أحمد محمد', rating: 5, comment: 'دورة ممتازة جداً وشرح واضح وبسيط.', date: '2024-02-15' },
      { id: 2, user: 'سارة علي', rating: 4, comment: 'محتوى غني جداً، لكن كنت أتمنى لو كان هناك المزيد من التمارين.', date: '2024-02-10' }
    ]
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
    features: ['دليل خطوة بخطوة', 'أمثلة تطبيقية', 'قوالب مجانية مرفقة', 'تحديثات مجانية مدى الحياة'],
    rating: 4.7,
    reviewCount: 85,
    reviews: [
      { id: 1, user: 'خالد حسن', rating: 5, comment: 'كتاب رائع جداً للمبتدئين، أنصح به بشدة.', date: '2024-01-20' }
    ]
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
    features: ['سهولة الاستخدام', 'معادلات جاهزة', 'دليل استخدام مرفق', 'متوافق مع جميع إصدارات إكسل'],
    rating: 4.8,
    reviewCount: 42,
    reviews: [
      { id: 1, user: 'ليلى محمود', rating: 5, comment: 'وفرت علي الكثير من الوقت والجهد في تنظيم حساباتي.', date: '2024-02-05' }
    ]
  }
];

export default function ProductDetail() {
  const { slug, id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    const loadProduct = () => {
      const found = products.find(p => p.id === id);
      if (found) {
        setProduct(found);
      }
    };
    loadProduct();
  }, [id]);

  const handleReviewSubmit = () => {
    if (newReview.rating === 0 || !newReview.comment.trim()) return;
    
    setIsSubmittingReview(true);
    setTimeout(() => {
      const review = {
        id: Date.now(),
        user: 'أنت',
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0]
      };
      
      setProduct((prev: any) => {
        const newReviewCount = prev.reviewCount + 1;
        const newRating = ((prev.rating * prev.reviewCount) + newReview.rating) / newReviewCount;
        return {
          ...prev,
          reviews: [review, ...prev.reviews],
          reviewCount: newReviewCount,
          rating: Number(newRating.toFixed(1))
        };
      });
      
      setNewReview({ rating: 0, comment: '' });
      setIsSubmittingReview(false);
    }, 1000);
  };

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
                  <span className="text-sm font-bold text-slate-900">{product.rating}</span>
                  <span className="text-xs text-slate-400">({product.reviewCount} تقييم)</span>
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

        {/* Reviews Section */}
        <div className="mt-20 space-y-12">
          <div className="flex items-center justify-between border-b border-slate-100 pb-6">
            <h2 className="text-2xl font-bold text-slate-900">تقييمات العملاء</h2>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-2xl font-black text-slate-900">{product.rating}</p>
                <p className="text-xs text-slate-400">من 5 نجوم</p>
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={20} fill={star <= Math.round(product.rating) ? "currentColor" : "none"} />
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Review Form */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
                <h3 className="font-bold text-slate-900">أضف تقييمك</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500">التقييم</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button 
                          key={star} 
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className={`transition-all ${star <= newReview.rating ? 'text-amber-400' : 'text-slate-300 hover:text-amber-200'}`}
                        >
                          <Star size={24} fill={star <= newReview.rating ? "currentColor" : "none"} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500">رأيك</label>
                    <textarea 
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      placeholder="اكتب تجربتك مع المنتج..." 
                      className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none min-h-[120px]"
                    />
                  </div>
                  <button 
                    onClick={handleReviewSubmit}
                    disabled={isSubmittingReview || newReview.rating === 0 || !newReview.comment.trim()}
                    className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmittingReview ? 'جاري النشر...' : 'نشر التقييم'}
                  </button>
                </div>
              </div>
            </div>

            {/* Review List */}
            <div className="lg:col-span-2 space-y-8">
              {product.reviews.map((review: any) => (
                <div key={review.id} className="space-y-4 pb-8 border-b border-slate-50 last:border-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                        {review.user[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{review.user}</h4>
                        <p className="text-[10px] text-slate-400">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={12} fill={star <= review.rating ? "currentColor" : "none"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
