import type { Metadata } from 'next';
import MarketingNav from '@/components/MarketingNav';
import Pricing from '@/components/Pricing';
import ScrollPageBodyToggle from '@/components/ScrollBodyToggle';

export const metadata: Metadata = {
  title: 'Pricing — Rejection Collection',
  description:
    'Free forever for the first 50 founding members. $5/mo or $35/yr after.',
};

export default function PricingPage() {
  return (
    <div style={{ background: 'var(--pp-bg)', minHeight: '100vh' }}>
      <ScrollPageBodyToggle />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        <MarketingNav active={null} />
      </div>
      <Pricing variant="page" />
    </div>
  );
}
