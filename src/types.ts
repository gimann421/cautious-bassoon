export type WorkType =
  | 'software-dev'
  | 'design'
  | 'consulting'
  | 'writing'
  | 'marketing'
  | 'photography'
  | 'finance'
  | 'legal'
  | 'other';

export type IncomeRange =
  | 'under-30k'
  | '30k-60k'
  | '60k-100k'
  | '100k-150k'
  | '150k-250k'
  | 'over-250k';

export type Tier = 'starter' | 'professional' | 'premium';

export interface UserProfile {
  name: string;
  email: string;
  workType: WorkType;
  incomeRange: IncomeRange;
  yearsFreelancing: number;
  hasExistingHealth: boolean;
  hasRetirementAccount: boolean;
  tier: Tier;
}

export interface HealthPlan {
  name: string;
  monthlyPremium: number;
  deductible: number;
  coverageLevel: string;
  network: string;
  includesDental: boolean;
  includesVision: boolean;
}

export interface RetirementPlan {
  type: 'solo-401k';
  monthlyContribution: number;
  annualLimit: number;
  currentBalance: number;
  employerMatch: boolean;
  autoContribute: boolean;
}

export interface LiabilityCoverage {
  type: 'errors-omissions';
  coverageAmount: number;
  monthlyPremium: number;
  deductible: number;
  claimsIncluded: boolean;
}

export interface TaxSupport {
  quarterlyFiling: boolean;
  nextDeadline: string;
  estimatedTax: number;
  deductionsFound: number;
  advisorAccess: boolean;
}

export interface BenefitsStack {
  health: HealthPlan;
  retirement: RetirementPlan;
  liability: LiabilityCoverage;
  tax: TaxSupport;
  monthlyTotal: number;
}

export const WORK_TYPE_LABELS: Record<WorkType, string> = {
  'software-dev': 'Software Development',
  'design': 'Design & Creative',
  'consulting': 'Consulting',
  'writing': 'Writing & Content',
  'marketing': 'Marketing',
  'photography': 'Photography & Video',
  'finance': 'Finance & Accounting',
  'legal': 'Legal Services',
  'other': 'Other',
};

export const INCOME_LABELS: Record<IncomeRange, string> = {
  'under-30k': 'Under $30,000',
  '30k-60k': '$30,000 - $60,000',
  '60k-100k': '$60,000 - $100,000',
  '100k-150k': '$100,000 - $150,000',
  '150k-250k': '$150,000 - $250,000',
  'over-250k': '$250,000+',
};

export const TIER_CONFIG: Record<Tier, { label: string; color: string; description: string }> = {
  starter: {
    label: 'Starter',
    color: 'emerald',
    description: 'Essential coverage for freelancers just getting started',
  },
  professional: {
    label: 'Professional',
    color: 'blue',
    description: 'Comprehensive benefits for established freelancers',
  },
  premium: {
    label: 'Premium',
    color: 'violet',
    description: 'Full-service benefits with dedicated advisory support',
  },
};
