import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Lightbulb, TrendingUp, AlertTriangle } from "lucide-react";

interface ExerciseAnalysis {
  exercise: string;
  recommendation: string;
  nextWeight: string;
  confidence: "high" | "medium" | "low";
  reasoning: string;
}

const mockAnalyses: ExerciseAnalysis[] = [
  {
    exercise: "Bench Press",
    recommendation: "Verhoog gewicht met 2.5kg. Je RIR was consistent op 1-2, wat betekent dat je klaar bent voor progressie.",
    nextWeight: "82.5kg",
    confidence: "high",
    reasoning: "Stabiele prestatie over 3 sessies, lage RIR wijst op goede kracht reserve"
  },
  {
    exercise: "Overhead Press",
    recommendation: "Houd hetzelfde gewicht, maar voeg 1 extra set toe. Je form kan verbeteren.",
    nextWeight: "45kg",
    confidence: "medium", 
    reasoning: "Volume kan omhoog, maar gewicht lijkt momenteel uitdagend genoeg"
  },
  {
    exercise: "Squat",
    recommendation: "Overweeg een deload week. Je RIR is de laatste 2 sessies gestegen naar 3-4.",
    nextWeight: "100kg (-10kg)",
    confidence: "high",
    reasoning: "Mogelijk overreaching, herstel is nodig voor verdere progressie"
  }
];

const AICoaching = () => {
  const [customQuestion, setCustomQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "high":
        return "bg-success text-success-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getConfidenceLabel = (confidence: string) => {
    switch (confidence) {
      case "high":
        return "Hoge Zekerheid";
      case "medium":
        return "Gemiddelde Zekerheid";
      case "low":
        return "Lage Zekerheid";
      default:
        return "Onbekend";
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    if (recommendation.includes("verhoog") || recommendation.includes("Verhoog")) {
      return <TrendingUp className="h-4 w-4 text-success" />;
    }
    if (recommendation.includes("deload") || recommendation.includes("Deload")) {
      return <AlertTriangle className="h-4 w-4 text-warning" />;
    }
    return <Lightbulb className="h-4 w-4 text-primary" />;
  };

  const askAI = async () => {
    if (!customQuestion.trim()) return;
    
    setIsLoading(true);
    // Simulate AI response
    setTimeout(() => {
      setAiResponse(`Gebaseerd op je vraag over "${customQuestion}", raad ik aan om je training aan te passen door meer focus te leggen op progressieve overload. Overweeg om je RIR bij te houden en geleidelijk het gewicht te verhogen wanneer je consistent 1-2 RIR behaalt.`);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Brain className="h-8 w-8 text-primary" />
          AI Coaching
        </h2>
        <p className="text-muted-foreground">Gepersonaliseerde analyse en aanbevelingen</p>
      </div>

      {/* Exercise Analyses */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Oefening Aanbevelingen</h3>
        {mockAnalyses.map((analysis, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {getRecommendationIcon(analysis.recommendation)}
                  <CardTitle className="text-lg">{analysis.exercise}</CardTitle>
                </div>
                <Badge className={getConfidenceColor(analysis.confidence)}>
                  {getConfidenceLabel(analysis.confidence)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="font-medium text-primary mb-2">Aanbeveling:</p>
                <p>{analysis.recommendation}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-accent/10">
                  <p className="text-sm font-medium text-accent">Volgende Gewicht</p>
                  <p className="text-lg font-bold">{analysis.nextWeight}</p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <p className="text-sm font-medium text-primary">Redenering</p>
                  <p className="text-sm">{analysis.reasoning}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Custom AI Question */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Vraag de AI Coach
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Stel een vraag over je training, voeding, of herstel..."
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            rows={3}
          />
          <Button 
            onClick={askAI} 
            disabled={!customQuestion.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? "AI denkt na..." : "Vraag AI Coach"}
          </Button>
          
          {aiResponse && (
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="font-medium text-primary mb-2 flex items-center gap-2">
                <Brain className="h-4 w-4" />
                AI Coach Antwoord:
              </p>
              <p>{aiResponse}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Training Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Training Inzichten</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-success/10">
              <h4 className="font-semibold text-success mb-2">Sterke Punten</h4>
              <ul className="text-sm space-y-1">
                <li>• Consistente training frequentie</li>
                <li>• Goede RIR discipline</li>
                <li>• Sterke bench press progressie</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-warning/10">
              <h4 className="font-semibold text-warning mb-2">Verbeterpunten</h4>
              <ul className="text-sm space-y-1">
                <li>• Meer focus op been training</li>
                <li>• Overweeg deload voor squat</li>
                <li>• Verhoog core training volume</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AICoaching;