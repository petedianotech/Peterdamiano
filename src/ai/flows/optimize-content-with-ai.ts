'use server';

/**
 * @fileOverview An AI agent to optimize content for different platforms.
 *
 * - optimizeContentWithAI - A function that optimizes content using AI.
 * - OptimizeContentWithAIInput - The input type for the optimizeContentWithAI function.
 * - OptimizeContentWithAIOutput - The return type for the optimizeContentWithAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeContentWithAIInputSchema = z.object({
  content: z.string().describe('The content to be optimized.'),
  platform: z.enum(['LinkedIn', 'Twitter', 'Blog', 'Personal Portfolio']).describe('The platform for which the content will be optimized.'),
  goal: z.string().describe('The goal of the optimized content (e.g., increase engagement, drive traffic, etc.).'),
  stylePreferences: z.string().optional().describe('Any style preferences for the optimized content (e.g., formal, informal, humorous).'),
});
export type OptimizeContentWithAIInput = z.infer<typeof OptimizeContentWithAIInputSchema>;

const OptimizeContentWithAIOutputSchema = z.object({
  optimizedContent: z.string().describe('The optimized content for the specified platform.'),
});
export type OptimizeContentWithAIOutput = z.infer<typeof OptimizeContentWithAIOutputSchema>;

export async function optimizeContentWithAI(input: OptimizeContentWithAIInput): Promise<OptimizeContentWithAIOutput> {
  return optimizeContentWithAIFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeContentPrompt',
  input: {schema: OptimizeContentWithAIInputSchema},
  output: {schema: OptimizeContentWithAIOutputSchema},
  prompt: `You are an expert content optimizer, skilled at tailoring content for different platforms to achieve specific goals.

  Optimize the following content for {{platform}} with the goal of {{goal}}.
  Consider these style preferences: {{stylePreferences}}.

  Original Content: {{{content}}}

  Optimized Content:`, // Ensure the output is placed at the end
});

const optimizeContentWithAIFlow = ai.defineFlow(
  {
    name: 'optimizeContentWithAIFlow',
    inputSchema: OptimizeContentWithAIInputSchema,
    outputSchema: OptimizeContentWithAIOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
