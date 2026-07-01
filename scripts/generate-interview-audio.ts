import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { INTERVIEW_SUSPECTS } from '../src/data/interviewChat';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'audio', 'interviews');

const DEFAULT_VOICE_IDS = {
  grant: 'JBFqnCBsd6RMkjVDRZzb',
  patel: 'EXAVITQu4vr4xnSDxMaL',
} as const;

const VOICE_SETTINGS = {
  grant: { stability: 0.38, similarity_boost: 0.72, style: 0.35 },
  patel: { stability: 0.52, similarity_boost: 0.82, style: 0.2 },
} as const;

function getEnv(name: string): string {
  return process.env[name]?.trim() ?? '';
}

async function synthesize(
  apiKey: string,
  voiceId: string,
  text: string,
  suspectId: keyof typeof VOICE_SETTINGS,
): Promise<Buffer> {
  const model = getEnv('VITE_ELEVENLABS_MODEL') || 'eleven_turbo_v2_5';
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
    },
    body: JSON.stringify({
      text,
      model_id: model,
      voice_settings: VOICE_SETTINGS[suspectId],
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `ElevenLabs error (${response.status})`);
  }

  return Buffer.from(await response.arrayBuffer());
}

async function main() {
  const apiKey = getEnv('VITE_ELEVENLABS_API_KEY');
  if (!apiKey) {
    console.error('Missing VITE_ELEVENLABS_API_KEY. Add it to .env.local first.');
    process.exit(1);
  }

  const voiceGrant = getEnv('VITE_ELEVENLABS_VOICE_GRANT') || DEFAULT_VOICE_IDS.grant;
  const voicePatel = getEnv('VITE_ELEVENLABS_VOICE_PATEL') || DEFAULT_VOICE_IDS.patel;
  const voices = { grant: voiceGrant, patel: voicePatel } as const;

  await mkdir(OUT_DIR, { recursive: true });

  const manifest: string[] = [];

  for (const suspect of INTERVIEW_SUSPECTS) {
    const suspectDir = path.join(OUT_DIR, suspect.id);
    await mkdir(suspectDir, { recursive: true });

    for (const turn of suspect.turns) {
      const fileName = `${turn.id}.mp3`;
      const outFile = path.join(suspectDir, fileName);
      console.log(`Generating ${suspect.id}/${fileName}…`);

      const audio = await synthesize(apiKey, voices[suspect.id], turn.answer, suspect.id);
      await writeFile(outFile, audio);
      manifest.push(`${suspect.id}/${fileName}`);
    }
  }

  await writeFile(
    path.join(OUT_DIR, 'manifest.json'),
    JSON.stringify({ generatedAt: new Date().toISOString(), files: manifest }, null, 2),
  );

  console.log('\nDone. Saved', manifest.length, 'clips to public/audio/interviews/');
  console.log('Commit the mp3 files — the app plays them directly with no API key at runtime.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
