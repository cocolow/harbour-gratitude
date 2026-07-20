import type { ReactNode } from 'react';
import { WashBackground } from './WashBackground';
import { useAppTheme } from '../theme/useAppTheme';

interface AppShellProps {
  children: ReactNode;
  className?: string;
  withFabSpace?: boolean;
}

export function AppShell({ children, className = '', withFabSpace = false }: AppShellProps) {
  const { tokens: t } = useAppTheme();
  return (
    <div
      className={`relative mx-auto min-h-full w-full max-w-[430px] overflow-hidden ${className}`}
      style={{
        fontFamily: t.fonts.body,
        backgroundColor: t.colors.bg,
        color: t.colors.text,
      }}
    >
      <WashBackground />
      <div className={`relative px-5 pt-10 ${withFabSpace ? 'pb-28' : 'pb-10'}`}>{children}</div>
    </div>
  );
}
