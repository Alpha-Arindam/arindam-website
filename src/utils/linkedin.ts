export const handleLinkedInClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  const webUrl = 'https://www.linkedin.com/public-profile/settings/?trk=d_flagship3_profile_self_view_public_profile&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3Bjuek2v8FTM631TBlBI1C8A%3D%3D';
  const deepLink = 'linkedin://in/arindambetal';

  // Check if mobile device using a robust regex for Android and iOS
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    // Try opening in the app via deep link
    window.location.href = deepLink;
    
    // Set fallback to open web URL in a new tab if app is not installed/fails to open within 1.5s
    const timer = setTimeout(() => {
      window.open(webUrl, '_blank', 'noopener,noreferrer');
    }, 1500);

    // Cancel the fallback timer if the app launches successfully (i.e. page gets hidden)
    const handleVisibility = () => {
      if (document.hidden) {
        clearTimeout(timer);
        document.removeEventListener('visibilitychange', handleVisibility);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
  } else {
    // Desktop: open standard web page in a new tab
    window.open(webUrl, '_blank', 'noopener,noreferrer');
  }
};
