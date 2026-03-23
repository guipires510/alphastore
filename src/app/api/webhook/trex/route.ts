
import { NextResponse } from 'next/server';
import { initializeFirebase } from '@/firebase/index';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

/**
 * Webhook para receber notificações de pagamento.
 * Endpoint configurado no Trex Pay como postback.
 */
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is missing' }, { status: 400 });
    }

    const payload = await request.json();

    // Validação básica do evento conforme documentação/exemplo enviado
    if (payload.event === 'pix.received' && payload.data?.status === 'PAID_OUT') {
      const { firestore } = initializeFirebase();
      const orderRef = doc(firestore, 'orders', orderId);

      // Atualiza o status do pedido no Firestore
      await updateDoc(orderRef, {
        status: 'paid',
        paidAt: payload.data.paid_at || new Date().toISOString(),
        idTransaction: payload.data.idTransaction,
        paymentDetails: payload.data
      });

      return NextResponse.json({ success: true, message: 'Order updated to paid' });
    }

    return NextResponse.json({ success: true, message: 'Event ignored' });
  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
