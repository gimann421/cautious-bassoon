import { Heart, CheckCircle2, XCircle, ArrowUpRight, Users, Building2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TIER_CONFIG } from '../types';

export default function HealthInsurance() {
  const { profile, benefits } = useApp();

  if (!profile || !benefits) return null;

  const plan = benefits.health;
  const tierConfig = TIER_CONFIG[profile.tier];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center">
            <Heart className="w-5 h-5 text-rose-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Health Insurance</h1>
        </div>
        <p className="text-gray-500 ml-13">
          Group-rate health coverage negotiated for FreelanceShield members.
        </p>
      </div>

      {/* Current Plan Card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-rose-100 text-sm font-medium">Your current plan</p>
              <h2 className="text-xl font-bold text-white mt-0.5">{plan.name}</h2>
            </div>
            <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {tierConfig.label} Tier
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Monthly Premium</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">${plan.monthlyPremium}</p>
              <p className="text-xs text-green-600 mt-0.5">~35% below market rate</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Deductible</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">${plan.deductible.toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-0.5">Annual</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Coverage</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{plan.coverageLevel}</p>
              <p className="text-xs text-gray-400 mt-0.5">ACA Metal tier</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Network</p>
              <p className="text-lg font-bold text-gray-900 mt-1">{plan.network}</p>
              <p className="text-xs text-gray-400 mt-0.5">450,000+ providers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Coverage details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">What's included</h3>
          <ul className="space-y-3">
            {[
              'Preventive care (100% covered)',
              'Primary care visits',
              'Specialist visits',
              'Emergency room',
              'Prescription drugs',
              'Mental health services',
              'Lab work & imaging',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Add-on coverage</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-sm text-gray-700">
              {plan.includesDental ? (
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-gray-300 shrink-0" />
              )}
              <span className={plan.includesDental ? '' : 'text-gray-400'}>
                Dental coverage
              </span>
              {!plan.includesDental && (
                <span className="text-xs text-indigo-600 font-medium ml-auto">
                  Upgrade to unlock
                </span>
              )}
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700">
              {plan.includesVision ? (
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-gray-300 shrink-0" />
              )}
              <span className={plan.includesVision ? '' : 'text-gray-400'}>
                Vision coverage
              </span>
              {!plan.includesVision && (
                <span className="text-xs text-indigo-600 font-medium ml-auto">
                  Upgrade to unlock
                </span>
              )}
            </li>
          </ul>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Group purchasing power</h4>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">76,000+ members</p>
                <p className="text-xs text-gray-500">Negotiating better rates together</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Provider info */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Network provider</h3>
              <p className="text-sm text-gray-500">{plan.network} - nationwide coverage</p>
            </div>
          </div>
          <button className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            Find a doctor
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
