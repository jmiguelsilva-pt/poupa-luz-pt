import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  noindex?: boolean;
  structuredData?: object;
}

const SEOHead = ({ title, description, canonical, noindex, structuredData }: SEOHeadProps) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    if (noindex) {
      setMeta('name', 'robots', 'noindex, nofollow');
    } else {
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) robotsMeta.remove();
    }

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonical);

    // OG tags
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonical);

    // Twitter tags
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:url', canonical);

    // Structured data
    let script = document.getElementById('seo-structured-data') as HTMLScriptElement | null;
    if (structuredData) {
      if (!script) {
        script = document.createElement('script');
        script.id = 'seo-structured-data';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    } else if (script) {
      script.remove();
    }

    return () => {
      const s = document.getElementById('seo-structured-data');
      if (s) s.remove();
    };
  }, [title, description, canonical, noindex, structuredData]);

  return null;
};

export default SEOHead;
