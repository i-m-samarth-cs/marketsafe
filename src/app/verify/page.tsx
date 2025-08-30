import { VerifyForm } from "./verify-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VerifyPage() {
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Automated Legitimacy Verification</CardTitle>
          <CardDescription>
            Enter the name of an investment advisor, company, or the details of a claim to check against regulatory databases and other sources.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VerifyForm />
        </CardContent>
      </Card>
    </div>
  );
}
