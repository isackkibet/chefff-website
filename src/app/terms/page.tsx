import type { Metadata } from 'next'
import LegalPage from '@/components/layout/LegalPage'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Chef Harrizona',
  description: 'Terms and conditions for booking and using Chef Harrizona\'s services.',
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" lastUpdated="August 2026">
      <h2>1. Services</h2>
      <p>Chef Harrizona provides private chef, catering and culinary experience services across Nairobi and surrounding areas. All services are subject to availability and must be confirmed in writing.</p>

      <h2>2. Booking Confirmation</h2>
      <p>A booking is not confirmed until a deposit has been received and written confirmation has been provided. Submitting a booking request form does not constitute a confirmed booking.</p>

      <h2>3. Deposits & Payment</h2>
      <p>A 40% deposit is required to confirm a booking. The balance is due 48 hours before the event. Payment terms are set out in your booking confirmation. Prices are quoted in Kenyan Shillings (KES) and are inclusive of applicable taxes unless stated otherwise.</p>

      <h2>4. Cancellation</h2>
      <p>Please refer to our <a href="/cancellation-policy">Cancellation Policy</a> for full details on cancellations and refunds.</p>

      <h2>5. Dietary & Allergen Information</h2>
      <p>Clients must disclose all dietary requirements and allergies at the time of booking. While every effort is made to accommodate requirements, Chef Harrizona cannot guarantee a completely allergen-free environment and does not accept liability for undisclosed allergies.</p>

      <h2>6. Intellectual Property</h2>
      <p>All content on this website, including text, images, recipes and branding, is the property of Chef Harrizona and may not be reproduced without written permission.</p>

      <h2>7. Limitation of Liability</h2>
      <p>Chef Harrizona's liability for any claim arising from our services shall not exceed the value of the booking in question. We are not liable for indirect or consequential losses.</p>

      <h2>8. Governing Law</h2>
      <p>These terms are governed by the laws of Kenya. Any disputes shall be resolved in accordance with Kenyan law.</p>

      <p className="text-xs text-[hsl(0_0%_40%)] mt-8 border-t border-[hsl(0_0%_18%)] pt-4">
        <strong>Note:</strong> These terms are a general framework and should be reviewed by a qualified legal professional before use in an active business context.
      </p>
    </LegalPage>
  )
}
