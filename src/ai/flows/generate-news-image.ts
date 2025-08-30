'use server';
/**
 * @fileOverview A flow for generating an image based on a news summary.
 *
 * - generateNewsImage - A function that takes a summary and returns a URL to a generated image.
 * - GenerateNewsImageInput - The input type for the generateNewsImage function.
 * - GenerateNewsImageOutput - The return type for the generateNewsImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { googleAI } from '@genkit-ai/googleai';


const GenerateNewsImageInputSchema = z.object({
  summary: z.string().describe('The summary of the news article.'),
});
export type GenerateNewsImageInput = z.infer<typeof GenerateNewsImageInputSchema>;

const GenerateNewsImageOutputSchema = z.object({
  imageUrl: z.string().url().describe('The URL of the generated image.'),
});
export type GenerateNewsImageOutput = z.infer<typeof GenerateNewsImageOutputSchema>;

export async function generateNewsImage(input: GenerateNewsImageInput): Promise<GenerateNewsImageOutput> {
  return generateNewsImageFlow(input);
}

const generateNewsImageFlow = ai.defineFlow(
  {
    name: 'generateNewsImageFlow',
    inputSchema: GenerateNewsImageInputSchema,
    outputSchema: GenerateNewsImageOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
        model: googleAI.model('imagen-4.0-fast-generate-001'),
        prompt: `Generate a visually appealing and relevant image for a financial news article with the following summary: ${input.summary}. The image should be professional and suitable for a news website. Avoid text and sensationalism.`,
        config: {
            responseModalities: ['IMAGE'],
        }
    });

    if (!media.url) {
      throw new Error('Image generation failed to produce a URL.');
    }

    return {
      imageUrl: media.url,
    };
  }
);
