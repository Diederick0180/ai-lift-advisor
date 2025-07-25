import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dumbbell, TrendingUp, Target, Calendar } from "lucide-react";

const Dashboard = () => {
  const todayWorkout = {
    split: "Push Day",
    exercises: ["Bench Press", "Overhead Press", "Tricep Dips"],
    estimatedTime: "45 min"
  };

  const weeklyProgress = {
    completed: 3,
    target: 4,
    percentage: 75
  };

  const recentPRs = [
    { exercise: "Bench Press", weight: "85kg", date: "2 dagen geleden" },
    { exercise: "Squat", weight: "120kg", date: "5 dagen geleden" }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Hypertrofie Coach
          </h1>
          <p className="text-muted-foreground">AI-gedreven progressietracker</p>
        </div>

        {/* Today's Workout Card */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-primary" />
              Vandaag Trainen
            </CardTitle>
          </CardHeader>
          <CardContent className="relative space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg">{todayWorkout.split}</span>
                <Badge variant="secondary">{todayWorkout.estimatedTime}</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {todayWorkout.exercises.map((exercise, index) => (
                  <Badge key={index} variant="outline">
                    {exercise}
                  </Badge>
                ))}
              </div>
            </div>
            <Button className="w-full" size="lg">
              <Dumbbell className="mr-2 h-4 w-4" />
              Start Training
            </Button>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weekly Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-accent" />
                Week Voortgang
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Trainingen</span>
                  <span>{weeklyProgress.completed}/{weeklyProgress.target}</span>
                </div>
                <Progress value={weeklyProgress.percentage} className="h-2" />
              </div>
              <p className="text-muted-foreground text-sm">
                Nog {weeklyProgress.target - weeklyProgress.completed} training(en) voor je weekdoel
              </p>
            </CardContent>
          </Card>

          {/* Recent PRs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                Recente PR's
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentPRs.map((pr, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{pr.exercise}</p>
                    <p className="text-sm text-muted-foreground">{pr.date}</p>
                  </div>
                  <Badge className="bg-success text-success-foreground">
                    {pr.weight}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-20 flex-col gap-2">
            <Calendar className="h-5 w-5" />
            <span className="text-sm">Training Plan</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2">
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm">Progressie</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2">
            <Dumbbell className="h-5 w-5" />
            <span className="text-sm">Oefeningen</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2">
            <Target className="h-5 w-5" />
            <span className="text-sm">Doelen</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;