'use server';
/**
 * @fileOverview Fluxo Genkit para processar pagamentos de forma segura.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { createPixPayment } from '@/lib/trex-pay';

const CreateTrexPaymentInputSchema = z.object({
  amount: z.number(),
  customer: z.object({
    name: z.string(),
    email: z.string(),
    whatsapp: z.string(),
    document: z.string(),
  }),
  orderId: z.string(),
});

const CreateTrexPaymentOutputSchema = z.object({
  success: z.boolean(),
  pixPayload: z.string(),
  qrCodeUrl: z.string(),
  paymentId: z.string(),
  error: z.string().optional(),
});

export type CreateTrexPaymentInput = z.infer<typeof CreateTrexPaymentInputSchema>;
export type CreateTrexPaymentOutput = z.infer<typeof CreateTrexPaymentOutputSchema>;

export async function processTrexPayment(input: CreateTrexPaymentInput): Promise<CreateTrexPaymentOutput> {
  try {
    return await createTrexPaymentFlow(input);
  } catch (error: any) {
    console.error('Erro no processamento do fluxo de pagamento:', error);
    return {
      success: false,
      pixPayload: '',
      qrCodeUrl: '',
      paymentId: '',
      error: error.message || 'Erro interno no processamento do pedido.',
    };
  }
}

const createTrexPaymentFlow = ai.defineFlow(
  {
    name: 'createTrexPaymentFlow',
    inputSchema: CreateTrexPaymentInputSchema,
    outputSchema: CreateTrexPaymentOutputSchema,
  },
  async (input) => {
    // Chamada ao serviço de integração
    const result = await createPixPayment({
      amount: input.amount,
      customer: {
        name: input.customer.name,
        email: input.customer.email,
        phone: input.customer.whatsapp,
        document: input.customer.document,
      },
      orderId: input.orderId,
    });

    return result;
  }
);
