import { CreditCard, Check, ArrowRight, Zap, Crown, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TIER_CONFIG } from '../types';
import type { Tier } from '../types';

interface TierOption {
  tier: Tier;
  icon: typeof Zap;
  monthlyPrice: number;
  features: string[];
  highlighted?: boolean;
}

const tierOptions: TierOption[] = [
  {
    tier: 'starter',
    icon: Zap,
    monthlyPrice: 633,
    features: [
      'Bronze health plan (National PPO)',
      '$250/mo Solo 401(k) contributions',
      '$250K E&O liability coverage',
      'Quarterly tax filing',
      'Expense categorization',
    ],
  },
  {
    tier: 'professional',
    icon: Crown,
    monthlyPrice: 1123,
    highlighted: true,
    features: [
      'Silver health plan + dental',
      '$500/mo Solo 401(k) + profit-sharing',
      '$1M E&O coverage + claims assistance',
      'Quarterly filing + deduction optimization',
      '1:1 tax advisor access',
    ],
  },
  {
    tier: 'premium',
    icon: Sparkles,
    monthlyPrice: 1910,
    features: [
      'Gold health plan + dental + vision',
      '$1,000/mo Solo 401(k) + profit-sharing',
      '$2M E&O coverage + contract review',
      'Full tax support + audit protection',
      'Dedicated financial advisor',
    ],
  },
];

const tierRingColors: Record<Tier, string> = {
  starter: 'ring-emerald-500',
  professional: 'ring-blue-500',
  premium: 'ring-violet-500',
};

const tierBgGradients: Record<Tier, string> = {
  starter: 'from-emerald-500 to-green-500',
  professional: 'from-blue-500 to-cyan-500',
  premium: 'from-violet-500 to-purple-500',
};

const tierBadgeBg: Record<Tier, string> = {
  starter: 'bg-emerald-100 text-emerald-700',
  professional: 'bg-blue-100 text-blue-700',
  premium: 'bg-violet-100 text-violet-700',
};

export default function Subscription() {
  const { profile, benefits, upgradeTier } = useApp();

  if (!profile || !benefits) return null;

  const currentTierConfig = TIER_CONFIG[profile.tier];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Subscription & Plans</h1>
        </div>
        <p className="text-gray-500 ml-13">
          One payment, complete coverage. Upgrade anytime as your freelance income grows.
        </p>
      </div>

      {/* Current plan summary */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500 font-medium">Current plan</p>
            <h2 className="text-xl font-bold text-gray-900 mt-0.5">
              {currentTierConfig.label}
              <span className="text-gray-400 font-normal text-base ml-2">
                ${benefits.monthlyTotal.toLocaleString()}/month
              </span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">{currentTierConfig.description}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Next billing date</p>
            <p className="text-sm font-semibold text-gray-900">March 1, 2026</p>
          </div>
        </div>

        {/* Cost breakdown */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Monthly breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Health Insurance ({benefits.health.coverageLevel})</span>
              <span className="font-medium text-gray-900">${benefits.health.monthlyPremium}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Solo 401(k) contribution</span>
              <span className="font-medium text-gray-900">
                ${benefits.retirement.monthlyContribution}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">E&O Liability coverage</span>
              <span className="font-medium text-gray-900">${benefits.liability.monthlyPremium}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tax filing support</span>
              <span className="font-medium text-gray-900">
                ${benefits.monthlyTotal - benefits.health.monthlyPremium - benefits.retirement.monthlyContribution - benefits.liability.monthlyPremium}
              </span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-bold text-gray-900">
                ${benefits.monthlyTotal.toLocaleString()}/mo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Plan comparison */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          {profile.tier === 'premium' ? 'Your plan' : 'Choose your plan'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tierOptions.map((option) => {
            const isCurrentTier = option.tier === profile.tier;
            const config = TIER_CONFIG[option.tier];
            const Icon = option.icon;

            return (
              <div
                key={option.tier}
                className={`bg-white rounded-2xl border-2 p-6 relative transition-shadow ${
                  isCurrentTier
                    ? `${tierRingColors[option.tier]} ring-2 border-transparent shadow-md`
                    : 'border-gray-200 hover:shadow-md'
                }`}
              >
                {option.highlighted && !isCurrentTier && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most popular
                  </span>
                )}
                {isCurrentTier && (
                  <span
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1 rounded-full ${tierBadgeBg[option.tier]}`}
                  >
                    Current plan
                  </span>
                )}

                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tierBgGradients[option.tier]} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-bold text-gray-900">{config.label}</h3>
                <p className="text-sm text-gray-500 mt-1">{config.description}</p>

                <div className="mt-4">
                  <span className="text-3xl font-bold text-gray-900">
                    ${option.monthlyPrice.toLocaleString()}
                  </span>
                  <span className="text-gray-400 text-sm">/month</span>
                </div>

                <ul className="mt-6 space-y-3">
                  {option.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => upgradeTier(option.tier)}
                  disabled={isCurrentTier}
                  className={`w-full mt-6 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    isCurrentTier
                      ? 'bg-gray-100 text-gray-400 cursor-default'
                      : `bg-gradient-to-r ${tierBgGradients[option.tier]} text-white hover:opacity-90`
                  }`}
                >
                  {isCurrentTier ? (
                    'Current plan'
                  ) : (
                    <>
                      {tierOptions.indexOf(option) > tierOptions.findIndex((t) => t.tier === profile.tier)
                        ? 'Upgrade'
                        : 'Switch'}{' '}
                      to {config.label}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment method */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-3">Payment method</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-gray-600">
              VISA
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">**** **** **** 4242</p>
              <p className="text-xs text-gray-500">Expires 12/27</p>
            </div>
          </div>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
