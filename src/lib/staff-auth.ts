const STAFF_USERNAME = "tigersadmin";
const STAFF_PASSWORD = "USRCtigers2024!";

export function validateCredentials(
  username: string,
  password: string
): boolean {
  return username === STAFF_USERNAME && password === STAFF_PASSWORD;
}

export function createSessionToken(username: string): string {
  const payload = JSON.stringify({
    user: username,
    ts: Date.now(),
  });
  return Buffer.from(payload).toString("base64");
}

export function verifySessionToken(token: string): boolean {
  try {
    const payload = JSON.parse(Buffer.from(token, "base64").toString());
    if (!payload.user || !payload.ts) return false;
    const age = Date.now() - payload.ts;
    if (age > 24 * 60 * 60 * 1000) return false;
    return payload.user === STAFF_USERNAME;
  } catch {
    return false;
  }
}

export function getSessionUser(token: string): string | null {
  try {
    const payload = JSON.parse(Buffer.from(token, "base64").toString());
    return payload.user ?? null;
  } catch {
    return null;
  }
}
