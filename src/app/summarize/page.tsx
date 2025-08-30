import { SummarizeForm } from "./summarize-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SummarizePage() {
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Summarize Financial News</CardTitle>
          <CardDescription>
            Paste the content of a financial news article below. Our AI will
            provide a concise summary and determine its sentiment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SummarizeForm />
        </CardContent>
      </Card>
    </div>
  );
}
