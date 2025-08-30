import { ReportForm } from "./report-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ReportPage() {
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Report a Suspicious Investment</CardTitle>
          <CardDescription>
            Submit the details of a suspicious investment offer. Our AI will
            analyze it for potential scam patterns and provide a risk score.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReportForm />
        </CardContent>
      </Card>
    </div>
  );
}
