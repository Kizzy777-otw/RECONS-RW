import "server-only";

import { createClient } from "@supabase/supabase-js";

type FarmerRow = {
  id: string;
  name: string;
  phone: string;
  location: string;
  joined_at: string | null;
  source: string;
  external_id: string | null;
  created_at: string;
  updated_at: string;
};

type ContractRow = {
  id: string;
  contract_number: string;
  farmer_id: string;
  model: string;
  signed_at: string | null;
  source: string;
  external_id: string | null;
  created_at: string;
  updated_at: string;
};

type IssueRow = {
  id: string;
  farmer_id: string | null;
  phone: string;
  message: string;
  received_at: string;
  status: "New" | "In progress" | "Resolved";
  source: string;
  external_id: string | null;
  created_at: string;
  updated_at: string;
};

type ContractNoteRow = {
  id: string;
  contract_number: string;
  text: string;
  author: string;
  created_at: string;
};

type Table<Row> = {
  Row: Row;
  Insert: Partial<Row>;
  Update: Partial<Row>;
  Relationships: [];
};

type AdminDatabase = {
  public: {
    Tables: {
      farmers: Table<FarmerRow>;
      contracts: Table<ContractRow>;
      issues: Table<IssueRow>;
      contract_notes: Table<ContractNoteRow>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export function getAdminDatabase() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to connect the admin database.");
  }

  return createClient<AdminDatabase>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}
