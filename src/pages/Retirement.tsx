import { PiggyBank, TrendingUp, Settings, ArrowUpRight, CheckCircle2, XCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TIER_CONFIG } from '../types';

export default function Retirement() {
  const { profile, benefits, updateRetirementContribution, toggleAutoContribute } = useApp();

  if (!profile || !benefits) return null;

  const plan = benefits.retirement;
  const tierConfig = TIER_CONFIG[profile.tier];
  const annualContribution = plan.monthlyContribution * 12;
  const percentOfLimit = Math.round((annualContribution / plan.annualLimit) * 100);

  const contributionOptions = [
    { label: '$250/mo', value: 250 },
    { label: '$500/mo', value: 500 },
    { label: '$750/mo', value: 750 },
    { label: '$1,000/mo', value: 1000 },
    { label: '$1,500/mo', value: 1500 },
    { label: '$2,000/mo', value: 2000 },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
            <PiggyBank className="w-5 h-5 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Solo 401(k) Retirement</h1>
        </div>
        <p className="text-gray-500 ml-13">
          Tax-advantaged retirement savings designed for self-employed professionals.
        </p>
      </div>

      {/* Overview Card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-sm font-medium">Solo 401(k)</p>
              <h2 className="text-xl font-bold text-white mt-0.5">
                ${plan.monthlyContribution.toLocaleString()}/month
              </h2>
            </div>
            <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {tierConfig.label} Tier
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Monthly</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ${plan.monthlyContribution.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Annual Total</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ${annualContribution.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">2026 Limit</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ${plan.annualLimit.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">% of Limit</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{percentOfLimit}%</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Annual contribution progress</span>
              <span>
                ${annualContribution.toLocaleString()} / ${plan.annualLimit.toLocaleString()}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all"
                style={{ width: `${Math.min(percentOfLimit, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contribution settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-4 h-4 text-gray-500" />
            <h3 className="font-semibold text-gray-900">Contribution amount</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {contributionOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateRetirementContribution(opt.value)}
                className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                  plan.monthlyContribution === opt.value
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Auto-contribute</p>
                <p className="text-xs text-gray-500">
                  Automatically deduct from linked bank account
                </p>
              </div>
              <button
                onClick={toggleAutoContribute}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  plan.autoContribute ? 'bg-amber-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    plan.autoContribute ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-3">
              <h4 className="text-sm font-medium text-gray-700">Plan features</h4>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-gray-700">Traditional & Roth options</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {plan.employerMatch ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-gray-300" />
                )}
                <span className={plan.employerMatch ? 'text-gray-700' : 'text-gray-400'}>
                  Profit-sharing contributions
                </span>
                {!plan.employerMatch && (
                  <span className="text-xs text-indigo-600 font-medium ml-auto">Upgrade to unlock</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-gray-700">Loan provisions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Growth projection */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Growth projection</h3>
              <p className="text-sm text-gray-500">
                At ${plan.monthlyContribution.toLocaleString()}/mo with 7% avg. annual returns
              </p>
            </div>
          </div>
          <button className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            Detailed projections
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
          <div className="text-center">
            <p className="text-xs text-gray-500">5 years</p>
            <p className="text-lg font-bold text-gray-900">
              ${Math.round(plan.monthlyContribution * 12 * 5 * 1.2).toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">10 years</p>
            <p className="text-lg font-bold text-gray-900">
              ${Math.round(plan.monthlyContribution * 12 * 10 * 1.5).toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">20 years</p>
            <p className="text-lg font-bold text-gray-900">
              ${Math.round(plan.monthlyContribution * 12 * 20 * 2.2).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
