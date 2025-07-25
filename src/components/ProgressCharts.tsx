import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

// Mock data for demonstration
const benchPressData = [
  { date: "Week 1", weight: 70, volume: 1400, reps: 20 },
  { date: "Week 2", weight: 72.5, volume: 1450, reps: 20 },
  { date: "Week 3", weight: 75, volume: 1500, reps: 20 },
  { date: "Week 4", weight: 75, volume: 1425, reps: 19 },
  { date: "Week 5", weight: 77.5, volume: 1550, reps: 20 },
  { date: "Week 6", weight: 80, volume: 1600, reps: 20 }
];

const muscleGroupData = [
  { muscle: "Chest", volume: 85, fullMark: 100 },
  { muscle: "Back", volume: 92, fullMark: 100 },
  { muscle: "Shoulders", volume: 78, fullMark: 100 },
  { muscle: "Arms", volume: 88, fullMark: 100 },
  { muscle: "Legs", volume: 95, fullMark: 100 },
  { muscle: "Core", volume: 65, fullMark: 100 }
];

const exerciseProgress = [
  { name: "Bench Press", trend: "up", change: "+5kg", status: "progress" },
  { name: "Overhead Press", trend: "up", change: "+2.5kg", status: "progress" },
  { name: "Squat", trend: "flat", change: "0kg", status: "plateau" },
  { name: "Deadlift", trend: "down", change: "-2.5kg", status: "deload" },
  { name: "Barbell Rows", trend: "up", change: "+2.5kg", status: "progress" }
];

const ProgressCharts = () => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "progress":
        return "bg-success text-success-foreground";
      case "plateau":
        return "bg-warning text-warning-foreground";
      case "deload":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "progress":
        return "Progressie";
      case "plateau":
        return "Plateau";
      case "deload":
        return "Deload";
      default:
        return "Stabiel";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Progressie Analyse</h2>
        <p className="text-muted-foreground">Visuele weergave van je trainingsontwikkeling</p>
      </div>

      {/* Exercise Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Bench Press Progressie</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={benchPressData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="weight" orientation="left" />
              <YAxis yAxisId="volume" orientation="right" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line 
                yAxisId="weight"
                type="monotone" 
                dataKey="weight" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                name="Gewicht (kg)"
              />
              <Line 
                yAxisId="volume"
                type="monotone" 
                dataKey="volume" 
                stroke="hsl(var(--accent))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Volume (kg)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Muscle Group Radar */}
        <Card>
          <CardHeader>
            <CardTitle>Spiergroep Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={muscleGroupData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="muscle" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Volume %"
                  dataKey="volume"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Exercise Status */}
        <Card>
          <CardHeader>
            <CardTitle>Oefening Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {exerciseProgress.map((exercise, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  {getTrendIcon(exercise.trend)}
                  <div>
                    <p className="font-medium">{exercise.name}</p>
                    <p className="text-sm text-muted-foreground">{exercise.change}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(exercise.status)}>
                  {getStatusLabel(exercise.status)}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Weekly Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Week Samenvatting</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-primary/10">
              <p className="text-2xl font-bold text-primary">4</p>
              <p className="text-sm text-muted-foreground">Trainingen</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-accent/10">
              <p className="text-2xl font-bold text-accent">12.5kg</p>
              <p className="text-sm text-muted-foreground">Totaal Progressie</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-success/10">
              <p className="text-2xl font-bold text-success">2.1</p>
              <p className="text-sm text-muted-foreground">Gem. RIR</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-warning/10">
              <p className="text-2xl font-bold text-warning">8.2k</p>
              <p className="text-sm text-muted-foreground">Week Volume</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressCharts;