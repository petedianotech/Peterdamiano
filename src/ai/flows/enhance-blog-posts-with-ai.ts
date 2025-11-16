'use server';
/**
 * @fileOverview An AI-powered content enhancement flow for Peter Damiano's blog posts.
 *
 * This file defines a Genkit flow that suggests content ideas and optimizes existing content for Peter's blog.
 *
 * @function enhanceBlogPostsWithAI - The main function to enhance blog posts with AI suggestions.
 * @typedef {EnhanceBlogPostsInput} EnhanceBlogPostsInput - Input type for the enhanceBlogPostsWithAI function.
 * @typedef {EnhanceBlogPostsOutput} EnhanceBlogPostsOutput - Output type for the enhanceBlogPostsWithAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceBlogPostsInputSchema = z.object({
  blogPostTitle: z
    .string()
    .describe('The title of the blog post to generate content ideas for.'),
  blogPostContent: z
    .string()
    .optional()
    .describe('The content of the blog post to optimize.'),
});

export type EnhanceBlogPostsInput = z.infer<typeof EnhanceBlogPostsInputSchema>;

const EnhanceBlogPostsOutputSchema = z.object({
  suggestedContentIdeas: z
    .array(z.string())
    .describe('An array of suggested content ideas for the blog post.'),
  optimizedContent: z
    .string()
    .optional()
    .describe('The optimized content of the blog post.'),
});

export type EnhanceBlogPostsOutput = z.infer<typeof EnhanceBlogPostsOutputSchema>;

export async function enhanceBlogPostsWithAI(input: EnhanceBlogPostsInput): Promise<EnhanceBlogPostsOutput> {
  return enhanceBlogPostsFlow(input);
}

const enhanceBlogPostsPrompt = ai.definePrompt({
  name: 'enhanceBlogPostsPrompt',
  input: {schema: EnhanceBlogPostsInputSchema},
  output: {schema: EnhanceBlogPostsOutputSchema},
  prompt: `You are an AI assistant helping Peter Damiano, a multi-talented professional, to create engaging blog posts.

  Peter's areas of expertise include development, innovation, content creation, and authorship.

  Based on the title and content of the blog post, suggest content ideas and optimize the content.

  Blog Post Title: {{{blogPostTitle}}}
  Blog Post Content: {{{blogPostContent}}}

  Output:
  {
  "suggestedContentIdeas": ["content idea 1", "content idea 2"],
  "optimizedContent": "optimized content"
  }
  `,
});

const enhanceBlogPostsFlow = ai.defineFlow(
  {
    name: 'enhanceBlogPostsFlow',
    inputSchema: EnhanceBlogPostsInputSchema,
    outputSchema: EnhanceBlogPostsOutputSchema,
  },
  async input => {
    const {output} = await enhanceBlogPostsPrompt(input);
    return output!;
  }
);
