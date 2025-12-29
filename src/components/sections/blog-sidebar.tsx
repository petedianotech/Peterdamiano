'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" {...props}>
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
    </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.783-1.75-1.75s.784-1.75 1.75-1.75 1.75.783 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 7.184L18.901 1.153zm-1.61 19.99h2.54L7.48 2.5h-2.7l12.553 18.643z" />
    </svg>
);


const SidebarCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-card p-6 rounded-lg border border-border/80 ${className}`}>
        {children}
    </div>
)

const BlogSidebar = () => {
  return (
    <aside className="sticky top-24 space-y-8">
        <SidebarCard>
            <div className="flex flex-col items-center text-center">
                <div className="relative h-20 w-20 rounded-full mb-4">
                    <Image src="https://i.ibb.co/8Dgcmbh/In-Shot-20251122-075515177.jpg" alt="Peter Damiano" layout="fill" className="rounded-full object-cover" />
                </div>
                <h3 className="font-bold text-lg">Peter Damiano</h3>
                <p className="text-sm text-muted-foreground mb-3">Innovator & Developer</p>
                <p className="text-sm text-muted-foreground mb-4">I write about building software, staying productive, and the tools that help us do our best work.</p>
                <div className="flex items-center justify-center gap-4 text-muted-foreground">
                    <Link href="https://x.com/petediano" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><XIcon className="h-4 w-4"/></Link>
                    <Link href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><GithubIcon className="h-4 w-4"/></Link>
                    <Link href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><LinkedinIcon className="h-4 w-4"/></Link>
                </div>
            </div>
        </SidebarCard>
        
        <SidebarCard>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Categories</h4>
            <div className="flex flex-wrap gap-2">
                <Button variant="default" size="sm">All Posts</Button>
                <Button variant="outline" size="sm">Productivity</Button>
                <Button variant="outline" size="sm">Development</Button>
                <Button variant="outline" size="sm">Innovation</Button>
                <Button variant="outline" size="sm">Writing</Button>
            </div>
        </SidebarCard>

        <SidebarCard>
            <h4 className="font-semibold mb-2">Join the newsletter</h4>
            <p className="text-muted-foreground text-sm mb-4">Get the latest insights on tech and creativity delivered to your inbox.</p>
            <form className="space-y-3">
                <Input type="email" placeholder="Your email address" />
                <Button type="submit" className="w-full">Subscribe</Button>
            </form>
        </SidebarCard>
    </aside>
  );
};

export default BlogSidebar;
