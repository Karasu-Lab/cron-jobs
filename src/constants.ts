import { z } from 'zod';

/**
 * The configurable values that point at the Karasu Lab domains. Their
 * production values are the defaults here, so the worker needs no URL
 * configuration in its wrangler vars — only secrets are provisioned from
 * outside. An environment variable of the same name still overrides the
 * default, and the defaults branch on APP_ENV so local runs resolve
 * their own domains.
 */
const PRODUCTION_DEFAULTS = {
  QR_APP_URL: 'https://qr.karasu256.com',
};

const LOCAL_DEFAULTS = {
  QR_APP_URL: 'http://localhost:3002',
};

type DomainDefaults = {
  QR_APP_URL: string;
};

function domainEnvSchema(defaults: DomainDefaults) {
  return z.object({
    QR_APP_URL: z.url().default(defaults.QR_APP_URL),
  });
}

/**
 * Materializes the worker's environment: every domain value the worker
 * was not explicitly given is filled in from the constants above,
 * branched on APP_ENV (local / production). Called where the worker
 * materializes its env — the module env and the scheduled handler —
 * before any job reads it.
 */
export function resolveEnv(raw: Env): Env {
  const defaults = raw.APP_ENV === 'local' ? LOCAL_DEFAULTS : PRODUCTION_DEFAULTS;
  return { ...raw, ...domainEnvSchema(defaults).parse(raw) };
}
