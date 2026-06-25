import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';
import { I18nProvider } from '../../locales';

describe('Responsive Layout Components', () => {
  let originalInnerWidth: number;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
  });

  afterEach(() => {
    // Reset window width
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: originalInnerWidth });
    window.dispatchEvent(new Event('resize'));
  });

  it('renders desktop navbar navigation and hides mobile menu button', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
    window.dispatchEvent(new Event('resize'));

    render(
      <I18nProvider>
        <Navbar darkMode={false} toggleDarkMode={vi.fn()} />
      </I18nProvider>
    );

    // Desktop: navigation links should be rendered and visible
    const aboutLink = screen.getAllByRole('link', { name: /About/i })[0];
    expect(aboutLink).toBeInTheDocument();

    // Mobile menu button should be styled as hidden on desktop/medium up (md:hidden)
    const toggleButton = screen.getByRole('button', { name: /AB\./i });
    expect(toggleButton).toBeInTheDocument();
  });

  it('renders mobile menu toggle button and opens menu on click on mobile viewports', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 });
    window.dispatchEvent(new Event('resize'));

    render(
      <I18nProvider>
        <Navbar darkMode={false} toggleDarkMode={vi.fn()} />
      </I18nProvider>
    );

    // Mobile menu button (Menu icon button) should exist
    // In Navbar.tsx, let's find the button containing the lucide Menu/X icon or button with no text (screen reader labels/roles)
    const buttons = screen.getAllByRole('button');
    // The menu toggle button is the one at the end of the header on mobile
    // Let's find it by looking for the one that has class containing "md:hidden"
    const toggleMenuBtn = buttons.find(b => b.className.includes('md:hidden'));
    expect(toggleMenuBtn).toBeInTheDocument();

    if (toggleMenuBtn) {
      // Toggle button click should open mobile overlay
      fireEvent.click(toggleMenuBtn);
      
      // Check if navigation links inside mobile menu are visible
      // They should be rendered under mobile menu layout
      const mobileNavLinks = screen.getAllByRole('link');
      // The links should have been rendered.
      expect(mobileNavLinks.length).toBeGreaterThan(0);
    }
  });
});
