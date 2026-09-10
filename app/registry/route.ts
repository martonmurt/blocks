import { NextResponse } from "next/server"
import { getRegistryIndex } from "@/lib/registry-item"

export function GET() {
    return NextResponse.json(getRegistryIndex("base"))
}
