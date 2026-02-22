import { createContext, useContext, useState, type ReactNode } from 'react';
import type { UserProfile, BenefitsStack, Tier, IncomeRange, WorkType } from '../types';

function getTierForIncome(income: IncomeRange): Tier {
  switch (income) {
    case 'under-30k':
    case '30k-60k':
      return 'starter';
    case '60k-100k':
    case '100k-150k':
      return 'professional';
    case '150k-250k':
    case 'over-250k':
      return 'premium';
  }
}

function buildBenefitsStack(profile: UserProfile): BenefitsStack {
  const tier = profile.tier;

  const healthPlans: Record<Tier, () => BenefitsStack['health']> = {
    starter: () => ({
      name: 'FreelanceShield Bronze',
      monthlyPremium: 289,
      deductible: 6000,
      coverageLevel: 'Bronze',
      network: 'National PPO',
      includesDental: false,
      includesVision: false,
    }),
    professional: () => ({
      name: 'FreelanceShield Silver',
      monthlyPremium: 445,
      deductible: 3000,
      coverageLevel: 'Silver',
      network: 'National PPO+',
      includesDental: true,
      includesVision: false,
    }),
    premium: () => ({
      name: 'FreelanceShield Gold',
      monthlyPremium: 612,
      deductible: 1500,
      coverageLevel: 'Gold',
      network: 'Premier National PPO',
      includesDental: true,
      includesVision: true,
    }),
  };

  const retirementContributions: Record<Tier, number> = {
    starter: 250,
    professional: 500,
    premium: 1000,
  };

  const liabilityAmounts: Record<Tier, { coverage: number; premium: number; deductible: number }> = {
    starter: { coverage: 250000, premium: 45, deductible: 2500 },
    professional: { coverage: 1000000, premium: 89, deductible: 1000 },
    premium: { coverage: 2000000, premium: 149, deductible: 500 },
  };

  const health = healthPlans[tier]();
  const retirementMonthly = retirementContributions[tier];
  const liability = liabilityAmounts[tier];

  const taxPremium = tier === 'starter' ? 49 : tier === 'professional' ? 89 : 149;

  return {
    health,
    retirement: {
      type: 'solo-401k',
      monthlyContribution: retirementMonthly,
      annualLimit: 69000,
      currentBalance: 0,
      employerMatch: tier !== 'starter',
      autoContribute: true,
    },
    liability: {
      type: 'errors-omissions',
      coverageAmount: liability.coverage,
      monthlyPremium: liability.premium,
      deductible: liability.deductible,
      claimsIncluded: tier !== 'starter',
    },
    tax: {
      quarterlyFiling: true,
      nextDeadline: '2026-04-15',
      estimatedTax: 0,
      deductionsFound: 0,
      advisorAccess: tier !== 'starter',
    },
    monthlyTotal: health.monthlyPremium + retirementMonthly + liability.premium + taxPremium,
  };
}

interface AppState {
  profile: UserProfile | null;
  benefits: BenefitsStack | null;
  onboardingComplete: boolean;
  completeOnboarding: (data: {
    name: string;
    email: string;
    workType: WorkType;
    incomeRange: IncomeRange;
    yearsFreelancing: number;
    hasExistingHealth: boolean;
    hasRetirementAccount: boolean;
  }) => void;
  upgradeTier: (tier: Tier) => void;
  updateRetirementContribution: (amount: number) => void;
  toggleAutoContribute: () => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [benefits, setBenefits] = useState<BenefitsStack | null>(null);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  function completeOnboarding(data: {
    name: string;
    email: string;
    workType: WorkType;
    incomeRange: IncomeRange;
    yearsFreelancing: number;
    hasExistingHealth: boolean;
    hasRetirementAccount: boolean;
  }) {
    const tier = getTierForIncome(data.incomeRange);
    const newProfile: UserProfile = { ...data, tier };
    setProfile(newProfile);
    setBenefits(buildBenefitsStack(newProfile));
    setOnboardingComplete(true);
  }

  function upgradeTier(tier: Tier) {
    if (!profile) return;
    const updated = { ...profile, tier };
    setProfile(updated);
    setBenefits(buildBenefitsStack(updated));
  }

  function updateRetirementContribution(amount: number) {
    setBenefits((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        retirement: { ...prev.retirement, monthlyContribution: amount },
        monthlyTotal: prev.monthlyTotal - prev.retirement.monthlyContribution + amount,
      };
    });
  }

  function toggleAutoContribute() {
    setBenefits((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        retirement: { ...prev.retirement, autoContribute: !prev.retirement.autoContribute },
      };
    });
  }

  return (
    <AppContext.Provider
      value={{
        profile,
        benefits,
        onboardingComplete,
        completeOnboarding,
        upgradeTier,
        updateRetirementContribution,
        toggleAutoContribute,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
