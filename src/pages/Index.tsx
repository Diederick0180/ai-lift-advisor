import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Dashboard from "@/components/Dashboard";
import WorkoutLogger from "@/components/WorkoutLogger";
import ProgressCharts from "@/components/ProgressCharts";
import AICoaching from "@/components/AICoaching";
import { Dumbbell, TrendingUp, Brain, Home, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/auth";
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Dumbbell className="h-8 w-8 text-primary mx-auto mb-2 animate-spin" />
          <p className="text-muted-foreground">Laden...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="flex items-center justify-between p-2">
            <TabsList className="grid grid-cols-4 max-w-md mx-auto">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="logger" className="flex items-center gap-2">
                <Dumbbell className="h-4 w-4" />
                <span className="hidden sm:inline">Logger</span>
              </TabsTrigger>
              <TabsTrigger value="progress" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Progressie</span>
              </TabsTrigger>
              <TabsTrigger value="coaching" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">AI Coach</span>
              </TabsTrigger>
            </TabsList>
            <Button
              variant="outline"
              size="sm"
              onClick={signOut}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Uitloggen</span>
            </Button>
          </div>
        </div>

        <TabsContent value="dashboard" className="mt-0">
          <Dashboard />
        </TabsContent>
        
        <TabsContent value="logger" className="mt-0">
          <WorkoutLogger />
        </TabsContent>
        
        <TabsContent value="progress" className="mt-0">
          <ProgressCharts />
        </TabsContent>
        
        <TabsContent value="coaching" className="mt-0">
          <AICoaching />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
