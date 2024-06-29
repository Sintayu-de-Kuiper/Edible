"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db, storage } from "@/lib/firebase";
import { addDoc, collection } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { CreatePostSchema } from "@/schemas";
import { useAuth } from "@/hooks/useAuth";
import SignInForm from "@/components/sign-in/SignInForm";
import { useRouter } from "next/navigation";

export default function PostForm() {
  const form = useForm({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      content: "",
      image: null,
    },
  });
  const router = useRouter();

  const auth = useAuth();
  if (!auth.currentUser) {
    return <SignInForm />;
  }

  async function onSubmit(values: z.infer<typeof CreatePostSchema>) {
    if (!auth.currentUser) {
      return;
    }

    try {
      const storageRef = ref(
        storage,
        `images/${values.image.name}_${Date.now()}`,
      );
      const snapshot = await uploadBytes(storageRef, values.image);
      const imageUrl = await getDownloadURL(snapshot.ref);

      const docRef = await addDoc(collection(db, "posts"), {
        title: values.title,
        content: values.content,
        imageUrl: imageUrl,
        createdAt: new Date(),
        userId: auth.currentUser.uid,
      });

      console.log("Document written with ID: ", docRef.id);

      router.push(`/posts/${docRef.id}`);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Content" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Picture</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  placeholder="Picture"
                  type="file"
                  accept="image/*, application/pdf"
                  onChange={(event) => onChange(event.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
