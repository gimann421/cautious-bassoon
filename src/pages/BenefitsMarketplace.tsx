import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  PiggyBank,
  Shield,
  Eye,
  Smile,
  Umbrella,
  Users,
  CheckCircle2,
  ArrowRight,
  Star,
  BadgeCheck,
  Zap,
  Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TIER_CONFIG } from '../types';

type BenefitCategory = 'all' | 'health' | 'financial' | 'protection';

interface MarketplacePlan {
  id: string;
  name: string;
  category: BenefitCategory;
  icon: typeof Heart;
  iconColor: string;
  iconBg: string;
  tagline: string;
  description: string;
  startingPrice: number;
  priceUnit: string;
  features: string[];
  popular?: boolean;
  recommended?: boolean;
  alreadyEnrolled?: boolean;
  enrollLink: string;
}

export default function BenefitsMarketplace() {
  const { profile, benefits } = useApp();
  const [activeCategory, setActiveCategory] = useState<BenefitCategory>('all');

  if (!profile || !benefits) return null;

  const categories: { key: BenefitCategory; label: string }[] = [
    { key: 'all', label: 'All Benefits' },
    { key: 'health', label: 'Health & Wellness' },
    { key: 'financial', label: 'Financial' },
    { key: 'protection', label: 'Protection' },
  ];

  const plans: MarketplacePlan[] = [
    {
      id: 'health-insurance',
      name: 'Health Insurance',
      category: 'health',
      icon: Heart,
      iconColor: 'text-rose-500',
      iconBg: 'bg-rose-50',
      tagline: 'Group-rate medical coverage',
      description:
        'Access comprehensive health plans at group rates negotiated for 76,000+ freelancers. Save 30-40% vs individual market rates.',
      startingPrice: 289,
      priceUnit: '/mo',
      features: [
        'Preventive care (100% covered)',
        'Primary & specialist visits',
        'Prescription drug coverage',
        'Mental health services',
        'Emergency & urgent care',
        'Nationwide PPO network',
      ],
      popular: true,
      alreadyEnrolled: profile.hasExistingHealth || true,
      enrollLink: '/health',
    },
    {
      id: 'dental',
      name: 'Dental Coverage',
      category: 'health',
      icon: Smile,
      iconColor: 'text-cyan-500',
      iconBg: 'bg-cyan-50',
      tagline: 'Preventive & restorative dental',
      description:
        'Keep your smile healthy with comprehensive dental coverage. Includes cleanings, fillings, crowns, and orthodontic options.',
      startingPrice: 35,
      priceUnit: '/mo',
      features: [
        '2 preventive cleanings/year',
        'X-rays & exams covered',
        'Fillings & root canals',
        'Crown & bridge work',
        'Orthodontic discount program',
        '80,000+ dentists in network',
      ],
      recommended: !benefits.health.includesDental,
      alreadyEnrolled: benefits.health.includesDental,
      enrollLink: '/subscription',
    },
    {
      id: 'vision',
      name: 'Vision Coverage',
      category: 'health',
      icon: Eye,
      iconColor: 'text-purple-500',
      iconBg: 'bg-purple-50',
      tagline: 'Eye exams, glasses & contacts',
      description:
        'Comprehensive vision coverage including annual exams, eyeglasses, contact lenses, and discounts on laser surgery.',
      startingPrice: 15,
      priceUnit: '/mo',
      features: [
        'Annual eye exam covered',
        'Eyeglass frames & lenses allowance',
        'Contact lens allowance',
        'Laser surgery discounts (15-20%)',
        'Blue light lens options',
        'Nationwide provider network',
      ],
      alreadyEnrolled: benefits.health.includesVision,
      enrollLink: '/subscription',
    },
    {
      id: 'retirement',
      name: 'Solo 401(k)',
      category: 'financial',
      icon: PiggyBank,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
      tagline: 'Tax-advantaged retirement savings',
      description:
        'Maximize your retirement savings with a Solo 401(k) designed for self-employed professionals. Up to $69,000/year in contributions.',
      startingPrice: 250,
      priceUnit: '/mo',
      features: [
        'Up to $69,000/year contributions',
        'Traditional & Roth options',
        'Profit-sharing contributions',
        'Auto-contribute feature',
        'Low-cost index fund options',
        'Loan provisions available',
      ],
      popular: true,
      alreadyEnrolled: profile.hasRetirementAccount || true,
      enrollLink: '/retirement',
    },
    {
      id: 'liability',
      name: 'E&O Liability Insurance',
      category: 'protection',
      icon: Shield,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      tagline: 'Professional liability protection',
      description:
        'Protect your freelance business from claims of negligence, errors, or omissions. Coverage tailored to your profession.',
      startingPrice: 45,
      priceUnit: '/mo',
      features: [
        'Up to $2M coverage available',
        'Claims assistance included',
        'Certificate of insurance',
        'Client contract review',
        'Industry-specific coverage',
        'No gaps in coverage',
      ],
      alreadyEnrolled: true,
      enrollLink: '/liability',
    },
    {
      id: 'disability',
      name: 'Disability Insurance',
      category: 'protection',
      icon: Umbrella,
      iconColor: 'text-teal-500',
      iconBg: 'bg-teal-50',
      tagline: 'Income protection if you can\'t work',
      description:
        'Replace up to 60% of your income if illness or injury keeps you from freelancing. Short-term and long-term options available.',
      startingPrice: 89,
      priceUnit: '/mo',
      features: [
        'Up to 60% income replacement',
        'Short-term (3-6 months) plans',
        'Long-term (2+ years) plans',
        '30-90 day waiting periods',
        'Own-occupation definition',
        'Portable — stays with you',
      ],
      recommended: true,
      alreadyEnrolled: false,
      enrollLink: '/subscription',
    },
    {
      id: 'life',
      name: 'Term Life Insurance',
      category: 'protection',
      icon: Users,
      iconColor: 'text-indigo-500',
      iconBg: 'bg-indigo-50',
      tagline: 'Protect your loved ones',
      description:
        'Affordable term life insurance to provide financial security for your family. Group rates available through FreelanceShield.',
      startingPrice: 25,
      priceUnit: '/mo',
      features: [
        '$250K - $1M coverage options',
        '10, 20, or 30-year terms',
        'No medical exam options',
        'Competitive group rates',
        'Convertible to permanent policy',
        'Accelerated death benefit',
      ],
      alreadyEnrolled: false,
      enrollLink: '/subscription',
    },
  ];

  const filteredPlans =
    activeCategory === 'all'
      ? plans
      : plans.filter((p) => p.category === activeCategory);

  const notEnrolledCount = plans.filter((p) => !p.alreadyEnrolled).length;
  const recommendedPlans = plans.filter((p) => p.recommended && !p.alreadyEnrolled);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Benefits Marketplace</h1>
        </div>
        <p className="text-gray-500 ml-13">
          Browse and add benefits to your freelancer coverage.{' '}
          {notEnrolledCount > 0 && (
            <span className="text-indigo-600 font-medium">
              {notEnrolledCount} benefit{notEnrolledCount !== 1 ? 's' : ''} available to add.
            </span>
          )}
        </p>
      </div>

      {/* Personalized recommendation banner */}
      {recommendedPlans.length > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Recommended for you</h3>
              <p className="text-sm text-gray-600 mt-0.5">
                Based on your profile, we recommend adding{' '}
                <span className="font-medium">
                  {recommendedPlans.map((p) => p.name).join(' and ')}
                </span>{' '}
                to your benefits stack.
              </p>
              {!profile.hasExistingHealth && (
                <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-700">
                  <Info className="w-3.5 h-3.5" />
                  <span>
                    You indicated you don't currently have health insurance — we strongly
                    recommend enrolling in a health plan.
                  </span>
                </div>
              )}
              {!profile.hasRetirementAccount && (
                <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-700">
                  <Info className="w-3.5 h-3.5" />
                  <span>
                    You indicated you don't have a retirement account — start saving
                    early for maximum growth.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat.key
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Plans grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-xl border p-5 relative ${
              plan.alreadyEnrolled
                ? 'border-green-200 bg-green-50/30'
                : plan.recommended
                ? 'border-amber-300 shadow-sm'
                : 'border-gray-200'
            }`}
          >
            {/* Badges */}
            <div className="absolute top-4 right-4 flex gap-1.5">
              {plan.alreadyEnrolled && (
                <span className="flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                  <BadgeCheck className="w-3 h-3" />
                  Enrolled
                </span>
              )}
              {plan.popular && !plan.alreadyEnrolled && (
                <span className="flex items-center gap-1 text-xs font-medium text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                  <Star className="w-3 h-3" />
                  Popular
                </span>
              )}
              {plan.recommended && !plan.alreadyEnrolled && (
                <span className="flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  <Zap className="w-3 h-3" />
                  Recommended
                </span>
              )}
            </div>

            {/* Plan header */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-lg ${plan.iconBg} flex items-center justify-center`}
              >
                <plan.icon className={`w-5 h-5 ${plan.iconColor}`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                <p className="text-xs text-gray-500">{plan.tagline}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4">{plan.description}</p>

            {/* Features */}
            <ul className="space-y-1.5 mb-4">
              {plan.features.slice(0, 4).map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-xs text-gray-600"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Price & action */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <span className="text-xs text-gray-500">Starting at</span>
                <p className="text-lg font-bold text-gray-900">
                  ${plan.startingPrice}
                  <span className="text-sm font-normal text-gray-400">
                    {plan.priceUnit}
                  </span>
                </p>
              </div>
              {plan.alreadyEnrolled ? (
                <Link
                  to={plan.enrollLink}
                  className="flex items-center gap-1.5 text-sm font-medium text-green-700 hover:text-green-800"
                >
                  View plan
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <Link
                  to={plan.enrollLink}
                  className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Enroll now
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Group savings info */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Better rates through collective bargaining
              </h3>
              <p className="text-sm text-gray-500">
                As a {TIER_CONFIG[profile.tier].label} member, you're part of 76,000+
                freelancers pooling purchasing power. The more benefits you bundle, the
                more you save.
              </p>
            </div>
          </div>
          <Link
            to="/subscription"
            className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 shrink-0"
          >
            Compare tier plans
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
