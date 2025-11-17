import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const messages = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    message: "I'd like to discuss a potential project. When would be a good time to chat?",
    date: "2024-07-30",
    status: "Unread",
  },
  {
    name: "John Doe",
    email: "john.doe@example.com",
    message: "Following up on my previous email. Looking forward to your response.",
    date: "2024-07-29",
    status: "Read",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@web.com",
    message: "Great work on your portfolio! I'm impressed with your projects.",
    date: "2024-07-28",
    status: "Read",
  },
];

export default function Messages() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
        <CardDescription>A list of messages from your contact form.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sender</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.email}>
                <TableCell>
                  <div className="font-medium">{message.name}</div>
                  <div className="text-sm text-muted-foreground">{message.email}</div>
                </TableCell>
                <TableCell>
                  <p className="max-w-md truncate">{message.message}</p>
                  <time className="text-xs text-muted-foreground">{message.date}</time>
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant={message.status === "Unread" ? "default" : "outline"}>
                    {message.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
