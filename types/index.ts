export interface Farmer {
  id: string;
  name: string;
  phone: string;
  contractNumber: string;
  model: string;
  location: string;
  joinedAt: string;
}

export type IssueStatus = "New" | "In progress" | "Resolved";

export interface Issue {
  id: string;
  farmerId: string;
  phone: string;
  message: string;
  receivedAt: string;
  status: IssueStatus;
}

export interface Contract {
  contractNumber: string;
  farmerId: string;
  model: string;
  signedAt: string;
  notes: ContractNote[];
}

export interface ContractNote {
  id: string;
  text: string;
  createdAt: string;
  author: string;
}

export interface Service {
  title: string;
  shortName?: string;
  description: string;
  icon: string;
  number: string;
}
