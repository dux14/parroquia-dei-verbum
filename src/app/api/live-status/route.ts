import { NextResponse } from "next/server";
import { getLiveStatus } from "@/lib/youtube-live";

// La ruta corre por petición (debe releer el reloj); el scrape sigue cacheado.
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getLiveStatus());
}
