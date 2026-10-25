import type { Contract, Farmer, Issue } from "@/types";

// These fixtures drive the admin prototype until a persistent data source is connected.
export const farmers: Farmer[] = [
  {
    id: "farmer-001",
    name: "Aline Uwase",
    phone: "+250 788 123 456",
    contractNumber: "CTR-2026-8812",
    model: "HomeBiogas 7.0",
    location: "Nyagatare, Eastern Province",
    joinedAt: "2026-02-18",
  },
  {
    id: "farmer-002",
    name: "Jean de Dieu Nshimiyimana",
    phone: "+250 788 234 567",
    contractNumber: "CTR-2026-7745",
    model: "HomeBiogas 6.0",
    location: "Rwamagana, Eastern Province",
    joinedAt: "2026-01-29",
  },
  {
    id: "farmer-003",
    name: "Claudine Mukamana",
    phone: "+250 788 345 678",
    contractNumber: "CTR-2025-6201",
    model: "HomeBiogas 7.0",
    location: "Huye, Southern Province",
    joinedAt: "2025-11-09",
  },
  {
    id: "farmer-004",
    name: "Emmanuel Habimana",
    phone: "+250 788 456 789",
    contractNumber: "CTR-2026-9136",
    model: "HomeBiogas 6.0",
    location: "Musanze, Northern Province",
    joinedAt: "2026-03-11",
  },
];

export const issues: Issue[] = [
  {
    id: "SMS-1048",
    farmerId: "farmer-001",
    phone: "+250 788 123 456",
    message: "The pressure is low and the stove flame keeps going out...",
    receivedAt: "2026-04-14T09:24:00.000Z",
    status: "New",
  },
  {
    id: "SMS-1047",
    farmerId: "farmer-003",
    phone: "+250 788 345 678",
    message: "Please help, I can smell gas near the inlet pipe.",
    receivedAt: "2026-04-14T08:51:00.000Z",
    status: "In progress",
  },
  {
    id: "SMS-1046",
    farmerId: "farmer-002",
    phone: "+250 788 234 567",
    message: "Can someone explain how to clear the slurry outlet?",
    receivedAt: "2026-04-13T15:32:00.000Z",
    status: "Resolved",
  },
  {
    id: "SMS-1045",
    farmerId: "farmer-004",
    phone: "+250 788 456 789",
    message: "The biogas unit has not produced gas since yesterday.",
    receivedAt: "2026-04-13T12:10:00.000Z",
    status: "New",
  },
];

export const contracts: Contract[] = farmers.map((farmer) => ({
  contractNumber: farmer.contractNumber,
  farmerId: farmer.id,
  model: farmer.model,
  signedAt: farmer.joinedAt,
  notes: [],
}));
