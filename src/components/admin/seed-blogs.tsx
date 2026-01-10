'use client';
import { useEffect, useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Check, Loader } from 'lucide-react';

const blogPosts = [
  {
    id: 'from-idea-to-impact',
    title: "From Idea to Impact: A Developer's Guide to Shipping Side Projects",
    summary: 'Turn your brilliant ideas into successful, shipped projects. This guide covers the essential steps from validation to launch for the modern developer.',
    imageUrl: 'https://picsum.photos/seed/blog-idea-impact/1200/600',
    publicationDate: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    author: 'Peter Damiano',
    readTimeInMinutes: 8,
    tags: ['Development', 'Productivity', 'Innovation'],
    content: `
      <p class="text-lg">Every developer has a folder of abandoned projects. Ideas that sparked excitement but fizzled out under the weight of complexity or loss of motivation. But shipping a side project—taking it from a fledgling concept to a functional product in the hands of users—is one of the most rewarding experiences in our field. It's your resume, your classroom, and your creative outlet, all rolled into one.</p>
      <p>This guide breaks down the process into manageable steps, helping you navigate the journey from idea to impact.</p>
      <h3 class="text-2xl font-bold mt-8 mb-4">1. Validate Before You Build</h3>
      <p>The biggest mistake is building something nobody wants. Before writing a single line of code, validate your idea:</p>
      <ul class="list-disc pl-6 space-y-2 my-4">
        <li><strong>Talk to potential users:</strong> Find people who have the problem you're trying to solve. Would they use your solution? Would they pay for it?</li>
        <li><strong>Create a landing page:</strong> Use a simple builder to create a "coming soon" page that explains your product. Collect email addresses to gauge interest. An afternoon of work here can save you months of development.</li>
        <li><strong>Define the Minimum Viable Product (MVP):</strong> What is the absolute smallest version of your product that still provides value? Be ruthless in cutting features. The goal is to launch, learn, and iterate.</li>
      </ul>
      <h3 class="text-2xl font-bold mt-8 mb-4">2. Choose Your Stack Wisely (and Quickly)</h3>
      <p>Don't let technology choices become a roadblock. The best stack for a side project is the one you already know. Speed is your biggest advantage. If you're a React developer, use Next.js. Comfortable with Python? Use Django or Flask. This isn't the time to learn a completely new ecosystem unless learning is the primary goal of the project.</p>
      <blockquote class="border-l-4 border-primary pl-4 italic my-6">"Your goal is to ship a product, not to build a perfect, infinitely scalable architecture for a v0.1."</blockquote>
      <h3 class="text-2xl font-bold mt-8 mb-4">3. Build in Public</h3>
      <p>Building in public keeps you accountable and builds an audience before you even launch. Share your journey on platforms like X (formerly Twitter), LinkedIn, or a personal blog. Post about:</p>
      <ul class="list-disc pl-6 space-y-2 my-4">
        <li>The problem you're solving.</li>
        <li>Interesting technical challenges you overcome.</li>
        <li>Screenshots of your progress.</li>
        <li>Milestones you hit (e.g., "Just finished the authentication flow!").</li>
      </ul>
      <p>This creates a feedback loop and a community of supporters who will be your first users and evangelists.</p>
      <h3 class="text-2xl font-bold mt-8 mb-4">4. The "Good Enough" Launch</h3>
      <p>Perfectionism is the enemy of shipped projects. Your launch doesn't need to be flawless. It needs to be "good enough." This means:</p>
      <ul class="list-disc pl-6 space-y-2 my-4">
        <li>The core feature works reliably.</li>
        <li>The user interface is clean and usable, not necessarily beautiful.</li>
        <li>There's a clear way for users to give feedback.</li>
      </ul>
      <p>Create a simple launch plan. Post on Product Hunt, Hacker News, Reddit, and share it with the email list you built. The goal isn't to go viral; it's to get your first real users and start learning from their behavior.</p>
      <p class="mt-4">Shipping a project is a skill, and like any skill, it gets easier with practice. Pick a small idea, follow these steps, and get it out there. The impact you create might just surprise you.</p>
    `,
  },
  {
    id: 'the-code-behind-the-story',
    title: 'The Code Behind the Story: Why Narrative is Your Most Powerful Development Tool',
    summary: 'Great developers do more than write code—they tell stories. Discover how narrative thinking can transform your approach to software architecture, documentation, and teamwork.',
    imageUrl: 'https://picsum.photos/seed/blog-narrative-code/1200/600',
    publicationDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    author: 'Peter Damiano',
    readTimeInMinutes: 6,
    tags: ['Writing', 'Development', 'Communication'],
    content: `
      <p class="text-lg">As developers, we're trained to think in logic, data structures, and algorithms. We break down complex problems into their constituent parts. But the most effective and influential developers I know have a secret weapon that isn't taught in most computer science programs: they think in narratives.</p>
      <p>Software development is fundamentally about communication. We communicate with the machine through code, with our future selves through comments and structure, and with our teammates through documentation and pull requests. A story is simply a structured way of communicating information effectively. When you start seeing your work through the lens of narrative, you unlock a new level of clarity and impact.</p>
      <h3 class="text-2xl font-bold mt-8 mb-4">The User's Journey as a Story Arc</h3>
      <p>Every feature you build is a short story. The user is the protagonist. They have a goal (the desire) and they face a challenge (the problem your feature solves). Your UI is the plot, guiding them through a series of steps (scenes) to reach their desired outcome (the resolution).</p>
      <p>When you frame it this way, design questions become narrative questions:</p>
      <ul class="list-disc pl-6 space-y-2 my-4">
        <li><strong>What is my protagonist's motivation?</strong> (What does the user really want to achieve?)</li>
        <li><strong>Is the plot clear and easy to follow?</strong> (Is the UI intuitive?)</li>
        <li><strong>Are there any plot holes?</strong> (Are there confusing dead-ends or error states?)</li>
      </ul>
      <h3 class="text-2xl font-bold mt-8 mb-4">Your Codebase is an Epic Saga</h3>
      <p>A well-structured codebase tells a story. The file and folder structure acts as the table of contents. A well-named function is a chapter title, clearly stating its purpose. The code within is the prose, which should be clean, readable, and consistent in its style.</p>
      <p>Think of a new developer joining your team. Can they read your codebase and understand the story of how data flows from the database to the user's screen? Or is it a confusing mess of disconnected plot lines? Refactoring isn't just about performance; it's about editing your story for clarity.</p>
      <blockquote class="border-l-4 border-primary pl-4 italic my-6">"Good code tells you *what* it's doing. Great code tells you *why*."</blockquote>
      <h3 class="text-2xl font-bold mt-8 mb-4">The Pull Request as a One-Act Play</h3>
      <p>A pull request is one of the most important forms of storytelling in a development team. The title is your headline. The description is the opening scene, setting the context. It should answer three questions:</p>
      <ol class="list-decimal pl-6 space-y-2 my-4">
        <li><strong>Why was this change necessary?</strong> (The conflict or problem). Link to the ticket or issue.</li>
        <li><strong>What did I change?</strong> (The plot). Briefly explain your approach.</li>
        <li><strong>How does this solve the problem?</strong> (The resolution). Explain the outcome and how to test it.</li>
      </ol>
      <p>A PR with a lazy description like "fixed bug" is like a story with no beginning or end. It forces your reviewer to do the hard work of piecing the narrative together. A great PR description respects your teammate's time and tells a compelling story of a problem solved.</p>
      <p class="mt-4">Becoming a better storyteller will make you a better developer. It will improve your code, your collaboration, and your ability to build products that people love to use. The next time you open your editor, don't just think about the code you're going to write. Think about the story you're going to tell.</p>
    `,
  },
];

