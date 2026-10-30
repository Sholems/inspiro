import type { Metadata } from "next";
import { PublicPage } from "@/components/public-page";
import { ContactForm } from "@/modules/enquiries/contact-form";
import { SocialLinks } from "@/components/social-links";
export const metadata: Metadata = { title: "Contact", description: "Start a conversation with Inspiro about creative economy strategy, partnerships, programmes and experiences." };
export default function ContactPage() { return <PublicPage eyebrow="Let's build what comes next" title="What’s your creative economy strategy?" intro="Let's explore how INSPIRO can help your organisation unlock creative opportunities, develop valuable platforms and turn ideas into measurable outcomes."><ContactForm /><section className="contact-social"><p className="eyebrow">Follow the work</p><h2>Stay close to the ideas, people and experiences shaping Africa&apos;s creative economy.</h2><SocialLinks /></section></PublicPage>; }
