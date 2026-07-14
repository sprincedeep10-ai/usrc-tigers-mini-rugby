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
  const content = decodeURIComponent(
    atob(data.content).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    )
  );

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
    content: btoa(unescape(encodeURIComponent(content))),
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
