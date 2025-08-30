import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const modules = [
  {
    title: 'Module 1: Identifying a Ponzi Scheme',
    content:
      'Ponzi schemes are fraudulent investing scams promising high rates of return with little risk to investors. Learn to spot the red flags: overly consistent returns, unregistered investments, and complex strategies.',
    image: 'https://picsum.photos/600/400',
    'data-ai-hint': 'business finance',
  },
  {
    title: 'Module 2: The Dangers of "Pump and Dump"',
    content:
      'This form of securities fraud involves artificially inflating the price of a stock through false and misleading positive statements, in order to sell the cheaply purchased stock at a higher price. We teach you how to analyze stock promotions critically.',
    image: 'https://picsum.photos/600/401',
    'data-ai-hint': 'stock market',
  },
  {
    title: 'Module 3: Recognizing Phishing Scams',
    content:
      'Phishing scams use fraudulent emails, texts, or websites to trick individuals into disclosing sensitive information, such as passwords and credit card numbers. This module covers common tactics and how to protect your accounts.',
    image: 'https://picsum.photos/600/402',
    'data-ai-hint': 'cyber security',
  },
  {
    title: 'Module 4: Understanding Cryptocurrency Risks',
    content:
      'While a legitimate technology, the cryptocurrency space is ripe with scams, from fake initial coin offerings (ICOs) to fraudulent exchanges. Learn how to navigate the crypto world more safely.',
    image: 'https://picsum.photos/600/403',
    'data-ai-hint': 'cryptocurrency blockchain',
  },
];

export default function EducationPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Educational Center</CardTitle>
        <CardDescription>
          Improve your fraud awareness and market literacy with these
          interactive modules.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {modules.map((module, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{module.title}</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="prose prose-sm text-muted-foreground">
                    <p>{module.content}</p>
                  </div>
                  <div className="relative aspect-video">
                    <Image
                      src={module.image}
                      alt={module.title}
                      fill
                      className="rounded-md object-cover"
                      data-ai-hint={module['data-ai-hint']}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
