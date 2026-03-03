'use client';

import { useState, useEffect } from 'react';
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
  Download
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
    jeeb: '777123456',
    jawali: '777654321',
    sabacash: '777999888',
    floosak: '777555444'
  }
};

const products = [
  { id: 'p1', name: 'هاتف ذكي برو', price: 45000, image: 'https://picsum.photos/seed/p1/400/400', category: 'هواتف' },
  { id: 'p2', name: 'ساعة ذكية S3', price: 12500, image: 'https://picsum.photos/seed/p2/400/400', category: 'ساعات' },
  { id: 'p3', name: 'سماعات بلوتوث', price: 8000, image: 'https://picsum.photos/seed/p3/400/400', category: 'إكسسوارات' },
  { id: 'p4', name: 'شاحن سريع 65 واط', price: 4500, image: 'https://picsum.photos/seed/p4/400/400', category: 'إكسسوارات' },
  { id: 'p5', name: 'كاميرا مراقبة ذكية', price: 18000, image: 'https://picsum.photos/seed/p5/400/400', category: 'منزل ذكي' },
  { id: 'p6', name: 'جهاز لوحي 10 إنش', price: 32000, image: 'https://picsum.photos/seed/p6/400/400', category: 'أجهزة لوحية' },
];

export default function StoreFront() {
  const [cart, setCart] = useState<{id: string, quantity: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  const cartTotal = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
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
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 bg-white border border-slate-200 rounded-2xl text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero / Banner */}
      <section className="relative py-16 bg-indigo-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">أهلاً بك في {storeData.name}</h2>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto">{storeData.description}</p>
        </div>
      </section>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-slate-900">منتجاتنا</h3>
          <button className="flex items-center gap-2 text-sm font-bold text-slate-600 bg-white px-4 py-2 rounded-xl border border-slate-200">
            <Filter size={18} /> تصفية
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.filter(p => p.name.includes(searchQuery)).map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-wider shadow-sm">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold text-slate-900 mb-2">{product.name}</h4>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs text-slate-400 mr-1">(24 تقييم)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-extrabold text-indigo-600">{product.price.toLocaleString()} ر.ي</span>
                  <button 
                    onClick={() => addToCart(product.id)}
                    className="p-3 bg-slate-50 text-indigo-600 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                  >
                    <Plus size={20} />
                  </button>
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
                            <button className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-600">-</button>
                            <span className="text-sm font-bold">{item.quantity}</span>
                            <button className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-600">+</button>
                          </div>
                        </div>
                        <button className="text-slate-300 hover:text-red-500 transition-all self-start">
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
                <li className="flex items-center gap-2"><Phone size={16} /> 777123456</li>
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
  const [customerData, setCustomerData] = useState({ name: '', phone: '' });

  const wallets = [
    { id: 'jeeb', name: 'جيب (JeeB)', icon: 'https://picsum.photos/seed/jeeb/40/40' },
    { id: 'jawali', name: 'جوالي (Jawali)', icon: 'https://picsum.photos/seed/jawali/40/40' },
    { id: 'sabacash', name: 'سبأ كاش (SabaCash)', icon: 'https://picsum.photos/seed/saba/40/40' },
    { id: 'floosak', name: 'فلوسك (Floosak)', icon: 'https://picsum.photos/seed/floosak/40/40' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call and notifications
    setTimeout(async () => {
      const orderId = '#ORD-' + Math.floor(100000 + Math.random() * 900000);
      const mockOrder = {
        id: orderId,
        storeId: '1',
        customerName: customerData.name,
        customerPhone: customerData.phone,
        total: total,
        status: 'pending' as any,
        paymentMethod: wallets.find(w => w.id === selectedWallet)?.name || '',
        items: [],
        createdAt: new Date()
      };

      // Trigger Notifications
      await NotificationService.notifyCustomerNewOrder(mockOrder);
      await NotificationService.notifyOwnerNewOrder(mockOrder);

      setIsSubmitting(false);
      setIsSuccess(true);
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
                <p className="text-slate-600 text-xs mb-1">إلى حساب {wallets.find(w => w.id === selectedWallet)?.name}:</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-mono font-bold text-slate-900">{(storeWallets as any)[selectedWallet] || '777XXXXXX'}</span>
                  <button className="p-1.5 text-indigo-600 hover:bg-white rounded-lg transition-all"><Download size={16} /></button>
                </div>
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
