import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function BlogEditor() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="mx-auto grid w-full max-w-2xl gap-2">
          <h1 className="text-3xl font-semibold">Blog</h1>
        </div>
        <div className="mx-auto grid w-full max-w-2xl items-start gap-6">
          <Card>
            <CardHeader>
              <CardTitle>New Post</CardTitle>
              <CardDescription>
                Create a new blog post. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    type="text"
                    className="w-full"
                    defaultValue="The Beauty of Simplicity in Design"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    defaultValue="Discover how minimalist design can lead to more engaging and user-friendly experiences..."
                    className="min-h-32"
                  />
                </div>
                <Button>Save Post</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
