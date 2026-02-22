import {
  Calculator,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  DollarSign,
  FileText,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TIER_CONFIG } from '../types';

const quarterlyDeadlines = [
  { quarter: 'Q1 2026', deadline: 'Apr 15, 2026', status: 'upcoming' as const },
  { quarter: 'Q2 2026', deadline: 'Jun 15, 2026', status: 'future' as const },
  { quarter: 'Q3 2026', deadline: 'Sep 15, 2026', status: 'future' as const },
  { quarter: 'Q4 2026', deadline: 'Jan 15, 2027', status: 'future' as const },
];

export default function TaxSupport() {
  const { profile, benefits } = useApp();

  if (!profile || !benefits) return null;

  const tax = benefits.tax;
  const tierConfig = TIER_CONFIG[profile.tier];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Tax Filing Support</h1>
        </div>
        <p className="text-gray-500 ml-13">
          Quarterly estimated tax filing and year-round deduction tracking.
        </p>
      </div>

      {/* Tax overview */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Tax support</p>
              <h2 className="text-xl font-bold text-white mt-0.5">Quarterly Filing + Advisory</h2>
            </div>
            <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {tierConfig.label} Tier
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Next Filing</p>
              <p className="text-lg font-bold text-gray-900 mt-1">{tax.nextDeadline}</p>
              <p className="text-xs text-amber-600 mt-0.5">52 days away</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Filing Frequency</p>
              <p className="text-lg font-bold text-gray-900 mt-1">Quarterly</p>
              <p className="text-xs text-gray-400 mt-0.5">4x per year</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Deductions Found</p>
              <p className="text-lg font-bold text-gray-900 mt-1">Scanning...</p>
              <p className="text-xs text-gray-400 mt-0.5">Link accounts to start</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Advisor</p>
              {tax.advisorAccess ? (
                <>
                  <p className="text-lg font-bold text-green-600 mt-1">Available</p>
                  <p className="text-xs text-gray-400 mt-0.5">Book a session</p>
                </>
              ) : (
                <>
                  <p className="text-lg font-bold text-gray-400 mt-1">Locked</p>
                  <p className="text-xs text-indigo-600 mt-0.5">Upgrade to unlock</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quarterly timeline + features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Timeline */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays className="w-4 h-4 text-gray-500" />
            <h3 className="font-semibold text-gray-900">2026 Filing schedule</h3>
          </div>
          <div className="space-y-4">
            {quarterlyDeadlines.map((q) => (
              <div key={q.quarter} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    q.status === 'upcoming'
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {q.status === 'upcoming' ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    <CalendarDays className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{q.quarter}</p>
                  <p className="text-xs text-gray-500">{q.deadline}</p>
                </div>
                {q.status === 'upcoming' && (
                  <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">
                    Next up
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">What's included</h3>
          <ul className="space-y-3">
            {[
              { label: 'Quarterly estimated tax calculation', included: true },
              { label: 'Federal 1040-ES preparation', included: true },
              { label: 'State estimated tax filing', included: true },
              { label: 'Expense categorization', included: true },
              { label: 'Deduction optimization', included: profile.tier !== 'starter' },
              { label: '1:1 tax advisor sessions', included: tax.advisorAccess },
              { label: 'Year-end tax planning', included: profile.tier === 'premium' },
              { label: 'Audit support', included: profile.tier === 'premium' },
            ].map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-sm">
                {item.included ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-gray-300 shrink-0" />
                )}
                <span className={item.included ? 'text-gray-700' : 'text-gray-400'}>
                  {item.label}
                </span>
                {!item.included && (
                  <span className="text-xs text-indigo-600 font-medium ml-auto">Upgrade</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-gray-300 transition-all text-left">
          <DollarSign className="w-6 h-6 text-green-600 mb-2" />
          <h4 className="text-sm font-semibold text-gray-900">Estimate my taxes</h4>
          <p className="text-xs text-gray-500 mt-1">
            Get a quick estimate of your quarterly payment
          </p>
        </button>
        <button className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-gray-300 transition-all text-left">
          <FileText className="w-6 h-6 text-blue-600 mb-2" />
          <h4 className="text-sm font-semibold text-gray-900">Upload documents</h4>
          <p className="text-xs text-gray-500 mt-1">1099s, receipts, and other tax documents</p>
        </button>
        <button className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-gray-300 transition-all text-left">
          <ArrowUpRight className="w-6 h-6 text-violet-600 mb-2" />
          <h4 className="text-sm font-semibold text-gray-900">View deductions</h4>
          <p className="text-xs text-gray-500 mt-1">See deductions we've found for you so far</p>
        </button>
      </div>
    </div>
  );
}
