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
      <div
        className="px-5 md:px-8 pt-8 md:pt-10"
        style={{ maxWidth: 1200, margin: '0 auto' }}
      >
        <MarketingNav active="pricing" />
      </div>
      <Pricing variant="page" />
    </div>
  );
}
