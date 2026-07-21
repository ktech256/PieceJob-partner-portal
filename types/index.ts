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
  requested: number;
  processing: number;
  paid: number;
  lifetime: number;
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
  bankingDetails?: {
    bankName: string;
    accountHolder: string;
    accountNumber: string;
    branchCode: string;
    accountType: string;
    swiftCode?: string;
  };
  recentActivity?: any[];
  highlights?: {
    topReferral: {
        commission: number;
        jobs: number;
    } | null;
    latestReferral: {
        name: string;
        date: string;
    } | null;
    latestCommission: {
        amount: number;
        date: string;
    } | null;
  };
}
