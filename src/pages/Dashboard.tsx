import { Link } from 'react-router-dom';
import {
  Heart,
  PiggyBank,
  Shield,
  Calculator,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TIER_CONFIG, INCOME_LABELS } from '../types';

const tierBorderColors: Record<string, string> = {
  starter: 'border-l-emerald-500',
  professional: 'border-l-blue-500',
  premium: 'border-l-violet-500',
};

const tierBgColors: Record<string, string> = {
  starter: 'bg-emerald-50',
  professional: 'bg-blue-50',
  premium: 'bg-violet-50',
};

const tierTextColors: Record<string, string> = {
  starter: 'text-emerald-700',
  professional: 'text-blue-700',
  premium: 'text-violet-700',
};

export default function Dashboard() {
  const { profile, benefits } = useApp();

  if (!profile || !benefits) return null;

  const tierConfig = TIER_CONFIG[profile.tier];

  const benefitCards = [
    {
      title: 'Health Insurance',
      icon: Heart,
      iconColor: 'text-rose-500',
      iconBg: 'bg-rose-50',
      link: '/health',
      value: `$${benefits.health.monthlyPremium}/mo`,
      detail: `${benefits.health.coverageLevel} plan - ${benefits.health.network}`,
      status: 'active' as const,
    },
    {
      title: 'Solo 401(k)',
      icon: PiggyBank,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
      link: '/retirement',
      value: `$${benefits.retirement.monthlyContribution}/mo`,
      detail: benefits.retirement.autoContribute
        ? 'Auto-contributions enabled'
        : 'Manual contributions',
      status: 'active' as const,
    },
    {
      title: 'E&O Liability',
      icon: Shield,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      link: '/liability',
      value: `$${(benefits.liability.coverageAmount / 1000000).toFixed(benefits.liability.coverageAmount >= 1000000 ? 0 : 1)}M`,
      detail: `Coverage - $${benefits.liability.monthlyPremium}/mo`,
      status: 'active' as const,
    },
    {
      title: 'Tax Support',
      icon: Calculator,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-50',
      link: '/tax',
      value: `Q1 2026`,
      detail: `Next filing: ${benefits.tax.nextDeadline}`,
      status: 'upcoming' as const,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {profile.name.split(' ')[0]}</h1>
          <p className="text-gray-500 mt-1">Here's your freelancer benefits overview.</p>
        </div>
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${tierBgColors[profile.tier]}`}
        >
          <TrendingUp className={`w-4 h-4 ${tierTextColors[profile.tier]}`} />
          <span className={`text-sm font-semibold ${tierTextColors[profile.tier]}`}>
            {tierConfig.label} Plan
          </span>
        </div>
      </div>

      {/* Monthly total banner */}
      <div
        className={`bg-white rounded-2xl border border-gray-200 border-l-4 ${tierBorderColors[profile.tier]} p-6`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500 font-medium">Your monthly benefits investment</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              ${benefits.monthlyTotal.toLocaleString()}
              <span className="text-base font-normal text-gray-400">/month</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Saving an estimated 30-40% vs individual market rates through group purchasing
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 text-right">
            <span className="text-sm text-gray-500">{INCOME_LABELS[profile.incomeRange]} income</span>
            <Link
              to="/subscription"
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
            >
              Manage subscription <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Benefits cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {benefitCards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-gray-300 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${card.iconBg} flex items-center justify-center`}>
                  <card.icon className={`w-5 h-5 ${card.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{card.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{card.detail}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors mt-1" />
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <span className="text-lg font-bold text-gray-900">{card.value}</span>
              <span
                className={`flex items-center gap-1 text-xs font-medium ${
                  card.status === 'active' ? 'text-green-600' : 'text-amber-600'
                }`}
              >
                {card.status === 'active' ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5" />
                )}
                {card.status === 'active' ? 'Active' : 'Upcoming'}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Benefits Marketplace CTA */}
      {(!profile.hasExistingHealth || !profile.hasRetirementAccount || !benefits.health.includesDental || !benefits.health.includesVision) && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">You may be missing key benefits</h3>
                <p className="text-sm text-gray-600 mt-0.5">
                  {!profile.hasExistingHealth
                    ? "You don't have health insurance yet — browse plans tailored for freelancers."
                    : !benefits.health.includesDental || !benefits.health.includesVision
                    ? 'Add dental, vision, disability, or life insurance to complete your coverage.'
                    : "Explore additional coverage like disability and life insurance to protect your income."}
                </p>
              </div>
            </div>
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 bg-amber-500 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-amber-600 transition-colors shrink-0"
            >
              Browse marketplace
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Quick actions / Tier upgrade prompt */}
      {profile.tier !== 'premium' && (
        <div className="bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg">Ready to level up your coverage?</h3>
              <p className="text-indigo-100 text-sm mt-1">
                {profile.tier === 'starter'
                  ? 'Upgrade to Professional for dental coverage, higher 401(k) contributions, and dedicated advisor access.'
                  : 'Upgrade to Premium for the full package: vision, $2M liability, and priority legal support.'}
              </p>
            </div>
            <Link
              to="/subscription"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-indigo-50 transition-colors shrink-0"
            >
              View upgrade options
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
