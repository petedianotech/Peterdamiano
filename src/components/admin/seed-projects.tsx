
'use client';
import { useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, writeBatch, doc, getDocs } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Check, Loader } from 'lucide-react';

const projects = [
  {
    id: 'autopxf-twitter-automation',
    title: 'AutoPXF: Twitter Automation',
    problem: 'Manually creating and posting engaging content on Twitter is time-consuming and inconsistent.',
    outcome: 'Developed an AI-powered application that automates tweet creation and posting, increasing engagement.',
    category: 'Software',
    imageUrl: 'https://picsum.photos/seed/autopxf/1200/800',
    tags: ['Next.js', 'AI', 'Automation', 'Twitter API'],
    actions: [
      { text: 'View Live Demo', url: 'https://autopxf.vercel.app', variant: 'default', icon: 'external-link' },
    ],
  },
  {
    id: 'bookgen-ai-generator',
    title: 'BookGen: AI Book Generator',
    problem: 'Writers and creators often face blockages when starting a new book or chapter.',
    outcome: 'Built an AI-powered tool that generates book ideas, outlines, and content, helping users overcome writer\'s block.',
    category: 'Software',
    imageUrl: 'https://picsum.photos/seed/bookgen/1200/800',
    tags: ['React', 'AI', 'Generative-AI', 'SaaS'],
    actions: [
      { text: 'View Live Demo', url: 'https://bookgen-seven.vercel.app/', variant: 'default', icon: 'external-link' },
    ],
  },
  {
    id: 'streakrpro-math-game',
    title: 'StreakrPro: Math Game',
    problem: 'Learning math can be tedious and unengaging for many students.',
    outcome: 'Created a fun and interactive web-based math game that encourages practice and improvement through streaks.',
    category: 'Content',
    imageUrl: 'https://picsum.photos/seed/streakrpro/1200/800',
    tags: ['Next.js', 'Gamification', 'Education', 'Web Game'],
    actions: [
      { text: 'Play the Game', url: 'https://streakrpro.vercel.app/', variant: 'default', icon: 'external-link' },
    ],
  },
];

const SeedProjects = () => {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSeeding, setIsSeeding] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const seedDatabase = async () => {
    if (!firestore) return;

    setIsSeeding(true);
    const collectionRef = collection(firestore, 'projects');

    try {
      const batch = writeBatch(firestore);

      // 1. Clear existing projects
      const existingDocsSnapshot = await getDocs(collectionRef);
      existingDocsSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      
      // 2. Add new projects
      projects.forEach(project => {
        const docRef = doc(collectionRef, project.id);
        batch.set(docRef, project);
      });

      await batch.commit();

      toast({
        title: 'Success!',
        description: `Successfully cleared old projects and added ${projects.length} new projects.`,
      });
      setIsDone(true);

    } catch (error) {
      console.error("Error seeding projects: ", error);
      toast({
        variant: 'destructive',
        title: 'Seeding Failed',
        description: 'Could not add the projects to the database.',
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Button onClick={seedDatabase} disabled={isSeeding || isDone} variant="outline">
        {isSeeding && <Loader className="mr-2 h-4 w-4 animate-spin" />}
        {isSeeding ? "Seeding..." : isDone ? "Projects Seeded" : "Seed Projects"}
        {isDone && <Check className="ml-2 h-4 w-4" />}
    </Button>
  );
};

export default SeedProjects;
