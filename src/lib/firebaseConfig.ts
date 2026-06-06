// Public Firebase identifiers (safe to expose — the web API key is a project
// identifier, not a secret). Kept in one place so server-side code (public
// profile pages, OG image routes) can build Firestore REST URLs without
// importing the client SDK.
export const FIREBASE_PROJECT_ID = 'rejection-collection';
export const FIREBASE_API_KEY = 'AIzaSyC364jP4wTONafmLhkdilCJl82Fzi9wtV0';
