import type { Metadata } from "next";
import { PublicPage } from "@/components/public-page";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using the Inspiro website, event registration and ticketing services.",
};

export default function TermsPage() {
  return <PublicPage eyebrow="Using Inspiro" title="Clear terms for a clear experience." intro="These terms set out the basic rules for using the Inspiro website, registering for events and purchasing tickets.">
    <article className="legal-content">
      <p className="legal-updated">Last updated: 24 October 2026</p>
      <section><h2>Website content</h2><p>The content on this website is provided for general information about Inspiro, our work, programmes and events. We may update, change or remove content without notice.</p></section>
      <section><h2>Events and tickets</h2><p>Event details, availability, pricing and venue information may change. A ticket is valid only for the event, date and attendee details shown in the confirmation. Tickets may not be resold unless Inspiro has expressly approved the transfer.</p></section>
      <section><h2>Payments and refunds</h2><p>Payments are processed securely through Paystack. Any refund, cancellation or event-change policy will be communicated for the relevant event. Inspiro may refuse or cancel an order where payment cannot be verified or event capacity has been reached.</p></section>
      <section><h2>Acceptable use</h2><p>You must not misuse the website, submit fraudulent information, interfere with its operation or use content in a way that infringes Inspiro’s rights or another person’s rights.</p></section>
      <section><h2>Contact</h2><p>If you have a question about these terms or an event, please use the <a href="/contact">contact page</a>.</p></section>
    </article>
  </PublicPage>;
}
