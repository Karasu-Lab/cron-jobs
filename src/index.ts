import { Elysia } from 'elysia';
import { CloudflareAdapter } from 'elysia/adapter/cloudflare-worker';
import { env as cfEnv } from 'cloudflare:workers';
import { resolveEnv } from './constants';
import { jobRoutes } from './routes/jobs';
import { scheduled } from './scheduled';

const env = resolveEnv(cfEnv as Env);

const app = new Elysia({ adapter: CloudflareAdapter }).use(jobRoutes(env)).compile();

export default Object.assign(app, { scheduled });