const SeedBlogs = () => {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSeeding, setIsSeeding] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const seedDatabase = async () => {
      if (!firestore || isSeeding || isDone) return;

      setIsSeeding(true);
      const collectionRef = collection(firestore, 'blog_articles');

      try {
        // Check if posts already exist to prevent duplicates
        const existingDocsSnapshot = await getDocs(collectionRef);
        const existingIds = existingDocsSnapshot.docs.map(d => d.id);
        
        const newPosts = blogPosts.filter(p => !existingIds.includes(p.id));

        if (newPosts.length === 0) {
          console.log('Blog posts already exist. No seeding needed.');
          setIsDone(true);
          setIsSeeding(false);
          return;
        }
        
        const batch = writeBatch(firestore);
        newPosts.forEach(post => {
          const docRef = doc(collectionRef, post.id);
          batch.set(docRef, post);
        });

        await batch.commit();

        toast({
          title: 'Success!',
          description: `Successfully added ${newPosts.length} new blog posts.`,
        });
        setIsDone(true);

      } catch (error) {
        console.error("Error seeding blog posts: ", error);
        toast({
          variant: 'destructive',
          title: 'Seeding Failed',
          description: 'Could not add the blog posts to the database.',
        });
      } finally {
        setIsSeeding(false);
      }
    };

    seedDatabase();
  }, [firestore, toast, isSeeding, isDone]);

  // This component doesn't need to render anything visible to the user.
  // It just runs the seeding logic on mount.
  // We can add a small indicator just in case.
  
  if (isDone) {
      return (
          <div className="hidden bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Seeding Complete: </strong>
              <span className="block sm:inline">Blog posts have been added to the database.</span>
          </div>
      );
  }

  if (isSeeding) {
       return (
          <div className="hidden bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Seeding in progress... </strong>
          </div>
      );
  }

  return null;
};

export default SeedBlogs;
