import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Heart,
  PiggyBank,
  Shield,
  Calculator,
  CreditCard,
  ChevronUp,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TIER_CONFIG } from '../types';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/health', label: 'Health Insurance', icon: Heart },
  { to: '/retirement', label: 'Retirement', icon: PiggyBank },
  { to: '/liability', label: 'Liability', icon: Shield },
  { to: '/tax', label: 'Tax Support', icon: Calculator },
  { to: '/subscription', label: 'Subscription', icon: CreditCard },
];

const tierColors: Record<string, string> = {
  starter: 'bg-emerald-100 text-emerald-700',
  professional: 'bg-blue-100 text-blue-700',
  premium: 'bg-violet-100 text-violet-700',
};

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { profile } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">FreelanceShield</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Benefits that work for you</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>

        {profile && (
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-sm">
                {profile.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{profile.name}</p>
                <span
                  className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${tierColors[profile.tier]}`}
                >
                  {TIER_CONFIG[profile.tier].label}
                  <ChevronUp className="inline w-3 h-3 ml-0.5" />
                </span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600">
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <Shield className="w-6 h-6 text-indigo-600" />
          <span className="font-bold text-gray-900">FreelanceShield</span>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
