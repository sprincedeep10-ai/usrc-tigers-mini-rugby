const GITHUB_OWNER = "sprincedeep10-ai";
const GITHUB_REPO = "usrc-tigers-mini-rugby";
const BRANCH = "main";

function getToken(): string {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN env var is not set");
  return token;
}

const headers = () => ({
  Authorization: `Bearer ${getToken()}`,
  "Content-Type": "application/json",
  "X-GitHub-Api-Version": "2022-11-28",
});

function base64ToUtf8(b64: string): string {
  const binaryString = atob(b64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return new TextDecoder("utf-8").decode(bytes);
}

function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binaryString = "";
  for (let i = 0; i < bytes.length; i++) {
    binaryString += String.fromCharCode(bytes[i]);
  }
  return btoa(binaryString);
}

export async function getFileContents(path: string): Promise<{
  content: string;
  sha: string;
}> {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${BRANCH}`;
  const res = await fetch(url, { headers: headers() });

  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  const content = base64ToUtf8(data.content);

  return { content, sha: data.sha };
}

export async function commitFile(
  path: string,
  content: string,
  message: string,
  sha?: string
): Promise<void> {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`;

  const body: Record<string, unknown> = {
    message,
    content: utf8ToBase64(content),
    branch: BRANCH,
  };

  if (sha) {
    body.sha = sha;
  }

  const res = await fetch(url, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub commit failed ${res.status}: ${err}`);
  }
}
