import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppProvider';
import { DesignPage } from './design/DesignPage';
import { DESIGN_A, DESIGN_B, DESIGN_C, DESIGN_D } from './design/tokens';
import { BadDayPage } from './pages/BadDayPage';
import { CapturePage } from './pages/CapturePage';
import { CelebrationPage } from './pages/CelebrationPage';
import { FollowUpPage } from './pages/FollowUpPage';
import { HomePage } from './pages/HomePage';
import { DesignHub } from './pages/DesignHub';
import { SettingsPage } from './pages/SettingsPage';
import { ThemeManager } from './theme/useAppTheme';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <ThemeManager />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/capture" element={<CapturePage />} />
          <Route path="/bad-day" element={<BadDayPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/celebration" element={<CelebrationPage />} />
          <Route path="/follow-up" element={<FollowUpPage />} />
          <Route path="/design" element={<DesignHub />} />
          <Route path="/design/a" element={<DesignPage tokens={DESIGN_A} />} />
          <Route path="/design/b" element={<DesignPage tokens={DESIGN_B} />} />
          <Route path="/design/c" element={<DesignPage tokens={DESIGN_C} />} />
          <Route path="/design/d" element={<DesignPage tokens={DESIGN_D} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
