"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Search, Check, Shield, X, UserCheck, Building } from "lucide-react";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const formSchema = z.object({
  query: z
    .string()
    .min(3, {
      message: "Query must be at least 3 characters.",
    })
    .max(100, {
      message: "Query must not be longer than 100 characters.",
    }),
});

interface VerificationResult {
  name: string;
  type: 'Advisor' | 'Company';
  score: number;
  details: {
    text: string;
    verified: boolean;
  }[];
}

export function VerifyForm() {
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    // Simulate API call and AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate placeholder data
    const isAdvisor = Math.random() > 0.5;
    const score = Math.random();
    const mockResult: VerificationResult = {
      name: values.query,
      type: isAdvisor ? 'Advisor' : 'Company',
      score: score * 100,
      details: [
        { text: 'Registered with FINRA', verified: score > 0.3 },
        { text: 'No disciplinary actions found', verified: score > 0.5 },
        { text: 'Public records match', verified: score > 0.2 },
        { text: 'Cross-referenced with community reports', verified: score > 0.7 },
      ]
    };

    setResult(mockResult);
    setIsLoading(false);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Advisor or Company Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="e.g., 'John Doe' or 'Innovest Inc.'"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
        </form>
      </Form>

      {result && (
        <Card className="mt-6 animate-in fade-in">
          <CardHeader className="flex flex-row items-center gap-4">
             <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {result.type === 'Advisor' ? <UserCheck /> : <Building />}
                </AvatarFallback>
              </Avatar>
            <div>
              <CardTitle>{result.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{result.type}</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
               <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold flex items-center gap-2"><Shield className="h-4 w-4"/>Legitimacy Score</h3>
                <span className="font-bold text-lg">{Math.round(result.score)}%</span>
              </div>
              <Progress value={result.score} aria-label={`${Math.round(result.score)}% legitimacy score`} />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Verification Checklist</h3>
              <ul className="space-y-2 text-sm">
                {result.details.map((detail, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {detail.verified ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-red-500" />
                    )}
                    <span className={!detail.verified ? 'text-muted-foreground' : ''}>
                      {detail.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
