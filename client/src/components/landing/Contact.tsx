import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

const Contact = () => {
  return (
    <div className="mt-10">
      <div>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardDescription>
              Please fill the below form and we will get back to you as soon as
              possible.{" "}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="nubmer" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Send</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
