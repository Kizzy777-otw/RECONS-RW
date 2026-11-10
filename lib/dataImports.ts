import "server-only";

import { getAdminDatabase } from "@/lib/adminDatabase";

export type ImportSource = "salesforce" | "google_forms";

export interface ImportedFarmer {
  externalId: string;
  name: string;
  phone?: string;
  location?: string;
  joinedAt?: string;
}

export interface ImportedContract {
  externalId: string;
  contractNumber: string;
  farmerExternalId: string;
  model?: string;
  signedAt?: string;
}

export interface ImportedIssue {
  externalId: string;
  message: string;
  phone?: string;
  farmerExternalId?: string;
  receivedAt?: string;
}

const MAX_IMPORT_BATCH_SIZE = 500;

function validateBatch<T extends { externalId: string }>(records: T[], name: string): void {
  if (records.length > MAX_IMPORT_BATCH_SIZE) {
    throw new Error(`${name} import batches cannot exceed ${MAX_IMPORT_BATCH_SIZE} records.`);
  }
  const externalIds = new Set<string>();
  for (const record of records) {
    const externalId = record.externalId.trim();
    if (!externalId || externalId.length > 255) {
      throw new Error(`Every ${name} record must have a 1 to 255 character external ID.`);
    }
    if (externalIds.has(externalId)) {
      throw new Error(`The ${name} batch contains the same external ID more than once.`);
    }
    externalIds.add(externalId);
  }
}

export async function upsertImportedFarmers(
  source: ImportSource,
  records: ImportedFarmer[],
): Promise<void> {
  validateBatch(records, "farmer");
  if (!records.length) return;
  if (records.some((record) => !record.name.trim())) {
    throw new Error("Every imported farmer must have a name.");
  }

  const { error } = await getAdminDatabase()
    .from("farmers")
    .upsert(
      records.map((record) => ({
        source,
        external_id: record.externalId.trim(),
        name: record.name.trim(),
        phone: record.phone?.trim() ?? "",
        location: record.location?.trim() ?? "",
        joined_at: record.joinedAt || null,
      })),
      { onConflict: "source,external_id" },
    );
  if (error) throw new Error(`Could not import farmers from ${source}: ${error.message}`);
}

export async function upsertImportedContracts(
  source: ImportSource,
  records: ImportedContract[],
): Promise<void> {
  validateBatch(records, "contract");
  if (!records.length) return;
  if (records.some((record) => !record.contractNumber.trim() || !record.farmerExternalId.trim())) {
    throw new Error("Every imported contract must have a contract number and linked farmer ID.");
  }

  const database = getAdminDatabase();
  const farmerExternalIds = [...new Set(records.map((record) => record.farmerExternalId.trim()))];
  const farmerResult = await database
    .from("farmers")
    .select("id,external_id")
    .eq("source", source)
    .in("external_id", farmerExternalIds);
  if (farmerResult.error) {
    throw new Error(`Could not match imported contracts to farmers: ${farmerResult.error.message}`);
  }

  const farmerIds = new Map(
    (farmerResult.data ?? []).map((farmer) => [farmer.external_id, farmer.id]),
  );
  const missingFarmer = farmerExternalIds.find((externalId) => !farmerIds.has(externalId));
  if (missingFarmer) {
    throw new Error(`Import the linked farmer before contract ${missingFarmer}.`);
  }

  const contracts = records.map((record) => {
    const farmerId = farmerIds.get(record.farmerExternalId.trim());
    if (!farmerId) throw new Error("An imported contract could not be linked to its farmer.");
    return {
      source,
      external_id: record.externalId.trim(),
      contract_number: record.contractNumber.trim(),
      farmer_id: farmerId,
      model: record.model?.trim() ?? "",
      signed_at: record.signedAt || null,
    };
  });
  const { error } = await database
    .from("contracts")
    .upsert(contracts, { onConflict: "source,external_id" });
  if (error) throw new Error(`Could not import contracts from ${source}: ${error.message}`);
}

export async function upsertImportedIssues(
  source: ImportSource,
  records: ImportedIssue[],
): Promise<void> {
  validateBatch(records, "issue");
  if (!records.length) return;
  if (records.some((record) => !record.message.trim())) {
    throw new Error("Every imported issue must have a message.");
  }

  const database = getAdminDatabase();
  const farmerExternalIds = [
    ...new Set(
      records
        .map((record) => record.farmerExternalId?.trim())
        .filter((externalId): externalId is string => Boolean(externalId)),
    ),
  ];
  const farmerIds = new Map<string, string>();
  if (farmerExternalIds.length) {
    const farmerResult = await database
      .from("farmers")
      .select("id,external_id")
      .eq("source", source)
      .in("external_id", farmerExternalIds);
    if (farmerResult.error) {
      throw new Error(`Could not match imported issues to farmers: ${farmerResult.error.message}`);
    }
    for (const farmer of farmerResult.data ?? []) {
      if (farmer.external_id) farmerIds.set(farmer.external_id, farmer.id);
    }
    const missingFarmer = farmerExternalIds.find((externalId) => !farmerIds.has(externalId));
    if (missingFarmer) {
      throw new Error(`Import the linked farmer before issue ${missingFarmer}.`);
    }
  }

  const { error } = await database.from("issues").upsert(
    records.map((record) => ({
      source,
      external_id: record.externalId.trim(),
      farmer_id: record.farmerExternalId
        ? farmerIds.get(record.farmerExternalId.trim()) ?? null
        : null,
      phone: record.phone?.trim() ?? "",
      message: record.message.trim(),
      received_at: record.receivedAt || new Date().toISOString(),
    })),
    { onConflict: "source,external_id" },
  );
  if (error) throw new Error(`Could not import issues from ${source}: ${error.message}`);
}
