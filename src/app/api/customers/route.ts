import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://3.66.130.175:8080/api/customers/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch customers: ${res.statusText}`);
    }

    const customers = await res.json();
    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}
