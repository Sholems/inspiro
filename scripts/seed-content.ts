import "dotenv/config";
import { getPrisma } from "../src/lib/prisma";

const prisma = getPrisma();

const pages = [
  { slug: "creative-economy", title: "Creative economy", summary: "Creativity becomes an economy when ideas, talent and intellectual property can create durable value.", body: "We work across the systems that help creative people and organisations move from potential to participation: strategy, enterprise development, platforms, partnerships and policy conversations." },
  { slug: "experiences", title: "Experiences", summary: "Gatherings that connect audiences, ideas and opportunity.", body: "We conceive and deliver cultural and business experiences with a clear purpose, from live programmes to convenings and knowledge exchanges." },
  { slug: "about", title: "About Inspiro", summary: "A creative economy company founded in Lagos in 2001.", body: "Inspiro works across creativity, culture, entertainment, brands and experiences. Our next chapter is focused on turning creative potential into enterprise, platforms and economic opportunity." },
];

const services = [
  ["strategy", "Strategy", "Strategy", "Clarifying direction, opportunity and the path to value."],
  ["creative-economy-advisory", "Creative economy advisory", "Strategy", "Research, positioning and practical roadmaps for creative-economy initiatives."],
  ["content-and-concepts", "Content and concepts", "Create", "Developing ideas into clear, relevant creative propositions."],
  ["experience-design", "Experience design", "Create", "Shaping purposeful cultural, business and audience experiences."],
  ["partnerships", "Partnerships", "Connect", "Building useful relationships between talent, institutions, brands and markets."],
  ["convenings", "Convenings", "Connect", "Creating rooms where ideas, people and opportunity can meet."],
  ["enterprise-development", "Enterprise development", "Develop", "Helping creative ventures strengthen their models, systems and capacity."],
  ["programmes", "Programmes", "Develop", "Designing initiatives that support creative talent and organisations over time."],
].map(([slug, title, pillar, summary], sortOrder) => ({ slug, title, pillar, summary, description: summary, sortOrder }));

const work = [
  { slug: "lagos-international-jazz-festival", title: "Lagos International Jazz Festival", shortDescription: "A live platform for jazz, culture and the city.", fullDescription: "An Inspiro cultural platform bringing artists and audiences together around jazz in Lagos.", category: "Music & culture", location: "Lagos, Nigeria", featured: true },
  { slug: "planet-afrobeats", title: "Planet Afrobeats", shortDescription: "A platform centred on the people and ideas shaping Afrobeats.", fullDescription: "A cultural platform exploring Afrobeats and its wider creative ecosystem.", category: "Culture", featured: true },
  { slug: "inspiro-creative-hub", title: "Inspiro Creative Hub", shortDescription: "A platform for creative enterprise, learning and connection.", fullDescription: "A platform designed to support creative people, ideas and enterprise.", category: "Platform", location: "Lagos, Nigeria", featured: true },
];

async function main() {
  for (const page of pages) await prisma.page.upsert({ where: { slug: page.slug }, create: { ...page, status: "PUBLISHED", publishedAt: new Date() }, update: {} });
  for (const service of services) await prisma.service.upsert({ where: { slug: service.slug }, create: { ...service, status: "PUBLISHED" }, update: {} });
  for (const item of work) await prisma.workItem.upsert({ where: { slug: item.slug }, create: { ...item, status: "PUBLISHED", publishedAt: new Date() }, update: {} });
  await prisma.teamMember.upsert({ where: { slug: "ayoola-sadare" }, create: { slug: "ayoola-sadare", name: "Ayoola Sadare", roleTitle: "Founder & CEO", biography: "Founder and CEO of Inspiro, established in Lagos in 2001.", status: "PUBLISHED" }, update: {} });
}

main().then(() => prisma.$disconnect()).catch(async (error) => { console.error(error); await prisma.$disconnect(); process.exit(1); });
