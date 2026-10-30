# cron-jobs

The scheduled-jobs worker for Karasu Lab — runs the daily cleanup of anonymous QR uploads and exposes job routes for manual triggers — running on Cloudflare Workers. Split out of [Karasu-Lab/Karasu-Lab](https://github.com/Karasu-Lab/Karasu-Lab).

## Required environment variables

Both jobs are thin wrappers around the shared [`deploy-worker`](https://github.com/Karasu-Lab/Workers) action (`Karasu-Lab/Workers/deploy-worker@v1`): the workflow only maps this app's names into the environment and passes its commands as parameters, and the action assembles the workspace, deploys, and prunes branch Previews to the newest five. The deploy workflow (`.github/workflows/cron-jobs-deploy.yml`) reads the following GitHub Actions secrets and variables, organized by GitHub Environments. The production job runs in the `production` environment and the preview job in the `preview` environment (a `development` environment also exists); register each name at repository level as the default, and override it inside an environment only where that environment needs a different value — a name an environment does not define falls back to the repository-level entry. Values are never committed to the repository.

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

Pushes to non-`main` branches create or update a preview deployment of the same single worker (`wrangler preview`), named after the branch. Previews resolve the same secret names from the `preview` environment, so they only ever receive the values defined there or at repository level — never values defined in the `production` environment.
