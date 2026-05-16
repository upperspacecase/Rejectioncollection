import { doc, runTransaction, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export const FOUNDING_MEMBER_CAP = 50;

interface FoundingMeta {
  count: number;
  max: number;
}

export async function claimFoundingMemberIfEligible(
  uid: string,
  currentNumber: number | undefined
): Promise<number | null> {
  if (currentNumber !== undefined) return currentNumber;

  try {
    return await runTransaction(db, async (tx) => {
      const metaRef = doc(db, 'meta', 'founding');
      const userRef = doc(db, 'users', uid);

      const metaSnap = await tx.get(metaRef);
      const userSnap = await tx.get(userRef);

      const existing = userSnap.data()?.foundingMemberNumber as number | undefined;
      if (existing !== undefined) return existing;

      const meta: FoundingMeta = metaSnap.exists()
        ? (metaSnap.data() as FoundingMeta)
        : { count: 0, max: FOUNDING_MEMBER_CAP };

      if (meta.count >= meta.max) return null;

      const newCount = meta.count + 1;

      if (metaSnap.exists()) {
        tx.update(metaRef, { count: newCount });
      } else {
        tx.set(metaRef, { count: newCount, max: FOUNDING_MEMBER_CAP });
      }
      tx.update(userRef, { foundingMemberNumber: newCount });

      return newCount;
    });
  } catch {
    return null;
  }
}

export async function readFoundingCount(): Promise<FoundingMeta> {
  try {
    const snap = await getDoc(doc(db, 'meta', 'founding'));
    if (!snap.exists()) return { count: 0, max: FOUNDING_MEMBER_CAP };
    const data = snap.data() as FoundingMeta;
    return { count: data.count ?? 0, max: data.max ?? FOUNDING_MEMBER_CAP };
  } catch {
    return { count: 0, max: FOUNDING_MEMBER_CAP };
  }
}
