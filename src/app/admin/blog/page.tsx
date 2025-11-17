
'use client';

import { Bold, Italic, Underline, List, ListOrdered, Save } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function BlogEditorPage() {
  const handleFormat = (command: string) => {
    document.execCommand(command, false);
  };

  return (
    <div className="grid grid-cols-1 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Blog Post</CardTitle>
          <CardDescription>
            Use the editor below to write and format your post.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="post-title">Post Title</Label>
            <Input id="post-title" placeholder="Enter your blog post title" />
          </div>
          <div>
            <Label>Content</Label>
            <div className="mt-2 rounded-md border border-input">
              <div className="flex items-center gap-1 border-b p-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleFormat('bold')}
                  aria-label="Bold"
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleFormat('italic')}
                  aria-label="Italic"
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleFormat('underline')}
                  aria-label="Underline"
                >
                  <Underline className="h-4 w-4" />
                </Button>
                 <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleFormat('insertUnorderedList')}
                  aria-label="Bulleted List"
                >
                  <List className="h-4 w-4" />
                </Button>
                 <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleFormat('insertOrderedList')}
                  aria-label="Numbered List"
                >
                  <ListOrdered className="h-4 w-4" />
                </Button>
              </div>
              <div
                contentEditable
                className="prose prose-sm max-w-none min-h-[400px] w-full rounded-b-md bg-background p-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                role="textbox"
                aria-multiline="true"
              ></div>
            </div>
          </div>
           <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Post
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
