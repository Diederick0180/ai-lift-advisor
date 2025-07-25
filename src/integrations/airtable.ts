// TODO: Zet deze key in een .env bestand en gebruik een proxy/serverless function voor productie!
const AIRTABLE_API_KEY = 'patWDHU63NhSVarpU.3cf2a221e477fd0088a2a481a67bb8f414c7a1969248afdff9da0574af211b06';
const BASE_ID = 'appxmoO3TOHvzfnxY';

const AIRTABLE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

export async function fetchExerciseReferences() {
  const res = await fetch(`${AIRTABLE_URL}/ExerciseReferences`, {
    headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
  });
  if (!res.ok) throw new Error('Fout bij ophalen oefeningen');
  const data = await res.json();
  return data.records;
}

export async function fetchTrainingsLogs() {
  const res = await fetch(`${AIRTABLE_URL}/TrainingsLogs?sort[0][field]=Date&sort[0][direction]=desc`, {
    headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
  });
  if (!res.ok) throw new Error('Fout bij ophalen trainingslogs');
  const data = await res.json();
  return data.records;
}

export async function addTrainingsLog(fields: Record<string, any>) {
  const res = await fetch(`${AIRTABLE_URL}/TrainingsLogs`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) throw new Error('Fout bij toevoegen trainingslog');
  const data = await res.json();
  return data;
}

export async function updateTrainingsLog(id: string, fields: Record<string, any>) {
  const res = await fetch(`${AIRTABLE_URL}/TrainingsLogs/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) throw new Error('Fout bij aanpassen trainingslog');
  const data = await res.json();
  return data;
} 