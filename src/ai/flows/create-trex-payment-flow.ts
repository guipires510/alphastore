'use server';
/**
 * @fileOverview Fluxo Genkit para processar pagamentos via Trex Pay de forma segura.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { createPixPayment } from '@/lib/trex-pay';

const CreateTrexPaymentInputSchema = z.object({
  amount: z.number(),
  customer: z.object({
    name: z.string(),
    email: z.string().email(),
    whatsapp: z.string(),
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
  return createTrexPaymentFlow(input);
}

const createTrexPaymentFlow = ai.defineFlow(
  {
    name: 'createTrexPaymentFlow',
    inputSchema: CreateTrexPaymentInputSchema,
    outputSchema: CreateTrexPaymentOutputSchema,
  },
  async (input) => {
    // Aqui chamamos o serviço que integra com a API da Trex Pay
    const result = await createPixPayment({
      amount: input.amount,
      customer: {
        name: input.customer.name,
        email: input.customer.email,
        phone: input.customer.whatsapp,
        document: "000.000.000-00", // CPF deve ser coletado no checkout para produção
      },
      orderId: input.orderId,
    });

    return result;
  }
);
