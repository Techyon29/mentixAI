import { NextResponse } from "next/server";
import connectDB from "@/src/utils/db";
import Institute from "@/src/models/institute";

export async function GET() {
  try {
    await connectDB();
    const institutes = await Institute.find({}, "instituteName");
    return NextResponse.json({ institutes });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
