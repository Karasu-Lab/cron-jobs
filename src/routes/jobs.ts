import { Elysia } from 'elysia';

/** Manual-trigger routes mirroring the scheduled jobs, for testing/ops use outside the cron schedule. */
export const jobRoutes = () => new Elysia();
