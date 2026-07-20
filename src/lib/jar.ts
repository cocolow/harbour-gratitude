import { FIRST_JAR_SIZE } from '../constants';
import type { JarState } from '../types';

/** First cycle (no redemption yet) uses 8; later cycles use settings.jarSize. */
export function getJarTarget(jar: JarState, jarSize: number): number {
  return jar.redemptionCount === 0 ? FIRST_JAR_SIZE : jarSize;
}

export function getJarProgressLabel(
  current: number,
  target: number,
  rewardLabel: string,
): string {
  if (current >= target) {
    return `full · ${current}/${target} — enjoy your ${rewardLabel}`;
  }
  return `fill the jar, earn yourself a ${rewardLabel} · ${current}/${target}`;
}
