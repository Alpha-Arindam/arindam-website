import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { handleLinkedInClick } from '../linkedin';

describe('LinkedIn deep link handler', () => {
  let openSpy: any;
  let originalLocation: any;
  let locationHref: string = '';

  beforeEach(() => {
    vi.useFakeTimers();
    openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

    // Mock window.location
    originalLocation = window.location;
    // We only mock href getter/setter
    delete (window as any).location;
    window.location = {
      ...originalLocation,
      set href(val: string) {
        locationHref = val;
      },
      get href() {
        return locationHref;
      }
    };
    locationHref = '';
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    window.location = originalLocation;
  });

  it('opens standard web link in a new tab on desktop', () => {
    // Mock userAgent to represent desktop
    vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');

    const mockEvent = {
      preventDefault: vi.fn()
    } as unknown as React.MouseEvent<HTMLAnchorElement>;

    handleLinkedInClick(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(openSpy).toHaveBeenCalledWith(
      expect.stringContaining('linkedin.com/public-profile/settings'),
      '_blank',
      'noopener,noreferrer'
    );
    expect(locationHref).toBe('');
  });

  it('attempts to deep-link on mobile and falls back to standard link after 1.5s', () => {
    // Mock userAgent to represent Android
    vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Mozilla/5.0 (Linux; Android 10; SM-A505F)');

    const mockEvent = {
      preventDefault: vi.fn()
    } as unknown as React.MouseEvent<HTMLAnchorElement>;

    handleLinkedInClick(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    // Verify app deep link attempt
    expect(locationHref).toBe('linkedin://in/arindambetal');
    expect(openSpy).not.toHaveBeenCalled();

    // Fast-forward 1.5s
    vi.advanceTimersByTime(1500);

    // Verify fallback to web tab was executed
    expect(openSpy).toHaveBeenCalledWith(
      expect.stringContaining('linkedin.com/public-profile/settings'),
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('attempts to deep-link on mobile and cancels fallback if app opens successfully', () => {
    vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('iPhone');
    
    // Track event listeners manually to fire visibilitychange
    const listeners: Record<string, Function[]> = {};
    const addSpy = vi.spyOn(document, 'addEventListener').mockImplementation((event, cb) => {
      if (!listeners[event]) listeners[event] = [];
      listeners[event].push(cb as Function);
    });
    const removeSpy = vi.spyOn(document, 'removeEventListener').mockImplementation((event, cb) => {
      if (listeners[event]) {
        listeners[event] = listeners[event].filter(f => f !== cb);
      }
    });

    const mockEvent = {
      preventDefault: vi.fn()
    } as unknown as React.MouseEvent<HTMLAnchorElement>;

    handleLinkedInClick(mockEvent);

    expect(locationHref).toBe('linkedin://in/arindambetal');
    expect(addSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function));

    // Mock document becoming hidden (indicating app opened successfully)
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
    
    // Trigger visibilitychange listener
    if (listeners['visibilitychange']) {
      listeners['visibilitychange'].forEach(fn => fn());
    }

    // Fast-forward 1.5s
    vi.advanceTimersByTime(1500);

    // Verify window.open fallback was NOT called because timer was cleared
    expect(openSpy).not.toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
  });
});
