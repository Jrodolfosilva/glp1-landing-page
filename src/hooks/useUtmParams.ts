import { useEffect, useState } from 'react';

interface UtmParams {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
}

export const useUtmParams = () => {
  const [utmParams, setUtmParams] = useState<UtmParams>({
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_term: null,
    utm_content: null,
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    const params: UtmParams = {
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
      utm_term: urlParams.get('utm_term'),
      utm_content: urlParams.get('utm_content'),
    };

    // Save to localStorage for persistence across page navigations
    if (params.utm_source || params.utm_medium || params.utm_campaign) {
      localStorage.setItem('utm_params', JSON.stringify(params));
    }

    // Try to get from localStorage if not in URL
    const stored = localStorage.getItem('utm_params');
    if (stored && !params.utm_source) {
      setUtmParams(JSON.parse(stored));
    } else {
      setUtmParams(params);
    }
  }, []);

  return utmParams;
};
