export const contentKinds = ["pages", "services", "work", "articles", "episodes", "team"] as const;
export type ContentKind = (typeof contentKinds)[number];
export function isContentKind(value: string): value is ContentKind { return contentKinds.includes(value as ContentKind); }
