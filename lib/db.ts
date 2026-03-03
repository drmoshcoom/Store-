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
}

export interface Order {
  id: string;
  storeId: string;
  customerName: string;
  customerPhone: string;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  paymentScreenshot?: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  createdAt: Date;
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
      name: 'هاتف ذكي برو',
      description: 'أحدث هاتف ذكي بمواصفات عالية',
      price: 45000,
      type: 'physical',
      image: 'https://picsum.photos/seed/phone/400/400',
      stock: 10,
      status: 'active',
    },
    {
      id: 'p2',
      storeId: '1',
      name: 'دورة البرمجة الشاملة',
      description: 'تعلم البرمجة من الصفر إلى الاحتراف',
      price: 15000,
      type: 'digital',
      image: 'https://picsum.photos/seed/code/400/400',
      stock: 999,
      status: 'active',
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
