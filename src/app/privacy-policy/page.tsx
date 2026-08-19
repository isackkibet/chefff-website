import type { Metadata } from 'next'
import LegalPage from '@/components/layout/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy | Chef Harrizona',
  description: 'Privacy policy for chefharrizona.co.ke — how we collect, use and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="August 2026">
      <h2>1. Information We Collect</h2>
      <p>When you use this website or submit an enquiry, we may collect: your name, email address, phone number and event details you provide voluntarily. We do not collect sensitive personal information beyond what is necessary to respond to your booking or enquiry.</p>

      <h2>2. How We Use Your Information</h2>
      <p>We use the information you provide solely to: respond to your enquiry or booking request, prepare your event proposal, communicate about confirmed bookings, and send service-related information you have requested.</p>
      <p>We do not sell, rent or share your personal information with third parties for marketing purposes.</p>

      <h2>3. Data Retention</h2>
      <p>We retain your information for as long as necessary to fulfil the purpose it was collected for, or as required by applicable law. Enquiry data for events that do not proceed is held for up to 12 months.</p>

      <h2>4. Your Rights</h2>
      <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us at harrisonbzn@gmail.com.</p>

      <h2>5. Cookies</h2>
      <p>This website uses only essential cookies required for basic site functionality. No third-party tracking or advertising cookies are set without your consent.</p>

      <h2>6. Security</h2>
      <p>We take reasonable technical and organisational measures to protect your data. No method of transmission over the internet is completely secure, and we cannot guarantee absolute security.</p>

      <h2>7. Contact</h2>
      <p>For questions about this privacy policy, please contact: harrisonbzn@gmail.com</p>

      <p className="text-xs text-[hsl(0_0%_40%)] mt-8 border-t border-[hsl(0_0%_18%)] pt-4">
        <strong>Note:</strong> This privacy policy is a general framework. Before launching this website for actual business use, please have it reviewed by a qualified legal professional to ensure it complies with Kenya's Data Protection Act (2019) and any other applicable regulations.
      </p>
    </LegalPage>
  )
}
