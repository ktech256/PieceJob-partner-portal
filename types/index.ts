export interface PartnerStats {
  clicks: number;
  registrations: number;
  verifiedRegistrations: number;
  qualifiedUsers: number;
  customerSignups: number;
  providerSignups: number;
  businessSignups: number;
  completedJobs: number;
  conversionRate: number;
  lifetimeJobValue?: number;
  averageCommissionPerReferral?: number;
}

export interface PartnerBalance {
  pending: number;
  available: number;
  paid: number;
}

export interface PartnerEarnings {
    today: number;
    weekly: number;
    monthly: number;
    lifetime: number;
}

export interface PartnerData {
  id: string;
  name: string;
  referralCode: string;
  countryCode: string;
  status: string;
  stats: PartnerStats;
  balance: PartnerBalance;
  earnings?: PartnerEarnings;
  recentActivity?: any[];
}
