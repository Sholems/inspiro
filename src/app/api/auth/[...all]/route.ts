import { toNextJsHandler } from "better-auth/next-js";
import { getAuth } from "@/modules/auth/server";

function createHandler(method: keyof ReturnType<typeof toNextJsHandler>) {
  return (request: Request) => toNextJsHandler(getAuth())[method](request);
}

export const GET = createHandler("GET");
export const POST = createHandler("POST");
export const PATCH = createHandler("PATCH");
export const PUT = createHandler("PUT");
export const DELETE = createHandler("DELETE");