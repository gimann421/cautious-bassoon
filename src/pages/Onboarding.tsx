import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { WorkType, IncomeRange } from '../types';
import { WORK_TYPE_LABELS, INCOME_LABELS } from '../types';

const STEPS = ['Welcome', 'Work Info', 'Income', 'Experience', 'Review'];

export default function Onboarding() {
  const navigate = useNavigate();
  const { completeOnboarding } = useApp();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '',
    email: '',
    workType: '' as WorkType | '',
    incomeRange: '' as IncomeRange | '',
    yearsFreelancing: 0,
    hasExistingHealth: false,
    hasRetirementAccount: false,
  });

  const canAdvance = () => {
    switch (step) {
      case 0:
        return form.name.trim() !== '' && form.email.trim() !== '';
      case 1:
        return form.workType !== '';
      case 2:
        return form.incomeRange !== '';
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleFinish = () => {
    if (!form.workType || !form.incomeRange) return;
    completeOnboarding({
      name: form.name,
      email: form.email,
      workType: form.workType,
      incomeRange: form.incomeRange,
      yearsFreelancing: form.yearsFreelancing,
      hasExistingHealth: form.hasExistingHealth,
      hasRetirementAccount: form.hasRetirementAccount,
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <Shield className="w-10 h-10 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-900">FreelanceShield</span>
          </div>
          <p className="text-gray-500">Your complete freelancer benefits stack</p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-1 mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`h-1.5 w-full rounded-full transition-colors ${
                  i <= step ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              />
              <span
                className={`text-xs ${i <= step ? 'text-indigo-600 font-medium' : 'text-gray-400'}`}
              >
                {s}
              </span>
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          {/* Step 0: Welcome */}
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Let's get you covered</h2>
                <p className="text-gray-500 mt-1">
                  Tell us a bit about yourself and we'll build a personalized benefits stack for your
                  freelance career.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                  placeholder="jane@freelance.com"
                />
              </div>
            </div>
          )}

          {/* Step 1: Work Type */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">What kind of work do you do?</h2>
                <p className="text-gray-500 mt-1">
                  This helps us tailor your liability coverage and tax deductions.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {(Object.entries(WORK_TYPE_LABELS) as [WorkType, string][]).map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => setForm({ ...form, workType: value })}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-left text-sm transition-colors ${
                      form.workType === value
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {form.workType === value && <Check className="w-4 h-4 text-indigo-600" />}
                    <span className={form.workType === value ? 'font-medium' : ''}>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Income */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  What's your annual freelance income?
                </h2>
                <p className="text-gray-500 mt-1">
                  We use this to recommend the right coverage tier and retirement contributions.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {(Object.entries(INCOME_LABELS) as [IncomeRange, string][]).map(
                  ([value, label]) => (
                    <button
                      key={value}
                      onClick={() => setForm({ ...form, incomeRange: value })}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-left text-sm transition-colors ${
                        form.incomeRange === value
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {form.incomeRange === value && <Check className="w-4 h-4 text-indigo-600" />}
                      <span className={form.incomeRange === value ? 'font-medium' : ''}>
                        {label}
                      </span>
                    </button>
                  ),
                )}
              </div>
            </div>
          )}

          {/* Step 3: Experience */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">A few more details</h2>
                <p className="text-gray-500 mt-1">
                  This helps us understand what coverage you might already have.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years freelancing
                </label>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 5, 10].map((y) => (
                    <button
                      key={y}
                      onClick={() => setForm({ ...form, yearsFreelancing: y })}
                      className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
                        form.yearsFreelancing === y
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-medium'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {y === 0 ? 'New' : y === 10 ? '10+' : `${y}yr`}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.hasExistingHealth}
                    onChange={(e) => setForm({ ...form, hasExistingHealth: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">
                    I currently have health insurance coverage
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.hasRetirementAccount}
                    onChange={(e) => setForm({ ...form, hasRetirementAccount: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">
                    I have an existing retirement account (IRA, 401k, etc.)
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Review your profile</h2>
                <p className="text-gray-500 mt-1">
                  Here's what we know so far. Looks good? We'll build your benefits stack next.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium text-gray-900">{form.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email</span>
                  <span className="font-medium text-gray-900">{form.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Work type</span>
                  <span className="font-medium text-gray-900">
                    {form.workType ? WORK_TYPE_LABELS[form.workType] : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Income range</span>
                  <span className="font-medium text-gray-900">
                    {form.incomeRange ? INCOME_LABELS[form.incomeRange] : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Experience</span>
                  <span className="font-medium text-gray-900">
                    {form.yearsFreelancing === 0
                      ? 'Just starting'
                      : `${form.yearsFreelancing}+ years`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Existing health coverage</span>
                  <span className="font-medium text-gray-900">
                    {form.hasExistingHealth ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Existing retirement account</span>
                  <span className="font-medium text-gray-900">
                    {form.hasRetirementAccount ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {step > 0 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div />
            )}
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canAdvance()}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Build my benefits stack
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          No commitment required. See your personalized plan before you pay anything.
        </p>
      </div>
    </div>
  );
}
