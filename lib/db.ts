/**
 * Simple In-Memory Database for MVP
 * In a real production app, this would be replaced with PostgreSQL/Prisma
 */

export type StoreStatus = 'active' | 'inactive';
export type OrderStatus = 'pending' | 'approved' | 'rejected';
export type ProductType = 'physical' | 'digital';

export interface Store {
  id: string;
  slug: string;
  name: string;
  ownerEmail: string;
  status: StoreStatus;
  logo?: string;
  primaryColor: string;
  wallets: {
    jeeb?: string;
    jawali?: string;
    sabacash?: string;
    floosak?: string;
    mpay?: string;
    cash?: string;
    oen?: string;
    bankylite?: string;
  };
  commissionRate: number;
  createdAt: Date;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  description: string;
  price: number;
  type: ProductType;
  image?: string;
  stock: number;
  status: 'active' | 'inactive';
  digitalFileUrl?: string;
  fileSize?: string;
  fileType?: string; // e.g., 'PDF', 'ZIP', 'MP4'
}

export type PaymentMethodType = 'bank_local' | 'bank_intl' | 'paypal' | 'crypto';

export interface Order {
  id: string;
  storeId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethodType;
  paymentScreenshot?: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  createdAt: Date;
  downloadToken?: string; // For secure downloads
}

export interface Notification {
  id: string;
  storeId: string;
  title: string;
  message: string;
  type: 'order' | 'payment' | 'system';
  read: boolean;
  createdAt: Date;
}

// Mock Data Storage
class DB {
  stores: Store[] = [
    {
      id: '1',
      slug: 'tech-store',
      name: 'متجر التقنية',
      ownerEmail: 'drmoshart@gmail.com',
      status: 'active',
      primaryColor: '#0f172a',
      wallets: { jeeb: '777123456', jawali: '777654321' },
      commissionRate: 5,
      createdAt: new Date(),
    }
  ];
  products: Product[] = [
    {
      id: 'p1',
      storeId: '1',
      name: 'دورة تعلم البرمجة بلغة بايثون',
      description: 'دورة شاملة من الصفر إلى الاحتراف في لغة بايثون، تشمل المشاريع العملية.',
      price: 15000,
      type: 'digital',
      image: 'https://picsum.photos/seed/python/400/400',
      stock: 999,
      status: 'active',
      fileSize: '1.2 GB',
      fileType: 'MP4',
      digitalFileUrl: 'https://example.com/download/python-course.zip'
    },
    {
      id: 'p2',
      storeId: '1',
      name: 'كتاب التصميم الجرافيكي للمبتدئين',
      description: 'دليل شامل لتعلم أساسيات التصميم الجرافيكي باستخدام أدوات مجانية.',
      price: 5000,
      type: 'digital',
      image: 'https://picsum.photos/seed/design/400/400',
      stock: 999,
      status: 'active',
      fileSize: '45 MB',
      fileType: 'PDF',
      digitalFileUrl: 'https://example.com/download/design-book.pdf'
    },
    {
      id: 'p3',
      storeId: '1',
      name: 'قوالب إكسل للمحاسبة المالية',
      description: 'مجموعة من القوالب الجاهزة لتنظيم حساباتك المالية الشخصية أو التجارية.',
      price: 3500,
      type: 'digital',
      image: 'https://picsum.photos/seed/excel/400/400',
      stock: 999,
      status: 'active',
      fileSize: '5 MB',
      fileType: 'XLSX',
      digitalFileUrl: 'https://example.com/download/excel-templates.zip'
    }
  ];
  orders: Order[] = [];
  notifications: Notification[] = [];

  // Helper methods
  getStoreBySlug(slug: string) {
    return this.stores.find(s => s.slug === slug);
  }

  getStoreById(id: string) {
    return this.stores.find(s => s.id === id);
  }

  getProductsByStoreId(storeId: string) {
    return this.products.filter(p => p.storeId === storeId);
  }

  getOrdersByStoreId(storeId: string) {
    return this.orders.filter(o => o.storeId === storeId);
  }

  addOrder(order: Order) {
    this.orders.push(order);
    return order;
  }

  updateOrderStatus(orderId: string, status: OrderStatus) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) order.status = status;
    return order;
  }

  addStore(store: Store) {
    this.stores.push(store);
    return store;
  }

  addProduct(product: Product) {
    this.products.push(product);
    return product;
  }

  addNotification(notification: Notification) {
    this.notifications.unshift(notification);
    return notification;
  }

  getNotificationsByStoreId(storeId: string) {
    return this.notifications.filter(n => n.storeId === storeId);
  }

  markNotificationAsRead(id: string) {
    const n = this.notifications.find(n => n.id === id);
    if (n) n.read = true;
  }
}

export const db = new DB();
