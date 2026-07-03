import { appendEvent } from './db';
import type { AppEvent, EventType } from '../types';

export async function logEvent(
  type: EventType,
  meta?: Record<string, unknown>,
): Promise<AppEvent> {
  const event: AppEvent = {
    id: crypto.randomUUID(),
    type,
    timestamp: new Date().toISOString(),
    meta,
  };
  await appendEvent(event);
  return event;
}
