'use server';
/**
 * @fileOverview Flow for reporting suspicious investment offers. It analyzes the provided details to identify potential scam patterns and provides a risk score.
 *
 * - reportSuspiciousInvestment - A function that handles the reporting of suspicious investment offers.
 * - ReportSuspiciousInvestmentInput - The input type for the reportSuspiciousInvestment function.
 * - ReportSuspiciousInvestmentOutput - The return type for the reportSuspiciousInvestment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReportSuspiciousInvestmentInputSchema = z.object({
  details: z.string().describe('The details of the suspicious investment offer.'),
});
export type ReportSuspiciousInvestmentInput = z.infer<typeof ReportSuspiciousInvestmentInputSchema>;

const ReportSuspiciousInvestmentOutputSchema = z.object({
  riskScore: z.number().describe('A risk score from 0 to 1, where 1 is the riskiest.'),
  scamPatterns: z.array(z.string()).describe('A list of potential scam patterns identified in the offer.'),
});
export type ReportSuspiciousInvestmentOutput = z.infer<typeof ReportSuspiciousInvestmentOutputSchema>;

export async function reportSuspiciousInvestment(input: ReportSuspiciousInvestmentInput): Promise<ReportSuspiciousInvestmentOutput> {
  return reportSuspiciousInvestmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reportSuspiciousInvestmentPrompt',
  input: {schema: ReportSuspiciousInvestmentInputSchema},
  output: {schema: ReportSuspiciousInvestmentOutputSchema},
  prompt: `You are an AI assistant specialized in identifying investment scams. Analyze the following investment offer details and provide a risk score (0 to 1) and identify potential scam patterns.

Details: {{{details}}}

Consider the following scam patterns:
- Pump and Dump
- Pyramid Scheme
- Ponzi Scheme
- Bait and Switch
- Phantom Investments
- Affinity Fraud
- High-Yield Investment Programs (HYIPs)
- Advance Fee Fraud
- Cryptocurrency Scams
- Foreign Currency (Forex) Scams

Ensure the risk score and scam patterns are consistent with your analysis of the investment details. If no scam patterns are detected the risk score should be 0.
`,
});

const reportSuspiciousInvestmentFlow = ai.defineFlow(
  {
    name: 'reportSuspiciousInvestmentFlow',
    inputSchema: ReportSuspiciousInvestmentInputSchema,
    outputSchema: ReportSuspiciousInvestmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
