import type { ContractNote, Farmer } from "@/types";

/**
 * Integration seam for the Google Sheets service-account adapter.
 * Keep credentials on the server; never expose them through NEXT_PUBLIC_* variables.
 * Throwing makes the missing integration visible instead of returning fake success.
 */
export async function getFarmersFromSheet(): Promise<Farmer[]> {
  throw new Error(
    "Google Sheets is not configured. Add a server-side service account adapter before enabling this operation.",
  );
}

export async function updateContractNoteInSheet(
  _contractNumber: string,
  _note: ContractNote,
): Promise<void> {
  throw new Error(
    "Google Sheets is not configured. Add a server-side service account adapter before enabling this operation.",
  );
}
