'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  ShoppingCart, 
  ChevronLeft, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Truck, 
  Smartphone,
  CheckCircle2,
  X,
  Upload,
  Loader2,
  Wallet,
  Phone,
  User,
  Trash2,
  Plus,
  Mail,
  Download,
  PlayCircle,
  BookOpen,
  FileText,
  Code,
  Palette,
  LayoutDashboard
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

// Mock Store Data (In a real app, fetch from db based on slug)
const storeData = {
  id: '1',
  name: 'متجر التقنية',
  slug: 'tech-store',
  logo: 'https://picsum.photos/seed/tech/100/100',
  primaryColor: '#4f46e5',
  description: 'وجهتك الأولى لأحدث الأجهزة الإلكترونية والملحقات في اليمن.',
  wallets: {
    number: '781139604',
    available: ['محفظة جيب', 'محفظة جوالي', 'محفظة سبأ كاش', 'محفظة فلوسك', 'محفظة mPay', 'محفظة إيزي', 'محفظة كاش', 'محفظة OEN كاش', 'محفظة بنكي لايت']
  },
  banks: {
    ykb: {
      name: 'بنك اليمن والكويت',
      owner: 'أحمد عبدالملك أحمد درموش',
      account: '0205736'
    },
    kuraimi: {
      name: 'بنك الكريمي',
      owner: 'أحمد عبدالملك أحمد درموش',
      accounts: {
        yer: '3081626633',
        sar: '3084018917',
        usd: '3183736867'
      }
    },
    rajhi: {
      name: 'بنك الراجحي',
      owner: 'محمد عبد الغني احمد منصور',
      account: '132000010006086195597',
      iban: 'SA2980000132 608016195597'
    }
  }
};

const products = [
  { 
    id: 'p1', 
    name: 'دورة تعلم البرمجة بلغة بايثون', 
    price: 15000, 
    image: 'https://picsum.photos/seed/python/400/400', 
    category: 'دورات',
    fileSize: '1.2 GB',
    fileType: 'MP4',
    rating: 4.9,
    reviewCount: 124
  },
  { 
    id: 'p2', 
    name: 'كتاب التصميم الجرافيكي للمبتدئين', 
    price: 5000, 
    image: 'https://picsum.photos/seed/design/400/400', 
    category: 'كتب',
    fileSize: '45 MB',
    fileType: 'PDF',
    rating: 4.7,
    reviewCount: 85
  },
  { 
    id: 'p3', 
    name: 'قوالب إكسل للمحاسبة المالية', 
    price: 3500, 
    image: 'https://picsum.photos/seed/excel/400/400', 
    category: 'قوالب',
    fileSize: '5 MB',
    fileType: 'XLSX',
    rating: 4.8,
    reviewCount: 42
  },
  { 
    id: 'p4', 
    name: 'برنامج إدارة المخازن والمبيعات', 
    price: 25000, 
    image: 'https://picsum.photos/seed/software/400/400', 
    category: 'برامج',
    fileSize: '150 MB',
    fileType: 'EXE',
    rating: 4.6,
    reviewCount: 28
  },
  { 
    id: 'p5', 
    name: 'حزمة أيقونات واجهة المستخدم الاحترافية', 
    price: 7500, 
    image: 'https://picsum.photos/seed/icons/400/400', 
    category: 'تصاميم',
    fileSize: '85 MB',
    fileType: 'FIG',
    rating: 4.9,
    reviewCount: 56
  }
];

import { useCart } from '@/context/CartContext';

