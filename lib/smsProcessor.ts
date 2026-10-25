export interface NormalizedSms {
  from: string;
  text: string;
}

export function normalizeSmsPayload(payload: unknown): NormalizedSms {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new TypeError("SMS webhook payload must be a JSON object.");
  }

  // Accept common provider field names, then expose one stable shape to downstream code.
  const record = payload as Record<string, unknown>;
  const from = record.from ?? record.phoneNumber ?? record.phone;
  const text = record.text ?? record.message ?? record.body;

  if (typeof from !== "string" || typeof text !== "string") {
    throw new TypeError("SMS webhook payload must include a sender and message text.");
  }

  const normalizedFrom = from.trim();
  const normalizedText = text.trim();
  // Reject whitespace-only values so callers never treat an empty message as a ticket.
  if (!normalizedFrom || !normalizedText) {
    throw new TypeError("SMS sender and message text must not be empty.");
  }

  return { from: normalizedFrom, text: normalizedText };
}
