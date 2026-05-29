import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "@/src/utils/db";
import User from "@/src/models/user";

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { password, teacherId } = body;

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    let authId: string | null = null;
    let authRole: string | null = null;
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value;
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_jwt_secret") as any;
        authId = decoded.id;
        authRole = decoded.role || "institute";
      }
    } catch (err) {
    }

    const targetId = teacherId || (authRole === "teacher" ? authId : null);

    if (!targetId) {
      return NextResponse.json(
        { error: "Unauthorized or missing teacher ID" },
        { status: 401 }
      );
    }

    if (authRole === "teacher" && targetId !== authId) {
      return NextResponse.json(
        { error: "Unauthorized to update another teacher's password" },
        { status: 403 }
      );
    }

    const teacher = await User.findOne({ _id: targetId, role: "teacher" });
    if (!teacher) {
      return NextResponse.json(
        { error: "Teacher not found" },
        { status: 404 }
      );
    }

    if (authRole === "institute" && teacher.instituteId?.toString() !== authId) {
      return NextResponse.json(
        { error: "Unauthorized access to this teacher" },
        { status: 403 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await User.findByIdAndUpdate(targetId, { $set: { passwordHash } });

    return NextResponse.json(
      { message: "Teacher password updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
