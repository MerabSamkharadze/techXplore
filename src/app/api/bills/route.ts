import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://3.66.130.175:8080/api/bills/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch bills: ${res.statusText}`);
    }

    const bills = await res.json();
    return NextResponse.json(bills, { status: 200 });
  } catch (error) {
    console.error("Error fetching bills:", error);
    return NextResponse.json(
      { error: "Failed to fetch bills" },
      { status: 500 }
    );
  }
}
