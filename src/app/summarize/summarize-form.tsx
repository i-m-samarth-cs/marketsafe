"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, BookText, BarChart3, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

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
import { generateNewsImage, GenerateNewsImageOutput } from "@/ai/flows/generate-news-image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [summaryResult, setSummaryResult] = useState<SummarizeFinancialNewsOutput | null>(null);
  const [imageResult, setImageResult] = useState<GenerateNewsImageOutput | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      articleContent: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSummarizing(true);
    setIsGeneratingImage(true);
    setSummaryResult(null);
    setImageResult(null);

    try {
      const summaryResponse = await summarizeFinancialNews(values);
      setSummaryResult(summaryResponse);

      // Generate image based on the summary
      try {
        const imageResponse = await generateNewsImage({ summary: summaryResponse.summary });
        setImageResult(imageResponse);
      } catch (imageError) {
         console.error("Error generating image:", imageError);
         toast({
            variant: "destructive",
            title: "Image Generation Failed",
            description: "Could not generate an AI image. This may be due to a billing requirement for the API. Using a placeholder image instead.",
         });
         // Fallback to a placeholder
         setImageResult({ imageUrl: 'https://picsum.photos/600/400' });
      } finally {
        setIsGeneratingImage(false);
      }

    } catch (error) {
      console.error("Error summarizing article:", error);
      toast({
        variant: "destructive",
        title: "Summarization Failed",
        description: "There was an error summarizing the article. Please try again.",
      });
    } finally {
      setIsSummarizing(false);
    }
  }
  
  const isLoading = isSummarizing || isGeneratingImage;

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
            {isSummarizing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSummarizing ? "Summarizing..." : "Summarize Article"}
          </Button>
        </form>
      </Form>

      {(summaryResult || isSummarizing) && (
        <div className="mt-6 grid gap-6 md:grid-cols-5 animate-in fade-in">
          <div className="md:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookText className="text-primary" />
                  Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground prose">
                {isSummarizing ? <Skeleton className="h-24 w-full" /> : <p>{summaryResult?.summary}</p>}
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
                 {isSummarizing ? <Skeleton className="h-8 w-1/2" /> : <p>{summaryResult?.sentiment}</p>}
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="text-primary" />
                  Article Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isGeneratingImage ? (
                   <Skeleton className="aspect-video w-full" />
                ) : imageResult?.imageUrl ? (
                   <div className="relative aspect-video">
                    <Image src={imageResult.imageUrl} alt="Generated news image" fill className="rounded-md object-cover" />
                  </div>
                ) : (
                  <div className="aspect-video w-full flex items-center justify-center bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground">No image generated.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
