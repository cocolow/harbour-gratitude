import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../components/AppShell';
import { useAppData } from '../context/AppProvider';
import { useAppTheme } from '../theme/useAppTheme';

export function CelebrationPage() {
  const { tokens: t } = useAppTheme();
  const navigate = useNavigate();
  const { settings, jarTarget, jar, redeemJar } = useAppData();

  useEffect(() => {
    if (jar.currentCount < jarTarget) {
      navigate('/', { replace: true });
    }
  }, [jar.currentCount, jarTarget, navigate]);

  async function handleRedeem() {
    await redeemJar();
    navigate('/', { replace: true });
  }

  return (
    <AppShell>
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <p
          style={{
            fontFamily: t.fonts.display,
            color: t.colors.accent,
            fontSize: '2.5rem',
            lineHeight: 1.1,
            transform: 'rotate(-1deg)',
          }}
        >
          jar full!
        </p>
        <p style={{ color: t.colors.textMuted }} className="mt-4 max-w-xs text-sm leading-relaxed">
          You filled {jarTarget} wins. Time for {settings.rewardLabel} — you earned it.
        </p>

        <div
          className="my-10 text-6xl"
          style={{ transform: 'rotate(3deg)' }}
          aria-hidden
        >
          🫧
        </div>

        <div className="flex w-full max-w-xs flex-col gap-3">
          <button
            type="button"
            onClick={() => handleRedeem()}
            style={{
              backgroundColor: t.colors.fab,
              color: '#fff',
              borderRadius: t.radius.button,
              fontFamily: t.fonts.display,
              fontSize: '1.25rem',
            }}
            className="py-3"
          >
            Redeemed
          </button>
          <button
            type="button"
            onClick={() => handleRedeem()}
            style={{
              backgroundColor: t.colors.bgElevated,
              border: `2px solid ${t.colors.accent}`,
              color: t.colors.accent,
              borderRadius: t.radius.button,
              fontFamily: t.fonts.display,
              fontSize: '1.25rem',
            }}
            className="py-3"
          >
            Treat yourself
          </button>
        </div>
      </div>
    </AppShell>
  );
}
