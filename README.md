# cron-jobs

The scheduled-jobs worker for Karasu Lab — runs the daily cleanup of anonymous QR uploads and exposes job routes for manual triggers — running on Cloudflare Workers. Split out of [Karasu-Lab/karasu256.com](https://github.com/Karasu-Lab/karasu256.com).

## Required environment variables

The deploy workflow (`.github/workflows/cron-jobs-deploy.yml`) reads the following GitHub Actions secrets and variables. Register them on this repository under exactly these names. Values are never committed to the repository.

### Deployment

| Name | Kind | Used for |
| --- | --- | --- |
| `CLOUDFLARE_API_TOKEN` | Secret | Authenticating wrangler against Cloudflare |
| `CLOUDFLARE_ACCOUNT_ID` | Variable | The Cloudflare account the worker is deployed to |

### Worker secrets

These are synced to the production worker on every deploy to `main`.

| Name | Used for |
| --- | --- |
| `DATABASE_URL` | Connection string of the database the jobs run against |
| `CRON_JOBS_API_KEY` | Shared secret proving this worker's identity to the routes it triggers (must match the value on the cdn worker) |

A secret left unset is skipped by the sync (this worker has no committed local defaults for them).

### Branch previews

Pushes to non-`main` branches create or update a preview deployment of the same single worker (`wrangler preview`), named after the branch. Previews use the `PREVIEW_` variants of the worker secrets — `PREVIEW_DATABASE_URL`, `PREVIEW_CRON_JOBS_API_KEY` — and never receive the production values.
