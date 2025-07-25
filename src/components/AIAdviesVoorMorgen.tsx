import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { fetchTrainingsLogs, fetchExerciseReferences, addTrainingsLog } from '../integrations/airtable';

const morgen = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
};

export default function AIAdviesVoorMorgen() {
  const [loading, setLoading] = useState(false);
  const [advies, setAdvies] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleAdvies() {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const [logs, oefeningen] = await Promise.all([
        fetchTrainingsLogs(),
        fetchExerciseReferences(),
      ]);
      // Dummy AI-advies: neem laatste oefening, +1 rep, morgen als datum
      const laatste = logs[0];
      const oefening = oefeningen[0]?.fields?.Exersice || 'Bench Press';
      setAdvies({
        Date: morgen(),
        Exercise: oefening,
        'Repetitions Set 1': (laatste?.fields['Repetitions Set 1'] || 8) + 1,
        'Weight (kg) Set 1': laatste?.fields['Weight (kg) Set 1'] || 40,
      });
    } catch (e) {
      setError('Fout bij ophalen data');
    } finally {
      setLoading(false);
    }
  }

  async function handleOpslaan() {
    setLoading(true);
    setError(null);
    try {
      await addTrainingsLog(advies);
      setSuccess(true);
    } catch (e) {
      setError('Fout bij opslaan');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAdvies({ ...advies, [e.target.name]: e.target.value });
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>AI-advies voor morgen</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleAdvies} disabled={loading} className="mb-4">
          {loading ? 'Bezig...' : 'Genereer AI-advies'}
        </Button>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {advies && (
          <form
            className="space-y-2"
            onSubmit={e => {
              e.preventDefault();
              handleOpslaan();
            }}
          >
            <div>
              <label className="block text-sm">Datum</label>
              <Input name="Date" value={advies.Date} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm">Oefening</label>
              <Input name="Exercise" value={advies.Exercise} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm">Reps (Set 1)</label>
              <Input
                name="Repetitions Set 1"
                type="number"
                value={advies['Repetitions Set 1']}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm">Gewicht (kg, Set 1)</label>
              <Input
                name="Weight (kg) Set 1"
                type="number"
                value={advies['Weight (kg) Set 1']}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Opslaan...' : 'Opslaan als training voor morgen'}
            </Button>
            {success && <div className="text-green-600 mt-2">Opgeslagen!</div>}
          </form>
        )}
      </CardContent>
    </Card>
  );
} 