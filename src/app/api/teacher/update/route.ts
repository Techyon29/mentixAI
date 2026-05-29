import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "@/src/utils/db";
import User from "@/src/models/user";

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

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

    const targetId = body.teacherId || (authRole === "teacher" ? authId : null);

    if (!targetId) {
      return NextResponse.json(
        { error: "Unauthorized or missing teacher ID" },
        { status: 401 }
      );
    }

    if (authRole === "teacher" && targetId !== authId) {
      return NextResponse.json(
        { error: "Unauthorized to update another teacher's profile" },
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

    const updateData: any = {};
    if (body.name !== undefined) updateData.name = body.name;
    if (body.profileImage !== undefined) updateData.profileImage = body.profileImage;
    if (body.isActive !== undefined) updateData.isActive = body.isActive;
    if (body.extra !== undefined) updateData.extra = body.extra;

    if (body.email !== undefined) {
      const existing = await User.findOne({ email: body.email, _id: { $ne: targetId } });
      if (existing) {
        return NextResponse.json(
          { error: "Email is already in use by another user" },
          { status: 400 }
        );
      }
      updateData.email = body.email;
    }

    const updatedTeacher = await User.findByIdAndUpdate(
      targetId,
      { $set: updateData },
      { new: true }
    ).select("-passwordHash");

    return NextResponse.json(
      { message: "Teacher updated successfully", teacher: updatedTeacher },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