export default function StoreFront() {
  const params = useParams();
  const { items: cart, addToCart, totalItems: cartCount, totalPrice: cartTotal, removeFromCart, updateQuantity } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const categories = [
    { name: 'الكل', icon: <LayoutDashboard size={20} /> },
    { name: 'دورات', icon: <PlayCircle size={20} /> },
    { name: 'كتب', icon: <BookOpen size={20} /> },
    { name: 'قوالب', icon: <FileText size={20} /> },
    { name: 'برامج', icon: <Code size={20} /> },
    { name: 'تصاميم', icon: <Palette size={20} /> },
  ];

  const [activeBanner, setActiveBanner] = useState(0);
  const banners = [
    {
      title: "ارتقِ بمهاراتك مع أفضل المنتجات الرقمية",
      subtitle: "اكتشف مجموعة مختارة من الدورات التدريبية، الكتب، والقوالب الجاهزة المصممة لمساعدتك.",
      badge: "عروض حصرية لفترة محدودة ✨",
      image: "https://picsum.photos/seed/digital-skills/1920/1080?blur=2",
      color: "from-indigo-900/90 via-indigo-900/40 to-transparent",
      accent: "text-indigo-400"
    },
    {
      title: "قوالب احترافية لمشاريعك القادمة",
      subtitle: "وفر وقتك وجهدك مع قوالب إكسل وتصاميم جاهزة للاستخدام الفوري.",
      badge: "جديدنا هذا الأسبوع 🚀",
      image: "https://picsum.photos/seed/templates-pro/1920/1080?blur=2",
      color: "from-emerald-900/90 via-emerald-900/40 to-transparent",
      accent: "text-emerald-400"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const [showToast, setShowToast] = useState(false);
  const [flyingIcons, setFlyingIcons] = useState<{ id: number; x: number; y: number }[]>([]);
  const cartIconRef = useRef<HTMLButtonElement>(null);

  const [cartAnimate, setCartAnimate] = useState({});
  const iconCounter = useRef(0);
  const [cartPosition, setCartPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = () => {
      if (cartIconRef.current) {
        const rect = cartIconRef.current.getBoundingClientRect();
        setCartPosition({ x: rect.left + 10, y: rect.top + 10 });
      }
    };
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, []);

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    addToCart(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);

    // Flying icon effect
    const rect = e.currentTarget.getBoundingClientRect();
    iconCounter.current += 1;
    const newIcon = {
      id: iconCounter.current,
      x: rect.left,
      y: rect.top,
    };
    setFlyingIcons(prev => [...prev, newIcon]);
    
    // Trigger cart bump after flying icon arrives
    setTimeout(() => {
      setCartAnimate({ 
        scale: [1, 1.3, 1],
        rotate: [0, -10, 10, 0]
      });
    }, 700);

    // Remove after animation
    setTimeout(() => {
      setFlyingIcons(prev => prev.filter(icon => icon.id !== newIcon.id));
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Flying Icons */}
      {flyingIcons.map(icon => (
        <motion.div
          key={icon.id}
          initial={{ x: icon.x, y: icon.y, opacity: 1, scale: 1, rotate: 0 }}
          animate={{ 
            x: cartPosition.x, 
            y: cartPosition.y,
            opacity: 0,
            scale: 0.5,
            rotate: 360
          }}
          transition={{ duration: 0.8, ease: "backIn" }}
          className="fixed z-[100] text-emerald-500 pointer-events-none drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]"
        >
          <ShoppingCart size={32} fill="currentColor" />
        </motion.div>
      ))}

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-800"
          >
            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle2 size={14} />
            </div>
            <span className="text-sm font-bold">تمت الإضافة للسلة بنجاح</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Store Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg overflow-hidden">
                <img src={storeData.logo} alt={storeData.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">{storeData.name}</h1>
                <p className="text-xs text-slate-500">متجر موثق في يمن ساس</p>
              </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="ابحث عن منتج..." 
                  className="w-full bg-slate-100 border-none rounded-2xl pr-10 pl-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link 
                href={`/s/${params.slug}/account`}
                className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
              >
                <User size={22} />
              </Link>
              <motion.button 
                ref={cartIconRef}
                animate={cartAnimate}
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 bg-white border border-slate-200 rounded-2xl text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={cartCount}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero / Banner Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-[350px] md:h-[480px] rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-2xl shadow-indigo-200/50">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeBanner}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                {/* Background Image/Pattern */}
                <div className="absolute inset-0">
                  <img 
                    src={banners[activeBanner].image} 
                    className="w-full h-full object-cover opacity-40" 
                    alt="Banner" 
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${banners[activeBanner].color}`} />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-center px-8 md:px-16 max-w-2xl text-right">
                  <motion.span 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold mb-6 w-fit"
                  >
                    {banners[activeBanner].badge}
                  </motion.span>
                  <motion.h2 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-6xl font-black text-white mb-6 leading-tight"
                  >
                    {banners[activeBanner].title.split('مع').map((part, i) => (
                      <span key={i}>
                        {part} {i === 0 && <br />}
                      </span>
                    ))}
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-white/70 text-sm md:text-lg mb-8 leading-relaxed"
                  >
                    {banners[activeBanner].subtitle}
                  </motion.p>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-4"
                  >
                    <button className="bg-white text-slate-900 px-8 py-3.5 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-lg shadow-white/10 text-sm">
                      تصفح الآن
                    </button>
                    <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-white/20 transition-all text-sm">
                      من نحن
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {banners.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveBanner(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeBanner === i ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-4 bg-white border-y border-slate-100 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2 -mb-2 cursor-grab active:cursor-grabbing select-none">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 border shadow-sm hover:shadow-md ${
                  selectedCategory === cat.name
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-indigo-100'
                    : 'bg-white text-slate-600 border-slate-100 hover:border-indigo-200 hover:text-indigo-600'
                }`}
              >
                <span className={`${selectedCategory === cat.name ? 'text-white' : 'text-indigo-500'}`}>
                  {cat.icon}
                </span>
                <span className="text-sm font-bold">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900">أحدث المنتجات</h3>
            <p className="text-slate-500 text-sm mt-1">اختر من بين أفضل الأدوات الرقمية المتاحة</p>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-slate-600 bg-white px-5 py-2.5 rounded-2xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-all">
            <Filter size={18} /> تصفية المنتجات
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {products
            .filter(p => 
              (selectedCategory === 'الكل' || p.category === selectedCategory) && 
              p.name.includes(searchQuery)
            )
            .map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -8 }}
              className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-300 group flex flex-col"
            >
              <Link href={`/s/${params.slug}/product/${product.id}`} className="relative aspect-square overflow-hidden bg-slate-50">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-indigo-600 uppercase tracking-wider shadow-sm border border-white">
                    {product.category}
                  </span>
                </div>
              </Link>
              
              <div className="p-4 md:p-6 flex flex-col flex-1">
                <Link href={`/s/${params.slug}/product/${product.id}`} className="flex-1">
                  <h4 className="text-sm md:text-lg font-bold text-slate-900 mb-2 hover:text-indigo-600 transition-all line-clamp-2 leading-snug">
                    {product.name}
                  </h4>
                </Link>
                
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  <Star size={12} fill="currentColor" />
                  <span className="text-[10px] font-bold text-slate-400 mr-1">{product.rating} ({product.reviewCount})</span>
                </div>

                <div className="space-y-3 mt-auto">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg md:text-2xl font-black text-indigo-600">{product.price.toLocaleString()}</span>
                    <span className="text-[10px] md:text-xs font-bold text-slate-400">ر.ي</span>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={(e) => {
                        handleAddToCart(product as any, e);
                      }}
                      className="w-full bg-emerald-500 text-white py-2.5 md:py-3 rounded-xl md:rounded-2xl font-bold text-[10px] md:text-sm hover:bg-emerald-600 transition-all shadow-md shadow-emerald-100 flex items-center justify-center gap-1.5 md:gap-2 active:scale-95"
                    >
                      <ShoppingCart size={16} className="md:w-5 md:h-5" />
                      أضف للسلة
                    </button>
                    <button 
                      onClick={(e) => {
                        handleAddToCart(product as any, e);
                        setIsCartOpen(false);
                        setIsCheckoutOpen(true);
                      }}
                      className="w-full bg-indigo-600 text-white py-2.5 md:py-3 rounded-xl md:rounded-2xl font-bold text-[10px] md:text-sm hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-1.5 md:gap-2 active:scale-95"
                    >
                      اشترِ الآن
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <ShoppingCart size={24} /> سلة التسوق
                </h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl transition-all">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                    <ShoppingBag size={64} strokeWidth={1} />
                    <p className="text-lg font-medium">سلة التسوق فارغة</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="text-indigo-600 font-bold hover:underline"
                    >
                      ابدأ التسوق الآن
                    </button>
                  </div>
                ) : (
                  cart.map((item) => {
                    const product = products.find(p => p.id === item.id);
                    if (!product) return null;
                    return (
                      <div key={item.id} className="flex gap-4">
                        <img src={product.image} className="w-20 h-20 rounded-2xl object-cover border border-slate-100" alt="" />
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900">{product.name}</h4>
                          <p className="text-sm text-slate-500">{product.price.toLocaleString()} ر.ي</p>
                          <div className="flex items-center gap-3 mt-2">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-600"
                            >
                              -
                            </button>
                            <span className="text-sm font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-600"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-300 hover:text-red-500 transition-all self-start"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-slate-600">الإجمالي:</span>
                    <span className="font-extrabold text-indigo-600">{cartTotal.toLocaleString()} ر.ي</span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                  >
                    إتمام الطلب <ArrowRight size={20} />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <CheckoutModal 
            onClose={() => setIsCheckoutOpen(false)} 
            total={cartTotal} 
            storeWallets={storeData.wallets}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                  <ShoppingBag size={24} />
                </div>
                <span className="text-xl font-bold text-slate-900">{storeData.name}</span>
              </div>
              <p className="text-slate-500 leading-relaxed max-w-sm">
                {storeData.description}
              </p>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 mb-6">روابط سريعة</h5>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li><Link href="#" className="hover:text-indigo-600">الرئيسية</Link></li>
                <li><Link href="#" className="hover:text-indigo-600">منتجاتنا</Link></li>
                <li><Link href="#" className="hover:text-indigo-600">من نحن</Link></li>
                <li><Link href="#" className="hover:text-indigo-600">تواصل معنا</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 mb-6">تواصل معنا</h5>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li className="flex items-center gap-2"><Phone size={16} /> 781139604</li>
                <li className="flex items-center gap-2"><Mail size={16} /> info@techstore.ye</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs">
            <p>© 2024 {storeData.name}. جميع الحقوق محفوظة.</p>
            <div className="flex items-center gap-2">
              <span>مدعوم بواسطة</span>
              <Link href="/" className="font-bold text-indigo-600">يمن ساس</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { NotificationService } from '@/lib/notifications';

function CheckoutModal({ onClose, total, storeWallets }: { onClose: () => void, total: number, storeWallets: any }) {
  const [step, setStep] = useState(1);
  const [selectedWallet, setSelectedWallet] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [customerData, setCustomerData] = useState({ name: '', phone: '', email: '' });

  const wallets = [
    { id: 'e_wallets', name: 'المحافظ الإلكترونية', icon: 'https://picsum.photos/seed/wallet/40/40' },
    { id: 'ykb', name: 'بنك اليمن والكويت', icon: 'https://picsum.photos/seed/ykb/40/40' },
    { id: 'kuraimi', name: 'بنك الكريمي', icon: 'https://picsum.photos/seed/kuraimi/40/40' },
    { id: 'rajhi', name: 'بنك الراجحي', icon: 'https://picsum.photos/seed/rajhi/40/40' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call and notifications
    setTimeout(async () => {
      const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      const mockOrder = {
        id: orderId,
        storeId: '1',
        customerName: customerData.name,
        customerPhone: customerData.phone,
        customerEmail: customerData.email,
        total: total,
        status: 'pending' as any,
        paymentMethod: selectedWallet as any,
        items: [],
        createdAt: new Date()
      };

      // Construct WhatsApp Message
      const message = `طلب جديد من متجر ${storeData.name}:
العميل: ${customerData.name}
رقم الطلب: ${orderId}
المبلغ: ${total.toLocaleString()} ر.ي
وسيلة الدفع: ${wallets.find(w => w.id === selectedWallet)?.name}
رقم الهاتف: ${customerData.phone}`;
      
      const whatsappUrl = `https://wa.me/967781139604?text=${encodeURIComponent(message)}`;
      
      // Trigger Notifications
      await NotificationService.notifyCustomerNewOrder(mockOrder as any);
      await NotificationService.notifyOwnerNewOrder(mockOrder as any);

      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Open WhatsApp in new tab after a short delay
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 1000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white w-full max-w-md rounded-3xl p-10 text-center space-y-6"
        >
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={48} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">تم استلام طلبك بنجاح!</h3>
          <p className="text-slate-600">طلبك الآن قيد المراجعة. سيتم إشعارك فور تأكيد الدفع من قبل المتجر.</p>
          <div className="bg-slate-50 p-4 rounded-2xl text-sm font-mono text-slate-500">
            رقم الطلب: #ORD-99283
          </div>
          <button 
            onClick={onClose}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all"
          >
            العودة للمتجر
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-xl font-bold text-slate-900">إتمام الطلب</h3>
            <p className="text-xs text-slate-500">الخطوة {step} من 2</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {step === 1 ? (
            <div className="space-y-8">
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <User size={18} className="text-indigo-600" /> المعلومات الشخصية
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500">الاسم الكامل</label>
                    <input 
                      type="text" 
                      placeholder="أدخل اسمك..." 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      value={customerData.name}
                      onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500">رقم الهاتف</label>
                    <input 
                      type="tel" 
                      placeholder="777XXXXXX" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-left" 
                      dir="ltr" 
                      value={customerData.phone}
                      onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500">البريد الإلكتروني</label>
                    <input 
                      type="email" 
                      placeholder="example@mail.com" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-left" 
                      dir="ltr" 
                      value={customerData.email}
                      onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <Wallet size={18} className="text-indigo-600" /> اختر وسيلة الدفع
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {wallets.map((wallet) => (
                    <button 
                      key={wallet.id}
                      onClick={() => setSelectedWallet(wallet.id)}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                        selectedWallet === wallet.id 
                        ? 'border-indigo-600 bg-indigo-50 shadow-md shadow-indigo-100' 
                        : 'border-slate-100 bg-white hover:border-slate-200'
                      }`}
                    >
                      <img src={wallet.icon} className="w-10 h-10 rounded-lg" alt="" />
                      <span className="text-[10px] font-bold text-slate-700">{wallet.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 text-center">
                <p className="text-indigo-600 text-sm mb-2">يرجى تحويل مبلغ</p>
                <h4 className="text-3xl font-extrabold text-indigo-900 mb-4">{total.toLocaleString()} ر.ي</h4>
                
                {selectedWallet === 'e_wallets' ? (
                  <div className="space-y-4">
                    <p className="text-slate-600 text-xs">يمكنكم تحويل المبلغ على الرقم التالي:</p>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 text-center space-y-3">
                      <div className="flex items-center justify-center gap-2 text-indigo-600 font-black text-2xl">
                        <Smartphone size={24} />
                        <span>781139604</span>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2">
                        {storeData.wallets.available.map((w, i) => (
                          <span key={i} className="bg-slate-50 px-2 py-1 rounded-lg text-[10px] text-slate-500 border border-slate-100">{w}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : selectedWallet === 'ykb' ? (
                  <div className="space-y-4">
                    <p className="text-slate-600 text-xs">تفاصيل الحساب في {storeData.banks.ykb.name}:</p>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 text-right space-y-2">
                      <p className="text-xs text-slate-500">اسم صاحب الحساب: <span className="text-slate-900 font-bold">{storeData.banks.ykb.owner}</span></p>
                      <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl">
                        <div className="text-right">
                          <p className="text-[10px] text-slate-400">رقم الحساب</p>
                          <p className="text-sm font-bold text-slate-900">{storeData.banks.ykb.account}</p>
                        </div>
                        <button className="text-indigo-600"><Download size={14} /></button>
                      </div>
                    </div>
                  </div>
                ) : selectedWallet === 'kuraimi' ? (
                  <div className="space-y-4">
                    <p className="text-slate-600 text-xs">تفاصيل الحساب في {storeData.banks.kuraimi.name}:</p>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 text-right space-y-3">
                      <p className="text-xs text-slate-500">اسم صاحب الحساب: <span className="text-slate-900 font-bold">{storeData.banks.kuraimi.owner}</span></p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg">
                          <span className="text-[10px] text-slate-400">ريال يمني</span>
                          <span className="text-xs font-bold text-slate-900">{storeData.banks.kuraimi.accounts.yer}</span>
                        </div>
                        <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg">
                          <span className="text-[10px] text-slate-400">ريال سعودي</span>
                          <span className="text-xs font-bold text-slate-900">{storeData.banks.kuraimi.accounts.sar}</span>
                        </div>
                        <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg">
                          <span className="text-[10px] text-slate-400">دولار</span>
                          <span className="text-xs font-bold text-slate-900">{storeData.banks.kuraimi.accounts.usd}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : selectedWallet === 'rajhi' ? (
                  <div className="space-y-4">
                    <p className="text-slate-600 text-xs">تفاصيل الحساب في {storeData.banks.rajhi.name}:</p>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 text-right space-y-3">
                      <p className="text-xs text-slate-500">اسم صاحب الحساب: <span className="text-slate-900 font-bold">{storeData.banks.rajhi.owner}</span></p>
                      <div className="space-y-2">
                        <div className="bg-slate-50 p-2 rounded-lg">
                          <p className="text-[10px] text-slate-400">رقم الحساب</p>
                          <p className="text-xs font-bold text-slate-900 break-all">{storeData.banks.rajhi.account}</p>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg">
                          <p className="text-[10px] text-slate-400">رقم الآيبان (IBAN)</p>
                          <p className="text-xs font-bold text-slate-900 break-all">{storeData.banks.rajhi.iban}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <Upload size={18} className="text-indigo-600" /> إثبات الدفع
                </h4>
                <div className="border-2 border-dashed border-slate-200 rounded-3xl p-10 text-center space-y-4 hover:border-indigo-300 transition-all cursor-pointer bg-slate-50/50">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-400 mx-auto shadow-sm">
                    <Upload size={32} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700">ارفع صورة إشعار التحويل</p>
                    <p className="text-xs text-slate-400 mt-1">PNG, JPG حتى 5 ميجابايت</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
          <div className="text-right">
            <p className="text-xs text-slate-500">إجمالي الطلب</p>
            <p className="text-xl font-extrabold text-indigo-600">{total.toLocaleString()} ر.ي</p>
          </div>
          <div className="flex gap-3">
            {step === 2 && (
              <button 
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-white transition-all"
              >
                السابق
              </button>
            )}
            <button 
              onClick={step === 1 ? () => setStep(2) : handleSubmit}
              disabled={step === 1 && !selectedWallet || isSubmitting}
              className="bg-indigo-600 text-white px-10 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : step === 1 ? 'التالي' : 'تأكيد الطلب'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
