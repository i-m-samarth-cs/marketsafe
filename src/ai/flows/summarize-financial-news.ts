'use server';

/**
 * @fileOverview Summarizes a financial news article and determines its sentiment.
 *
 * - summarizeFinancialNews - A function that summarizes a financial news article and determines its sentiment.
 * - SummarizeFinancialNewsInput - The input type for the summarizeFinancialNews function.
 * - SummarizeFinancialNewsOutput - The return type for the summarizeFinancialNews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

const SummarizeFinancialNewsInputSchema = z.object({
  articleContent: z
    .string()
    .describe('The content of the financial news article to summarize.'),
});
export type SummarizeFinancialNewsInput = z.infer<typeof SummarizeFinancialNewsInputSchema>;

const SummarizeFinancialNewsOutputSchema = z.object({
  summary: z.string().describe('A brief summary of the financial news article.'),
  sentiment: z
    .string()
    .describe(
      'The sentiment of the article (positive, negative, or neutral) and whether it is potentially promoting a scam.'
    ),
});
export type SummarizeFinancialNewsOutput = z.infer<typeof SummarizeFinancialNewsOutputSchema>;

export async function summarizeFinancialNews(
  input: SummarizeFinancialNewsInput
): Promise<SummarizeFinancialNewsOutput> {
  return summarizeFinancialNewsFlow(input);
}

const summarizeFinancialNewsPrompt = ai.definePrompt({
  name: 'summarizeFinancialNewsPrompt',
  input: {schema: SummarizeFinancialNewsInputSchema},
  output: {schema: SummarizeFinancialNewsOutputSchema},
  prompt: `You are an AI assistant specializing in financial news analysis.
  Your task is to summarize the given financial news article and determine its sentiment.
  Also determine if the content of the news article is potentially promoting a scam.

  Article Content: {{{articleContent}}}

  Summary:
  Sentiment:`,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const summarizeFinancialNewsFlow = ai.defineFlow(
  {
    name: 'summarizeFinancialNewsFlow',
    inputSchema: SummarizeFinancialNewsInputSchema,
    outputSchema: SummarizeFinancialNewsOutputSchema,
  },
  async input => {
    const {output} = await summarizeFinancialNewsPrompt(input);
    return output!;
  }
);
