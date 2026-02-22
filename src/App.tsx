import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import HealthInsurance from './pages/HealthInsurance';
import Retirement from './pages/Retirement';
import Liability from './pages/Liability';
import TaxSupport from './pages/TaxSupport';
import Subscription from './pages/Subscription';
import BenefitsMarketplace from './pages/BenefitsMarketplace';

function AppRoutes() {
  const { onboardingComplete } = useApp();

  if (!onboardingComplete) {
    return (
      <Routes>
        <Route path="*" element={<Onboarding />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/health" element={<HealthInsurance />} />
        <Route path="/retirement" element={<Retirement />} />
        <Route path="/liability" element={<Liability />} />
        <Route path="/tax" element={<TaxSupport />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/marketplace" element={<BenefitsMarketplace />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}
