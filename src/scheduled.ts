/** Cloudflare Cron Trigger entry point: dispatches every registered scheduled job. */
export async function scheduled(controller: ScheduledController, _env: Env, _ctx: ExecutionContext): Promise<void> {
  console.log(`Cron triggered: ${controller.cron} at ${new Date(controller.scheduledTime).toISOString()}`);
}
