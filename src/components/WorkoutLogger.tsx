import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus, Save, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Set {
  weight: number;
  reps: number;
  rir: number;
}

interface Exercise {
  name: string;
  muscleGroup: string;
  sets: Set[];
}

const exercises = [
  { name: "Bench Press", muscleGroup: "Chest" },
  { name: "Overhead Press", muscleGroup: "Shoulders" },
  { name: "Tricep Dips", muscleGroup: "Triceps" },
  { name: "Squat", muscleGroup: "Legs" },
  { name: "Deadlift", muscleGroup: "Back" },
  { name: "Barbell Rows", muscleGroup: "Back" },
  { name: "Bicep Curls", muscleGroup: "Biceps" }
];

const WorkoutLogger = () => {
  const [selectedExercise, setSelectedExercise] = useState("");
  const [currentWorkout, setCurrentWorkout] = useState<Exercise[]>([]);
  const { toast } = useToast();

  const addExercise = () => {
    if (!selectedExercise) return;
    
    const exercise = exercises.find(ex => ex.name === selectedExercise);
    if (!exercise) return;

    const newExercise: Exercise = {
      ...exercise,
      sets: [{ weight: 0, reps: 0, rir: 3 }]
    };

    setCurrentWorkout([...currentWorkout, newExercise]);
    setSelectedExercise("");
  };

  const addSet = (exerciseIndex: number) => {
    const updatedWorkout = [...currentWorkout];
    const lastSet = updatedWorkout[exerciseIndex].sets[updatedWorkout[exerciseIndex].sets.length - 1];
    updatedWorkout[exerciseIndex].sets.push({ ...lastSet });
    setCurrentWorkout(updatedWorkout);
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    const updatedWorkout = [...currentWorkout];
    updatedWorkout[exerciseIndex].sets.splice(setIndex, 1);
    setCurrentWorkout(updatedWorkout);
  };

  const updateSet = (exerciseIndex: number, setIndex: number, field: keyof Set, value: number) => {
    const updatedWorkout = [...currentWorkout];
    updatedWorkout[exerciseIndex].sets[setIndex][field] = value;
    setCurrentWorkout(updatedWorkout);
  };

  const removeExercise = (exerciseIndex: number) => {
    const updatedWorkout = [...currentWorkout];
    updatedWorkout.splice(exerciseIndex, 1);
    setCurrentWorkout(updatedWorkout);
  };

  const saveWorkout = () => {
    if (currentWorkout.length === 0) {
      toast({
        title: "Geen oefeningen",
        description: "Voeg eerst oefeningen toe aan je training.",
        variant: "destructive"
      });
      return;
    }

    // Here you would save to your backend
    toast({
      title: "Training opgeslagen!",
      description: `${currentWorkout.length} oefeningen succesvol gelogd.`,
    });
    
    setCurrentWorkout([]);
  };

  const getRIRColor = (rir: number) => {
    if (rir <= 1) return "text-destructive";
    if (rir <= 2) return "text-warning";
    return "text-success";
  };

  const getRIRLabel = (rir: number) => {
    if (rir === 0) return "Falen";
    if (rir === 1) return "1 RIR";
    return `${rir} RIR`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Training Logger</h2>
        <p className="text-muted-foreground">Log je sets met gewicht, reps en RIR</p>
      </div>

      {/* Exercise Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Oefening Toevoegen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Select value={selectedExercise} onValueChange={setSelectedExercise}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Selecteer een oefening" />
              </SelectTrigger>
              <SelectContent>
                {exercises.map((exercise) => (
                  <SelectItem key={exercise.name} value={exercise.name}>
                    {exercise.name} ({exercise.muscleGroup})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={addExercise} disabled={!selectedExercise}>
              <Plus className="h-4 w-4 mr-2" />
              Toevoegen
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Workout */}
      {currentWorkout.map((exercise, exerciseIndex) => (
        <Card key={exerciseIndex}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{exercise.name}</CardTitle>
                <Badge variant="secondary">{exercise.muscleGroup}</Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExercise(exerciseIndex)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Sets Header */}
            <div className="grid grid-cols-5 gap-4 text-sm font-medium text-muted-foreground">
              <span>Set</span>
              <span>Gewicht (kg)</span>
              <span>Reps</span>
              <span>RIR</span>
              <span></span>
            </div>

            {/* Sets */}
            {exercise.sets.map((set, setIndex) => (
              <div key={setIndex} className="grid grid-cols-5 gap-4 items-center">
                <span className="font-medium">{setIndex + 1}</span>
                <Input
                  type="number"
                  value={set.weight || ""}
                  onChange={(e) => updateSet(exerciseIndex, setIndex, "weight", Number(e.target.value))}
                  placeholder="kg"
                />
                <Input
                  type="number"
                  value={set.reps || ""}
                  onChange={(e) => updateSet(exerciseIndex, setIndex, "reps", Number(e.target.value))}
                  placeholder="reps"
                />
                <div className="space-y-1">
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    value={set.rir}
                    onChange={(e) => updateSet(exerciseIndex, setIndex, "rir", Number(e.target.value))}
                  />
                  <span className={`text-xs ${getRIRColor(set.rir)}`}>
                    {getRIRLabel(set.rir)}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSet(exerciseIndex, setIndex)}
                  disabled={exercise.sets.length === 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={() => addSet(exerciseIndex)}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Set Toevoegen
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* Save Buttons */}
      {currentWorkout.length > 0 && (
        <div className="flex gap-4">
          <Button onClick={saveWorkout} className="flex-1" size="lg">
            <Save className="h-4 w-4 mr-2" />
            Training Opslaan
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentWorkout([])}
            size="lg"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      )}
    </div>
  );
};

export default WorkoutLogger;