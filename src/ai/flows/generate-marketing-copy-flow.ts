
'use server';
/**
 * @fileOverview A Genkit flow for generating compelling and urgent promotional messages.
 *
 * - generateMarketingCopy - A function that handles the generation of marketing copy.
 * - GenerateMarketingCopyInput - The input type for the generateMarketingCopy function.
 * - GenerateMarketingCopyOutput - The return type for the generateMarketingCopy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMarketingCopyInputSchema = z.object({
  theme: z
    .string()
    .describe(
      'The product or promotion theme for which to generate marketing copy (e.g., "Kit 10 cuecas por R$59,90 hoje no PIX", "Novidade: cuecas boxer de algodão")'
    ),
});
export type GenerateMarketingCopyInput = z.infer<
  typeof GenerateMarketingCopyInputSchema
>;

const GenerateMarketingCopyOutputSchema = z.object({
  promotionalMessage: z
    .string()
    .describe(
      'A compelling promotional message suitable for a banner or product highlight, focused on conversion.'
    ),
  urgencyMessage: z
    .string()
    .describe(
      'A short, urgent message to drive immediate action (e.g., "Somente hoje", "Últimas unidades!").'
    ),
});
export type GenerateMarketingCopyOutput = z.infer<
  typeof GenerateMarketingCopyOutputSchema
>;

export async function generateMarketingCopy(
  input: GenerateMarketingCopyInput
): Promise<GenerateMarketingCopyOutput> {
  return generateMarketingCopyFlow(input);
}

const marketingCopyPrompt = ai.definePrompt({
  name: 'marketingCopyPrompt',
  model: 'googleai/gemini-1.5-flash-latest',
  input: {schema: GenerateMarketingCopyInputSchema},
  output: {schema: GenerateMarketingCopyOutputSchema},
  prompt: `You are an expert marketing copywriter specializing in e-commerce for men's underwear, with a focus on conversion and urgency.

Generate a compelling promotional message for a banner or product highlight, and a separate, short urgency message, based on the following theme.

The promotional message should be catchy, highlight the value proposition, and encourage a quick purchase. The urgency message should be concise and create a sense of immediate need.

Theme: {{{theme}}}`,
});

const generateMarketingCopyFlow = ai.defineFlow(
  {
    name: 'generateMarketingCopyFlow',
    inputSchema: GenerateMarketingCopyInputSchema,
    outputSchema: GenerateMarketingCopyOutputSchema,
  },
  async input => {
    const {output} = await marketingCopyPrompt(input);
    return output!;
  }
);
