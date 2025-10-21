import React, { useEffect } from 'react';

interface AdBannerProps {
  slot: string;
  format?: 'horizontal' | 'square' | 'mobile' | 'auto';
  className?: string;
  responsive?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdBanner: React.FC<AdBannerProps> = ({ 
  slot, 
  format = 'auto', 
  className = '',
  responsive = true 
}) => {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (err) {
      console.log('AdSense error:', err);
    }
  }, []);

  const getAdStyles = () => {
    switch (format) {
      case 'horizontal':
        return { width: '728px', height: '90px' };
      case 'square':
        return { width: '300px', height: '300px' };
      case 'mobile':
        return { width: '320px', height: '50px' };
      default:
        return responsive 
          ? { display: 'block', width: '100%', height: 'auto' }
          : { width: '728px', height: '90px' };
    }
  };

  return (
    <div className={`ad-banner flex justify-center my-4 ${className}`}>
      <ins
        className="adsbygoogle"
        style={getAdStyles()}
        data-ad-client="ca-pub-7200759499831094"
        data-ad-slot={slot}
        data-ad-format={responsive ? 'auto' : undefined}
        data-full-width-responsive={responsive ? 'true' : undefined}
      />
    </div>
  );
};