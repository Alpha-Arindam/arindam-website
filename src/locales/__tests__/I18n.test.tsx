import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { I18nProvider, useI18n } from '../index';

// Helper component to consume context
function TestComponent() {
  const { language, changeLanguage, t } = useI18n();
  return (
    <div>
      <span data-testid="lang">{language}</span>
      <span data-testid="title">{t('common.about')}</span>
      <span data-testid="interpolated">{t('hero.particleVelocity', { speed: '50' })}</span>
      <span data-testid="fallback">{t('nonexistent.key.here')}</span>
      <button onClick={() => changeLanguage('bn')} data-testid="change-btn">Change</button>
    </div>
  );
}

describe('I18n localization system', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('renders default English text and switches language correctly', () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    expect(screen.getByTestId('lang').textContent).toBe('en');
    expect(screen.getByTestId('title').textContent).toBe('About');
    expect(screen.getByTestId('interpolated').textContent).toBe('Particle Velocity: 50');

    // Trigger change
    act(() => {
      screen.getByTestId('change-btn').click();
    });

    expect(screen.getByTestId('lang').textContent).toBe('bn');
    expect(screen.getByTestId('title').textContent).toBe('পরিচিতি');
    expect(localStorage.getItem('language')).toBe('bn');
  });

  it('auto-detects system language from navigator.language', () => {
    // Mock navigator.language
    const langSpy = vi.spyOn(navigator, 'language', 'get').mockReturnValue('bn-IN');

    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    expect(screen.getByTestId('lang').textContent).toBe('bn');
    expect(screen.getByTestId('title').textContent).toBe('পরিচিতি');

    langSpy.mockRestore();
  });

  it('loads language from localStorage if present', () => {
    localStorage.setItem('language', 'hi');

    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    expect(screen.getByTestId('lang').textContent).toBe('hi');
    expect(screen.getByTestId('title').textContent).toBe('परिचय');
  });

  it('falls back to English when translation key is missing in active language', () => {
    localStorage.setItem('language', 'bn');

    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    // Testing a fallback key that does not exist in bn but exists in en (or key string if it doesn't exist at all)
    expect(screen.getByTestId('fallback').textContent).toBe('nonexistent.key.here');
  });
});
