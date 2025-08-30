"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, AlertTriangle, BadgePercent, ListChecks } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { reportSuspiciousInvestment, ReportSuspiciousInvestmentOutput } from "@/ai/flows/report-suspicious-investment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  details: z
    .string()
    .min(50, {
      message: "Please provide at least 50 characters of detail.",
    })
    .max(5000, {
      message: "Details must not be longer than 5000 characters.",
    }),
});

export function ReportForm() {
  const [result, setResult] = useState<ReportSuspiciousInvestmentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      details: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await reportSuspiciousInvestment(values);
      setResult(response);
    } catch (error) {
      console.error("Error reporting suspicious investment:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "There was an error analyzing the investment offer. Please try again.",
      });
    }
    setIsLoading(false);
  }

  const getRiskLevel = (score: number) => {
    if (score < 0.3) return { text: 'Low Risk', color: 'bg-green-500' };
    if (score < 0.7) return { text: 'Medium Risk', color: 'bg-yellow-500' };
    return { text: 'High Risk', color: 'bg-red-500' };
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Offer Details</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the investment offer, including promises made, contact information, and any suspicious elements."
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The more detail you provide, the better our AI can analyze the risk.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Analyzing..." : "Analyze Offer"}
          </Button>
        </form>
      </Form>

      {result && (
        <Card className="mt-6 animate-in fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="text-primary" />
              Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold flex items-center gap-2"><BadgePercent className="h-4 w-4" />Risk Score</h3>
                <span className="font-bold text-lg">{Math.round(result.riskScore * 100)}%</span>
              </div>
              <Progress value={result.riskScore * 100} aria-label={`${Math.round(result.riskScore * 100)}% risk`} />
              <p className="text-sm text-muted-foreground mt-1">
                A score of 100% indicates the highest level of risk.
              </p>
            </div>
             <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2"><ListChecks className="h-4 w-4"/>Identified Scam Patterns</h3>
              {result.scamPatterns.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {result.scamPatterns.map((pattern, index) => (
                    <Badge key={index} variant="destructive">{pattern}</Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No specific scam patterns were detected based on the provided information.</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
