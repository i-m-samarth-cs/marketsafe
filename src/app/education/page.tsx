import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const modules = [
  {
    title: 'Identifying a Ponzi Scheme',
    content:
      'Ponzi schemes are fraudulent investing scams promising high rates of return with little risk to investors. Learn to spot the red flags: overly consistent returns, unregistered investments, and complex strategies.',
    image: 'https://picsum.photos/600/400',
    'data-ai-hint': 'business finance',
  },
  {
    title: 'The Dangers of "Pump and Dump"',
    content:
      'This form of securities fraud involves artificially inflating the price of a stock through false and misleading positive statements, in order to sell the cheaply purchased stock at a higher price.',
    image: 'https://picsum.photos/601/401',
    'data-ai-hint': 'stock market',
  },
  {
    title: 'Recognizing Phishing Scams',
    content:
      'Phishing scams use fraudulent emails, texts, or websites to trick individuals into disclosing sensitive information, such as passwords and credit card numbers. This module covers common tactics to protect your accounts.',
    image: 'https://picsum.photos/602/402',
    'data-ai-hint': 'cyber security',
  },
  {
    title: 'Understanding Cryptocurrency Risks',
    content:
      'While a legitimate technology, the cryptocurrency space is ripe with scams, from fake initial coin offerings (ICOs) to fraudulent exchanges. Learn how to navigate the crypto world more safely.',
    image: 'https://picsum.photos/603/403',
    'data-ai-hint': 'cryptocurrency blockchain',
  },
  {
    title: 'Affinity Fraud Explained',
    content:
      'This type of scam targets members of identifiable groups, such as religious or ethnic communities. Fraudsters exploit the trust and friendship that exist in these groups to peddle fraudulent investments.',
    image: 'https://picsum.photos/604/404',
    'data-ai-hint': 'community meeting',
  },
  {
    title: 'Avoiding Advance Fee Scams',
    content:
      'These scams trick victims into paying a small upfront fee with the promise of receiving a much larger sum of money later. The promised sum is never delivered, and the scammer disappears with the fee.',
    image: 'https://picsum.photos/605/405',
    'data-ai-hint': 'money payment',
  },
  {
    title: 'High-Yield Investment Programs (HYIPs)',
    content:
      'HYIPs are unregistered investments typically run by unlicensed individuals. They promise incredibly high returns, often daily, which is a classic sign of a Ponzi scheme structure.',
    image: 'https://picsum.photos/606/406',
    'data-ai-hint': 'investment growth',
  },
  {
    title: 'Spotting Boiler Room Tactics',
    content:
      'This involves high-pressure sales calls from salespeople who use deceptive tactics to persuade investors to buy worthless or overpriced stocks. Be wary of unsolicited investment offers over the phone.',
    image: 'https://picsum.photos/607/407',
    'data-ai-hint': 'call center',
  },
  {
    title: 'Deepfake and Media Analysis',
    content:
      'Learn how AI uses computer vision to detect deepfakes and manipulated media in videos and images shared by supposed market leaders, preventing the spread of misinformation.',
    image: 'https://picsum.photos/608/408',
    'data-ai-hint': 'artificial intelligence',
  },
  {
    title: 'User Behavioral Profiling',
    content:
      'Discover how monitoring trading patterns, login habits, and app usage helps identify sudden deviations or impersonation attempts, providing early warnings for suspicious activity.',
    image: 'https://picsum.photos/609/409',
    'data-ai-hint': 'user behavior',
  },
  {
    title: 'Network and Graph Analysis',
    content:
      'Apply network analysis to uncover coordinated fraud rings, pump-and-dump schemes, and abnormal relationships between trading accounts that may indicate illicit activities.',
    image: 'https://picsum.photos/610/410',
    'data-ai-hint': 'network graph',
  },
  {
    title: 'Text & Semantic Analysis',
    content:
      'Utilize NLP models to scan stock tips, news, and social media posts for deceptive language, scam keywords, and manipulative narratives that could mislead investors.',
    image: 'https://picsum.photos/611/411',
    'data-ai-hint': 'text analysis',
  },
  {
    title: 'Identity and Document Verification',
    content:
      'Understand how ML models verify uploaded documents and credentials against trusted databases to reduce impersonation and the presence of fake profiles in the financial ecosystem.',
    image: 'https://picsum.photos/612/412',
    'data-ai-hint': 'identity verification',
  },
];

export default function EducationPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Educational Center</CardTitle>
          <CardDescription>
            Improve your fraud awareness and market literacy with these
            interactive modules.
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module, index) => (
          <Card key={index} className="flex flex-col">
            <div className="relative aspect-video w-full">
              <Image
                src={module.image}
                alt={module.title}
                fill
                className="rounded-t-lg object-cover"
                data-ai-hint={module['data-ai-hint']}
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl">{module.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{module.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
