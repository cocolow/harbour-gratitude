const NEGATIVE_PATTERNS = [
  /\b(bad|awful|terrible|horrible|worst|hate|hated|fail(ed|ure)?|anxious|anxiety|depress(ed|ing|ion)?|stress(ed|ful)?|worried|worry|upset|angry|mad|frustrat(ed|ing)|cry(ing)?|sob(bing)?|lonely|alone|hopeless|worthless|useless|stuck|overwhelm(ed|ing)?|panic(king)?|exhaust(ed|ion)|burn(ed)?\s*out|can't|cannot|won't|never\s+works?|give\s+up|quit(ting)?|miserable|sad(ness)?|grief|guilt(y)?|ashamed|embarrass(ed|ing)?|regret|disappoint(ed|ing)?|struggl(e|ing)|rough\s+day|hard\s+day|tough\s+day)\b/i,
  /\b(didn't|don't|doesn't|wasn't|weren't|isn't|aren't|couldn't|wouldn't|shouldn't)\s+\w+/i,
];

export function looksNegative(text: string): boolean {
  const trimmed = text.trim();
  if (trimmed.length < 8) return false;
  return NEGATIVE_PATTERNS.some((pattern) => pattern.test(trimmed));
}
