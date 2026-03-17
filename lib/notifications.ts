import { db, Order, OrderStatus } from './db';

/**
 * Mock Email Service
 * In a real app, this would use Nodemailer, SendGrid, or AWS SES
 */
export const sendEmail = async (to: string, subject: string, body: string) => {
  console.log(`[MOCK EMAIL] To: ${to}`);
  console.log(`[MOCK EMAIL] Subject: ${subject}`);
  console.log(`[MOCK EMAIL] Body: ${body}`);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
};

/**
 * Notification Service
 */
export const NotificationService = {
  /**
   * Notify customer about their new order
   */
  async notifyCustomerNewOrder(order: Order) {
    const subject = `تأكيد طلبك رقم ${order.id} - يمن ساس`;
    const body = `
      مرحباً ${order.customerName}،
      
      شكراً لتسوقك معنا. تم استلام طلبك بنجاح وهو الآن قيد المراجعة.
      
      تفاصيل الطلب:
      - رقم الطلب: ${order.id}
      - الإجمالي: ${order.total.toLocaleString()} ر.ي
      - وسيلة الدفع: ${order.paymentMethod}
      
      سنقوم بإشعارك فور تأكيد الدفع.
    `;
    await sendEmail(order.customerPhone + '@example.com', subject, body);
  },

  /**
   * Notify store owner about a new order
   */
  async notifyOwnerNewOrder(order: Order) {
    await db.addNotification({
      id: Math.random().toString(36).substr(2, 9),
      storeId: order.storeId,
      title: 'طلب جديد!',
      message: `لديك طلب جديد من ${order.customerName} بمبلغ ${order.total.toLocaleString()} ر.ي`,
      type: 'order',
      read: false,
      createdAt: new Date()
    });
  },

  /**
   * Notify store owner about payment status change
   */
  async notifyOwnerPaymentStatusChange(orderId: string, newStatus: OrderStatus) {
    // In a real app, we'd fetch the order first if needed, 
    // but here we just need the storeId which we can pass or assume for now.
    // For simplicity, let's just update the order status and add a notification.
    
    await db.updateOrderStatus(orderId, newStatus);

    const statusMap = {
      'approved': 'مقبول',
      'rejected': 'مرفوض',
      'pending': 'معلق'
    };

    await db.addNotification({
      id: Math.random().toString(36).substr(2, 9),
      storeId: '1', // Mock storeId for now, should be dynamic
      title: 'تحديث حالة الدفع',
      message: `تم تغيير حالة الدفع للطلب ${orderId} إلى ${statusMap[newStatus]}`,
      type: 'payment',
      read: false,
      createdAt: new Date()
    });
  }
};
