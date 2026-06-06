import { FIREBASE_PROJECT_ID, FIREBASE_API_KEY } from './firebaseConfig';

export interface PublicProfile {
  uid: string;
  name: string;
  foundingMemberNumber: number | null;
  total: number;
  nos: number;
  yeses: number;
  streak: number;
  weeklyNos: number;
  noOfWeek: string | null;
  joinDate: number;
}

interface FsValue {
  stringValue?: string;
  integerValue?: string;
  doubleValue?: number;
  booleanValue?: boolean;
  nullValue?: null;
  timestampValue?: string;
}

function asNumber(v: FsValue | undefined): number {
  if (!v) return 0;
  if (v.integerValue !== undefined) return parseInt(v.integerValue, 10);
  if (v.doubleValue !== undefined) return v.doubleValue;
  return 0;
}

function asString(v: FsValue | undefined): string | null {
  return v?.stringValue ?? null;
}

/**
 * Reads a public profile via the Firestore REST API. Works unauthenticated
 * because `profiles/{uid}` is world-readable per firestore.rules, so it can run
 * in server components and the OG image (edge) route without the client SDK.
 */
export async function fetchPublicProfile(uid: string): Promise<PublicProfile | null> {
  const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/profiles/${encodeURIComponent(
    uid
  )}?key=${FIREBASE_API_KEY}`;

  let res: Response;
  try {
    res = await fetch(url, { next: { revalidate: 30 } });
  } catch {
    return null;
  }
  if (!res.ok) return null;

  const json = (await res.json()) as { fields?: Record<string, FsValue> };
  const f = json.fields;
  if (!f) return null;

  return {
    uid,
    name: asString(f.name) || 'A collector',
    foundingMemberNumber: f.foundingMemberNumber ? asNumber(f.foundingMemberNumber) : null,
    total: asNumber(f.total),
    nos: asNumber(f.nos),
    yeses: asNumber(f.yeses),
    streak: asNumber(f.streak),
    weeklyNos: asNumber(f.weeklyNos),
    noOfWeek: asString(f.noOfWeek),
    joinDate: asNumber(f.joinDate),
  };
}
