'use server';
/**
 * @fileOverview A Genkit flow for generating detailed and appealing product descriptions for underwear items.
 *
 * - generateProductDescription - A function that generates a product description.
 * - GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * - GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  material: z
    .string()
    .describe('The material of the underwear (e.g., cotton, microfiber, modal).'),
  style: z
    .string()
    .describe('The style of the underwear (e.g., boxer brief, trunk, brief, thong).'),
  features: z
    .array(z.string())
    .describe('A list of key features of the underwear (e.g., breathable, moisture-wicking, seamless, ergonomic pouch).')
    .default([]),
});
export type GenerateProductDescriptionInput = z.infer<
  typeof GenerateProductDescriptionInputSchema
>;

const GenerateProductDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated detailed product description.'),
});
export type GenerateProductDescriptionOutput = z.infer<
  typeof GenerateProductDescriptionOutputSchema
>;

export async function generateProductDescription(
  input: GenerateProductDescriptionInput
): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const generateProductDescriptionPrompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are an expert copywriter specializing in e-commerce product descriptions for men's underwear.

Generate a detailed, appealing, and conversion-focused product description for an underwear item based on the following attributes:

Material: {{{material}}}
Style: {{{style}}}
Features:
{{#each features}}- {{{this}}}
{{/each}}

The description should highlight comfort, durability, and style, addressing potential customer needs and benefits. Keep the tone masculine, modern, and confident. Focus on clear, concise language and strong selling points. Do not include any introductory or concluding remarks outside the description itself.`,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await generateProductDescriptionPrompt(input);
    return output!;
  }
);
