export interface PartnerStats {
  clicks: number;
  registrations: number;
  qualifiedUsers: number;
  completedJobs: number;
}

export interface PartnerBalance {
  pending: number;
  available: number;
  paid: number;
}

export interface PartnerData {
  id: string;
  name: string;
  referralCode: string;
  countryCode: string;
  status: string;
  stats: PartnerStats;
  balance: PartnerBalance;
}
