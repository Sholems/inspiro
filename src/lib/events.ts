import "server-only";
import { getPrisma } from "@/lib/prisma";

export type EventListing = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  image: string;
  date: string;
  dateLabel: string;
  time: string;
  venue: string;
  address: string;
  ticketType: "paid" | "free";
  price: number;
  availability: string;
  phone: string;
  whatsapp: string;
};

export const events: EventListing[] = [
  {
    slug: "ayo-solanke-live-in-lagos",
    title: "Ayo Solanke Live in Lagos",
    category: "Lagos International Jazz Festival presents",
    summary: "One night of live performance, artist interviews and jazz conversations.",
    description: "The Lagos International Jazz Festival presents a special session with legendary saxophonist Ayo Solanke. Come for the music, the stories and an evening rooted in Africa’s enduring jazz tradition.",
    image: "/images/events/ayo-solanke-live.jpeg",
    date: "2026-11-01",
    dateLabel: "Sunday, 1 November 2026",
    time: "6:00 PM",
    venue: "Inspiro Creative Hub",
    address: "LSDPC Shop 29, 2B Adelebu Street, Alhaji Masha Roundabout, Surulere, Lagos",
    ticketType: "paid",
    price: 10000,
    availability: "Limited seats available",
    phone: "09029221980",
    whatsapp: "08061396417",
  },
];

export function getEvent(slug: string) {
  return events.find((event) => event.slug === slug);
}

type StoredEvent = Awaited<ReturnType<ReturnType<typeof getPrisma>["event"]["findMany"]>>[number];

function mapStoredEvent(event: StoredEvent): EventListing {
  const date = event.date.toISOString().slice(0, 10);
  const dateLabel = new Intl.DateTimeFormat("en-NG", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(event.date);
  return { ...event, date, dateLabel, ticketType: event.ticketType === "FREE" ? "free" : "paid", price: event.price };
}

export async function getPublicEvents(): Promise<EventListing[]> {
  try {
    const stored = await getPrisma().event.findMany({ where: { status: "PUBLISHED" }, orderBy: { date: "asc" } });
    return stored.length ? stored.map(mapStoredEvent) : events;
  } catch {
    return events;
  }
}

export async function getPublicEvent(slug: string) {
  try {
    const stored = await getPrisma().event.findFirst({ where: { slug, status: "PUBLISHED" } });
    return stored ? mapStoredEvent(stored) : getEvent(slug);
  } catch {
    return getEvent(slug);
  }
}

export function formatNaira(value: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(value);
}
