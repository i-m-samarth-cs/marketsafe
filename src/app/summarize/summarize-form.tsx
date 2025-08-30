"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, BookText, BarChart3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { summarizeFinancialNews, SummarizeFinancialNewsOutput } from "@/ai/flows/summarize-financial-news";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  articleContent: z
    .string()
    .min(100, {
      message: "Article content must be at least 100 characters.",
    })
    .max(10000, {
      message: "Article content must not be longer than 10,000 characters.",
    }),
});

export function SummarizeForm() {
  const [result, setResult] = useState<SummarizeFinancialNewsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      articleContent: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await summarizeFinancialNews(values);
      setResult(response);
    } catch (error) {
      console.error("Error summarizing article:", error);
      toast({
        variant: "destructive",
        title: "Summarization Failed",
        description: "There was an error summarizing the article. Please try again.",
      });
    }
    setIsLoading(false);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="articleContent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Article Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste the full text of the financial news article here..."
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Summarizing..." : "Summarize Article"}
          </Button>
        </form>
      </Form>

      {result && (
        <div className="mt-6 grid gap-6 md:grid-cols-2 animate-in fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookText className="text-primary" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground prose">
              <p>{result.summary}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="text-primary" />
                Sentiment Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
               <p>{result.sentiment}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
