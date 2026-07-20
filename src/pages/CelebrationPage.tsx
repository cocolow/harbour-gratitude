import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { arcadePrimaryButton, arcadeGhostButton } from '../design/arcadeStyles';
import { AppShell } from '../components/AppShell';
import { BubbleTeaJar } from '../components/BubbleTeaJar';
import { useAppData } from '../context/AppProvider';
import { useAppTheme } from '../theme/useAppTheme';
import { useReducedMotion } from '../theme/useReducedMotion';

export function CelebrationPage() {
  const { tokens: t, isDark } = useAppTheme();
  const reducedMotion = useReducedMotion();
  const navigate = useNavigate();
  const { settings, jarTarget, jar, redeemJar } = useAppData();

  useEffect(() => {
    if (jar.currentCount < jarTarget) {
      navigate('/', { replace: true });
    }
  }, [jar.currentCount, jarTarget, navigate]);

  async function handleAcknowledge() {
    await redeemJar();
    navigate('/', { replace: true });
  }

  return (
    <AppShell>
      <div
        className={`flex min-h-[70vh] flex-col items-center justify-center text-center ${reducedMotion ? '' : 'animate-celeb-in'}`}
      >
        <p
          style={{
            fontFamily: t.fonts.display,
            color: t.colors.accent,
            fontSize: '3rem',
            lineHeight: 1,
          }}
        >
          time for a treat!
        </p>
        <p style={{ color: t.colors.textMuted }} className="mt-4 max-w-xs text-sm leading-relaxed">
          your jar is full — {settings.rewardLabel} is on you today.
        </p>

        <div className="my-8">
          <BubbleTeaJar
            level={jarTarget}
            target={jarTarget}
            outlineColor={t.colors.text}
            jarEmpty={t.colors.jarEmpty}
            size={138}
          />
        </div>

        <div className="flex w-full max-w-xs flex-col gap-3">
          <button
            type="button"
            onClick={() => handleAcknowledge()}
            style={{
              ...arcadePrimaryButton(t, t.colors.fab, isDark ? t.colors.text : '#fff'),
              fontFamily: t.fonts.display,
              fontSize: '1.25rem',
            }}
            className="py-3"
          >
            treat yourself
          </button>
          <button
            type="button"
            onClick={() => handleAcknowledge()}
            style={{
              ...arcadeGhostButton(t),
              fontFamily: t.fonts.display,
              fontSize: '1.25rem',
            }}
            className="py-3"
          >
            celebrate later
          </button>
        </div>
      </div>
    </AppShell>
  );
}
