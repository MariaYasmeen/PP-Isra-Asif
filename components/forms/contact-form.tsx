"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useModalStore } from "@/hooks/use-modal-store";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must contain at least 3 characters.",
  }),
  email: z.string().email("Please enter a valid email."),
  message: z.string().min(10, {
    message: "Please write something more descriptive.",
  }),
  social: z.string().url().optional().or(z.literal("")),
});

export function ContactForm() {
  const storeModal = useModalStore();

  // const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      social: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // For static hosting, we'll use direct Google Form submission
      // You can replace this with your actual Google Form URL
      const googleFormUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_LINK || "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse";
      
      // Create form data for Google Form submission
      const formData = new FormData();
      formData.append("entry.YOUR_NAME_FIELD_ID", values.name);
      formData.append("entry.YOUR_EMAIL_FIELD_ID", values.email);
      formData.append("entry.YOUR_MESSAGE_FIELD_ID", values.message);
      if (values.social) {
        formData.append("entry.YOUR_SOCIAL_FIELD_ID", values.social);
      }

      // Submit to Google Form (this will work with static hosting)
      await fetch(googleFormUrl, {
        method: "POST",
        body: formData,
        mode: "no-cors", // Required for Google Forms
      });

      form.reset();

      storeModal.onOpen({
        title: "Thank you!",
        description:
          "Your message has been received! I appreciate your contact and will get back to you shortly.",
        icon: Icons.successAnimated,
      });
    } catch (err) {
      console.log("Error submitting form:", err);
      // Fallback to mailto if form submission fails
      const mailtoLink = `mailto:your-email@example.com?subject=Contact from ${values.name}&body=${values.message}`;
      window.location.href = mailtoLink;
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 min-w-full"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              {/* <FormDescription>
                                This is your public display name.
                            </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your message" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="social"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Social (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Link for social account" {...field} />
              </FormControl>
              {/* <FormDescription>
                                This is your public display name.
                            </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
