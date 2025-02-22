import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://3.66.130.175:8080/api/providers/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch providers: ${res.statusText}`);
    }

    const providers = await res.json();
    return NextResponse.json(providers, { status: 200 });
  } catch (error) {
    console.error("Error fetching providers:", error);
    return NextResponse.json(
      { error: "Failed to fetch providers" },
      { status: 500 }
    );
  }
}
