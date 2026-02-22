import { Shield, CheckCircle2, XCircle, FileText, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TIER_CONFIG, WORK_TYPE_LABELS } from '../types';

export default function Liability() {
  const { profile, benefits } = useApp();

  if (!profile || !benefits) return null;

  const coverage = benefits.liability;
  const tierConfig = TIER_CONFIG[profile.tier];

  const coverageFormatted =
    coverage.coverageAmount >= 1000000
      ? `$${coverage.coverageAmount / 1000000}M`
      : `$${(coverage.coverageAmount / 1000).toFixed(0)}K`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <Shield className="w-5 h-5 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">E&O Liability Coverage</h1>
        </div>
        <p className="text-gray-500 ml-13">
          Errors & Omissions insurance tailored for{' '}
          {WORK_TYPE_LABELS[profile.workType].toLowerCase()} professionals.
        </p>
      </div>

      {/* Coverage Card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Errors & Omissions</p>
              <h2 className="text-xl font-bold text-white mt-0.5">
                {coverageFormatted} Coverage
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
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Coverage Limit</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{coverageFormatted}</p>
              <p className="text-xs text-gray-400 mt-0.5">Per occurrence</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Monthly Premium</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">${coverage.monthlyPremium}</p>
              <p className="text-xs text-green-600 mt-0.5">Group rate applied</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Deductible</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ${coverage.deductible.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Per claim</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Status</p>
              <div className="flex items-center gap-1.5 mt-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm font-semibold text-green-600">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coverage details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">What's covered</h3>
          <ul className="space-y-3">
            {[
              'Professional negligence claims',
              'Missed deadlines or deliverables',
              'Copyright infringement allegations',
              'Data loss or breach claims',
              'Client financial loss from your work',
              'Defense costs & legal fees',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Additional features</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-sm">
              {coverage.claimsIncluded ? (
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-gray-300 shrink-0" />
              )}
              <span className={coverage.claimsIncluded ? 'text-gray-700' : 'text-gray-400'}>
                Claims assistance & management
              </span>
              {!coverage.claimsIncluded && (
                <span className="text-xs text-indigo-600 font-medium ml-auto">Upgrade</span>
              )}
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              Certificate of Insurance on demand
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              Client-required coverage letters
            </li>
            {profile.tier === 'premium' && (
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                Contract review by legal team
              </li>
            )}
          </ul>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Industry-specific coverage</h4>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Tailored for {WORK_TYPE_LABELS[profile.workType]}
                </p>
                <p className="text-xs text-gray-500">Coverage terms adjusted for your profession</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk alert */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-800">Why E&O matters</h3>
            <p className="text-sm text-amber-700 mt-1">
              1 in 3 freelancers will face a professional liability claim during their career. Without
              E&O coverage, a single lawsuit could cost you $50,000-$150,000 in legal fees alone, even
              if you're not at fault.
            </p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-3">Quick actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors">
            Download Certificate of Insurance
            <ArrowUpRight className="w-4 h-4 text-gray-400" />
          </button>
          <button className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors">
            File a claim
            <ArrowUpRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
