# Deploy Knits by Muna on Vercel (beginner guide)

Follow these steps in order. You need: a **GitHub** account, a **Vercel** account, and a **Supabase** account (all have free tiers).

---

## Part 1 — Put your code on GitHub

1. Push this project to a GitHub repository you own (for example `aroshkhan498/KNITS-BY-MUNA`).
2. If `git push` asks for login, use your GitHub username and a **Personal Access Token** (not your GitHub password):  
   GitHub → **Settings → Developer settings → Personal access tokens** → create token with **repo** scope.

---

## Part 2 — Create the database (Supabase)

1. Go to [https://supabase.com](https://supabase.com) and sign in.
2. **New project** → choose a name, a database password (save it somewhere safe), region close to you → **Create new project**.
3. Wait until the project finishes setting up.
4. **Create the tables** (one time):
   - In Supabase: **SQL Editor** → **New query**.
   - Open the file `supabase/init.sql` from this repo, copy **all** of it, paste into the editor, click **Run**.  
   You should see “Success” with no errors.

---

## Part 3 — Get the database URL for Vercel

1. In Supabase: **Project Settings** (gear) → **Database**.
2. Under **Connection string**, choose **URI**.
3. Turn on **“Use connection pooling”** (Session mode is fine; **Transaction** mode also works for many serverless apps).
4. Copy the string. It looks like:
   `postgresql://postgres.[ref]:[YOUR-PASSWORD]@aws-0-....pooler.supabase.com:6543/postgres`
5. Replace `[YOUR-PASSWORD]` with the **database password** you set when you created the project (the placeholder in the URL is not your password by itself).

This full string is your **`POSTGRES_URL`** for Vercel.

---

## Part 4 — (Optional) Product image uploads with Vercel Blob

The admin panel can upload product images to **Vercel Blob** if you add a token.

1. In [Vercel](https://vercel.com): open your team → **Storage** → **Blob** → **Create** a store (or attach Blob to the project when prompted).
2. Create a **read/write token** and copy it.
3. You will add it as **`BLOB_READ_WRITE_TOKEN`** in Part 5.

If you skip this, the site still runs; admin saves may fall back to a default image until you add the token.

---

## Part 5 — Deploy on Vercel

1. Go to [https://vercel.com](https://vercel.com) and sign in (use **Sign in with GitHub**).
2. **Add New… → Project** → **Import** your GitHub repository `KNITS-BY-MUNA` (or whatever you named it).
3. **Framework Preset**: Vercel should detect **Next.js**. Leave defaults:
   - **Build Command**: `npm run build` (default)
   - **Output**: Next.js default (no change needed)
4. Expand **Environment Variables** and add each row below (same **Name**, paste your real **Value**).

| Name | Value | Environments |
|------|--------|----------------|
| `POSTGRES_URL` | The full Supabase pooling URI from Part 3 | Production, Preview, Development |
| `BLOB_READ_WRITE_TOKEN` | From Part 4 (optional; skip if not using Blob) | Production, Preview, Development |
| `ADMIN_USER` | A private username for the admin panel (Basic Auth) | Production, Preview |
| `ADMIN_PASSWORD` | A long random password (you will enter this when the browser asks on `/admin`) | Production, Preview |

**Optional (recommended after first deploy):**

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SITE_URL` | Your live URL, e.g. `https://knits-by-muna.vercel.app` |

5. Click **Deploy**. Wait for the build to finish. Open the **Visit** URL.

**Admin login:** When you open **`/your-site/admin`**, the browser shows a **username/password** popup. Use the same **`ADMIN_USER`** and **`ADMIN_PASSWORD`** you entered in Vercel (not your GitHub or Supabase password).

---

## Part 6 — After the first deploy

1. Open your site URL. Browse the shop and home page.
2. Open **`/admin`** on the same domain. Your browser will prompt for **Basic Auth** — use **`ADMIN_USER`** and **`ADMIN_PASSWORD`** from Vercel.
3. In **Vercel → Project → Settings → Environment Variables**, if you change any variable, go to **Deployments → … on latest → Redeploy** so the new values apply.

---

## Troubleshooting

| Problem | What to try |
|--------|-------------|
| Build fails on Vercel | Open the failed deployment → **Building** log; fix the error shown (often a missing env or typo in `POSTGRES_URL`). |
| Site loads but admin/DB errors | Confirm `POSTGRES_URL` is the **pooling** URI and password is correct; run `supabase/init.sql` again if tables are missing. |
| Images from Blob broken | In Vercel env, confirm `BLOB_READ_WRITE_TOKEN`; redeploy. `next.config.ts` already allows `*.public.blob.vercel-storage.com`. |
| `git push` denied | You must push with a GitHub user that has access to that repo; clear old credentials in Windows **Credential Manager** if the wrong account is used. |

---

## Local development (optional)

```bash
cp .env.example .env.local
```

Fill `POSTGRES_URL` (and optional `BLOB_READ_WRITE_TOKEN`) in `.env.local`, then:

```bash
npm install
npm run dev
```

Push database schema changes from your machine (if you edit `src/db/schema.ts`):

```bash
npm run db:push
```

(`POSTGRES_URL` must be set in `.env.local`; for some setups use the **direct** connection on port **5432** only for `drizzle-kit push`, and the **pooler** URL on Vercel for the running app.)

---

You are done when: the Vercel URL opens, pages load, and (after env + SQL) admin can save products.
