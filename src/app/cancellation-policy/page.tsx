import type { Metadata } from 'next'
import LegalPage from '@/components/layout/LegalPage'

export const metadata: Metadata = {
  title: 'Cancellation Policy | Chef Harrizona',
  description: 'Chef Harrizona\'s cancellation, rescheduling and refund policy.',
}

export default function CancellationPolicyPage() {
  return (
    <LegalPage title="Cancellation Policy" lastUpdated="August 2026">
      <h2>Cancellation by Client</h2>
      <table className="w-full text-sm border-collapse mb-6">
        <thead>
          <tr className="border-b border-[hsl(0_0%_22%)]">
            <th className="py-2 pr-4 text-left font-semibold text-[hsl(42_30%_94%)]">Notice Period</th>
            <th className="py-2 text-left font-semibold text-[hsl(42_30%_94%)]">Refund</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[hsl(0_0%_16%)] text-[hsl(0_0%_60%)]">
          <tr><td className="py-3 pr-4">More than 14 days before event</td><td className="py-3">Full deposit refund</td></tr>
          <tr><td className="py-3 pr-4">7–14 days before event</td><td className="py-3">50% deposit refund</td></tr>
          <tr><td className="py-3 pr-4">Less than 7 days before event</td><td className="py-3">No refund on deposit</td></tr>
          <tr><td className="py-3 pr-4">Same day or no-show</td><td className="py-3">Full event fee may apply</td></tr>
        </tbody>
      </table>

      <h2>Rescheduling</h2>
      <p>Rescheduling is permitted at no charge if requested more than 7 days before the event, subject to availability. Rescheduling within 7 days may incur a rescheduling fee.</p>

      <h2>Cancellation by Chef Harrizona</h2>
      <p>In the unlikely event that Chef Harrizona must cancel due to illness or circumstances beyond our control, a full refund of any amounts paid will be issued within 7 business days. We will also make reasonable efforts to source a suitable replacement chef.</p>

      <h2>Deposits</h2>
      <p>A 40% non-refundable deposit (subject to the cancellation window above) is required to confirm all bookings. This covers planning, ingredient sourcing and scheduling costs incurred in preparation for your event.</p>

      <h2>How to Cancel or Reschedule</h2>
      <p>To cancel or reschedule, please contact us in writing via email at harrisonbzn@gmail.com or WhatsApp. Verbal cancellations are not accepted. The cancellation date is the date your written request is received.</p>

      <p className="text-xs text-[hsl(0_0%_40%)] mt-8 border-t border-[hsl(0_0%_18%)] pt-4">
        <strong>Note:</strong> This cancellation policy is a general framework. The exact terms will be confirmed in your booking agreement.
      </p>
    </LegalPage>
  )
}
