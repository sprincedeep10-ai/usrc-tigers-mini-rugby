# Connect Vercel to GitHub (fixes slow / old deploys)

Your Vercel project is **not linked to GitHub**. That is why pushes do not update the live site.

I cannot log into your Vercel account from here — you need to click Connect once (about 30 seconds).

## Do this now

1. Open **https://vercel.com/dashboard**
2. Click your **USRC Tigers** project (the one for usrctigersrfc.com)
3. Click **Settings** (top menu)
4. Click **Git** (left sidebar)
5. Under **Connected Git Repository**, click **Connect Git Repository**
6. Choose **GitHub**
7. If asked, click **Authorize Vercel** and allow access
8. Find and select: **sprincedeep10-ai / usrc-tigers-mini-rugby**
9. When asked for branch: choose **main** → **Connect**

Vercel will start a deploy automatically. Wait until it says **Ready** (~1–2 minutes).

After this, **every GitHub push to main updates the site in about 60 seconds** — no manual redeploy needed.

---

## If “Connect” is greyed out or fails

Create a fresh link from GitHub instead:

1. Vercel dashboard → **Add New…** → **Project**
2. **Import** → **sprincedeep10-ai/usrc-tigers-mini-rugby**
3. Framework: **Next.js** (auto-detected) → **Deploy**
4. After deploy works: **Settings** → **Domains** → add **usrctigersrfc.com**
5. Remove the old disconnected project if you no longer need it

---

## Deploy Hooks (only after Git is connected)

Deploy Hooks are optional once Git is connected. You do **not** need a deploy hook if step 5–9 above worked.

If you still want GitHub Actions to trigger deploys: Settings → Git → Deploy Hooks → Create Hook → branch `main` → copy URL → GitHub repo Secrets → `VERCEL_DEPLOY_HOOK`.
