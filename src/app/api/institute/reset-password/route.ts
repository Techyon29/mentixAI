import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "@/src/utils/db";
import Institute from "@/src/models/institute";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { password, instituteId } = body;

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    let authInstituteId: string | null = null;
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value;
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_jwt_secret") as any;
        authInstituteId = decoded.id;
      }
    } catch (err) {
    }

    const targetId = instituteId || authInstituteId;

    if (!targetId) {
      return NextResponse.json(
        { error: "Unauthorized or missing institute ID" },
        { status: 401 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const updatedInstitute = await Institute.findByIdAndUpdate(
      targetId,
      { $set: { passwordHash } },
      { new: true }
    );

    if (!updatedInstitute) {
      return NextResponse.json(
        { error: "Institute not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
