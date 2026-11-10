import "server-only";

import { getAdminDatabase } from "@/lib/adminDatabase";
import type { AdminContract, AdminContractNote, Farmer, Issue, IssueStatus } from "@/types";

export async function getAdminData(): Promise<{
  farmers: Farmer[];
  issues: Issue[];
  contracts: AdminContract[];
  notes: AdminContractNote[];
}> {
  const database = getAdminDatabase();
  const [farmersResult, contractsResult, issuesResult, notesResult] = await Promise.all([
    database.from("farmers").select("*").order("name"),
    database.from("contracts").select("*").order("signed_at", { ascending: false }),
    database.from("issues").select("*").order("received_at", { ascending: false }),
    database.from("contract_notes").select("*").order("created_at", { ascending: false }),
  ]);
  const error =
    farmersResult.error ??
    contractsResult.error ??
    issuesResult.error ??
    notesResult.error;
  if (error) throw new Error(`Could not load admin records: ${error.message}`);

  const contractRows = contractsResult.data ?? [];
  const contracts: AdminContract[] = contractRows.map((contract) => ({
    id: contract.id,
    contractNumber: contract.contract_number,
    farmerId: contract.farmer_id,
    model: contract.model,
    signedAt: contract.signed_at ?? "",
  }));
  const contractsByFarmer = new Map<string, AdminContract[]>();
  for (const contract of contracts) {
    const farmerContracts = contractsByFarmer.get(contract.farmerId) ?? [];
    farmerContracts.push(contract);
    contractsByFarmer.set(contract.farmerId, farmerContracts);
  }

  return {
    farmers: (farmersResult.data ?? []).map((farmer) => {
      const contract = contractsByFarmer.get(farmer.id)?.[0];
      return {
        id: farmer.id,
        name: farmer.name,
        phone: farmer.phone,
        location: farmer.location,
        joinedAt: farmer.joined_at ?? "",
        contractNumber: contract?.contractNumber ?? "",
        model: contract?.model ?? "",
      };
    }),
    issues: (issuesResult.data ?? []).map((issue) => ({
      id: issue.id,
      farmerId: issue.farmer_id,
      phone: issue.phone,
      message: issue.message,
      receivedAt: issue.received_at,
      status: issue.status,
    })),
    contracts,
    notes: (notesResult.data ?? []).map((note) => ({
      id: note.id,
      contractNumber: note.contract_number,
      text: note.text,
      createdAt: note.created_at,
      author: note.author,
    })),
  };
}

export async function updateIssueStatus(issueId: string, status: IssueStatus): Promise<void> {
  const { data, error } = await getAdminDatabase()
    .from("issues")
    .update({ status })
    .eq("id", issueId)
    .select("id")
    .maybeSingle();
  if (error) throw new Error(`Could not update issue status: ${error.message}`);
  if (!data) throw new Error("The requested issue does not exist.");
}

export async function addContractNote(
  contractNumber: string,
  text: string,
): Promise<AdminContractNote> {
  const { data, error } = await getAdminDatabase()
    .from("contract_notes")
    .insert({ contract_number: contractNumber, text, author: "RECONS Admin" })
    .select("*")
    .single();
  if (error) throw new Error(`Could not save contract note: ${error.message}`);
  return {
    id: data.id,
    contractNumber: data.contract_number,
    text: data.text,
    author: data.author,
    createdAt: data.created_at,
  };
}

export async function saveIncomingSms(
  phone: string,
  message: string,
  externalId?: string,
): Promise<void> {
  const database = getAdminDatabase();
  const farmerResult = await database
    .from("farmers")
    .select("id")
    .eq("phone", phone)
    .limit(2);
  if (farmerResult.error) throw new Error(`Could not find SMS sender: ${farmerResult.error.message}`);
  const matchingFarmers = farmerResult.data ?? [];
  const farmerId = matchingFarmers.length === 1 ? matchingFarmers[0].id : null;

  const { error } = await database.from("issues").upsert(
    {
      farmer_id: farmerId,
      phone,
      message,
      source: "sms",
      external_id: externalId ?? null,
    },
    { onConflict: "source,external_id", ignoreDuplicates: true },
  );
  if (error) throw new Error(`Could not save incoming SMS: ${error.message}`);
}
