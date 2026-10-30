import type { Metadata } from "next";
import { PublicPage } from "@/components/public-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Inspiro collects, uses and protects personal information.",
};

export default function PrivacyPage() {
  return <PublicPage eyebrow="Your information" title="Privacy, handled with care." intro="This policy explains the information Inspiro collects through this website, why we use it and the choices available to you.">
    <article className="legal-content">
      <p className="legal-updated">Last updated: 24 October 2026</p>
      <section><h2>Information we collect</h2><p>When you contact us, register for an event or request information, we may collect your name, email address, phone number, organisation, event details and the message you send us.</p></section>
      <section><h2>How we use it</h2><p>We use this information to respond to enquiries, administer event registrations and ticket purchases, provide requested services, maintain security and improve the website. We do not sell personal information.</p></section>
      <section><h2>Payments and service providers</h2><p>Paid event checkout is processed by Paystack. We do not store your card details. We may use trusted providers for email delivery, hosting, analytics and security, and only share the information needed for those services.</p></section>
      <section><h2>Retention and your choices</h2><p>We keep information only for as long as it is needed for the purpose collected, legal obligations or legitimate business records. You may ask us to access, correct or delete your personal information by contacting us through the <a href="/contact">contact page</a>.</p></section>
      <section><h2>Contact</h2><p>For privacy questions, send an enquiry to Inspiro and include “Privacy” in the subject or message.</p></section>
    </article>
  </PublicPage>;
}
