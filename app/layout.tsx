import { Inter, Cairo } from 'next/font/google'
import './globals.css';
import { CartProvider } from '@/context/CartContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-arabic',
})

export const metadata = {
  title: 'YemenSaaS - منصة التجارة الإلكترونية اليمنية',
  description: 'أنشئ متجرك الإلكتروني في دقائق واقبل المدفوعات عبر المحافظ اليمنية',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={`${inter.variable} ${cairo.variable}`}>
      <body className="font-arabic antialiased bg-slate-50 text-slate-900" suppressHydrationWarning>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
