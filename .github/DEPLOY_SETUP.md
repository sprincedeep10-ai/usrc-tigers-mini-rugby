# Fix slow / missing deploys (one-time, 2 minutes)

GitHub pushes do **not** auto-update the live site until you add a deploy hook.

## Steps

1. Open **Vercel** → your USRC Tigers project → **Settings** → **Git** → **Deploy Hooks**
2. Click **Create Hook** → name: `github` → branch: `main` → **Create**
3. Copy the hook URL (looks like `https://api.vercel.com/v1/integrations/deploy/...`)
4. Open **GitHub** → repo **usrc-tigers-mini-rugby** → **Settings** → **Secrets and variables** → **Actions**
5. **New repository secret** → name: `VERCEL_DEPLOY_HOOK` → paste the URL → Save

Done. Every push to `main` deploys in about 60 seconds.

Until this is set up, you must redeploy manually: Vercel → Deployments → ⋯ → Redeploy.
