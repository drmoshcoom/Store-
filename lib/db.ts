import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  onSnapshot, 
  updateDoc, 
  addDoc, 
  serverTimestamp, 
  Timestamp,
  getDocFromServer
} from 'firebase/firestore';
import { db as firestore, auth } from './firebase';

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
    available?: string[];
    jeeb?: string;
    jawali?: string;
    sabacash?: string;
    floosak?: string;
    mpay?: string;
    cash?: string;
    oen?: string;
    bankylite?: string;
  };
  banks?: {
    ykb?: { name: string; owner: string; account: string };
    kuraimi?: { name: string; owner: string; accounts: { yer: string; sar: string; usd: string } };
    rajhi?: { name: string; owner: string; account: string; iban: string };
  };
  commissionRate: number;
  createdAt: any;
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
  fileType?: string;
  rating?: number;
  reviewCount?: number;
  features?: string[];
  reviews?: any[];
}

export interface Order {
  id: string;
  storeId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
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
  createdAt: any;
  downloadToken?: string;
}

export interface Notification {
  id: string;
  storeId: string;
  title: string;
  message: string;
  type: 'order' | 'payment' | 'system';
  read: boolean;
  createdAt: any;
}

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

class DB {
  // Real Firestore methods
  async getStoreBySlug(slug: string): Promise<Store | null> {
    try {
      const q = query(collection(firestore, 'stores'), where('slug', '==', slug));
      const snapshot = await getDocs(q);
      if (snapshot.empty) return null;
      return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Store;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `stores?slug=${slug}`);
      return null;
    }
  }

  async getProductsByStoreId(storeId: string): Promise<Product[]> {
    try {
      const q = query(collection(firestore, 'products'), where('storeId', '==', storeId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, `products?storeId=${storeId}`);
      return [];
    }
  }

  async getProductById(id: string): Promise<Product | null> {
    try {
      const docRef = doc(firestore, 'products', id);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) return null;
      return { id: snapshot.id, ...snapshot.data() } as Product;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `products/${id}`);
      return null;
    }
  }

  async addOrder(order: Order) {
    try {
      const orderData = {
        ...order,
        createdAt: serverTimestamp()
      };
      await setDoc(doc(firestore, 'orders', order.id), orderData);
      return order;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `orders/${order.id}`);
    }
  }

  async updateOrderStatus(orderId: string, status: OrderStatus) {
    try {
      const orderRef = doc(firestore, 'orders', orderId);
      await updateDoc(orderRef, { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `orders/${orderId}`);
    }
  }

  subscribeToOrders(storeId: string, callback: (orders: Order[]) => void) {
    const q = query(
      collection(firestore, 'orders'), 
      where('storeId', '==', storeId)
    );
    return onSnapshot(q, (snapshot) => {
      const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
      orders.sort((a, b) => {
        const dateA = a.createdAt instanceof Timestamp ? a.createdAt.toDate() : new Date(a.createdAt);
        const dateB = b.createdAt instanceof Timestamp ? b.createdAt.toDate() : new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
      callback(orders);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `orders?storeId=${storeId}`);
    });
  }

  async addNotification(notification: Notification) {
    try {
      const notificationData = {
        ...notification,
        createdAt: serverTimestamp()
      };
      await setDoc(doc(firestore, 'notifications', notification.id), notificationData);
      return notification;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `notifications/${notification.id}`);
    }
  }

  subscribeToNotifications(storeId: string, callback: (notifications: Notification[]) => void) {
    const q = query(
      collection(firestore, 'notifications'), 
      where('storeId', '==', storeId)
    );
    return onSnapshot(q, (snapshot) => {
      const notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notification));
      // Sort by createdAt descending locally if needed, or use orderBy in query (requires index)
      notifications.sort((a, b) => {
        const dateA = a.createdAt instanceof Timestamp ? a.createdAt.toDate() : new Date(a.createdAt);
        const dateB = b.createdAt instanceof Timestamp ? b.createdAt.toDate() : new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
      callback(notifications);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `notifications?storeId=${storeId}`);
    });
  }

  async markNotificationAsRead(id: string) {
    try {
      const nRef = doc(firestore, 'notifications', id);
      await updateDoc(nRef, { read: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `notifications/${id}`);
    }
  }

  async testConnection() {
    try {
      await getDocFromServer(doc(firestore, 'test', 'connection'));
    } catch (error) {
      if (error instanceof Error && error.message.includes('the client is offline')) {
        console.error("Please check your Firebase configuration. ");
      }
    }
  }

  async seedData() {
    const storeId = '1';
    const store = {
      id: storeId,
      slug: 'tech-store',
      name: 'متجر التقنية',
      ownerEmail: 'drmoshart@gmail.com',
      status: 'active',
      primaryColor: '#0f172a',
      wallets: { jeeb: '777123456', jawali: '777654321' },
      commissionRate: 5,
      createdAt: serverTimestamp()
    };
    await setDoc(doc(firestore, 'stores', storeId), store);

    const products = [
      {
        id: 'p1',
        storeId,
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
        storeId,
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
        storeId,
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

    for (const product of products) {
      await setDoc(doc(firestore, 'products', product.id), product);
    }
  }
}

export const db = new DB();
db.testConnection();
