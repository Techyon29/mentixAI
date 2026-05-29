import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "@/src/utils/db";
import User from "@/src/models/user";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, email, password, instituteId, profileImage, isActive } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newTeacher = new User({
      name,
      email,
      passwordHash,
      role: "teacher",
      instituteId,
      profileImage,
      isActive: isActive !== undefined ? isActive : true,
    });

    await newTeacher.save();

    const { passwordHash: _, ...teacherResponse } = newTeacher.toObject();

    return NextResponse.json(
      { message: "Teacher created successfully", teacher: teacherResponse },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await connectDB();

    let instituteId: string | null = null;

    // 1. Try to get it from query params
    const { searchParams } = new URL(request.url);
    instituteId = searchParams.get("instituteId");

    // 2. If not in query params, try to get it from the token cookie
    if (!instituteId) {
      try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (token) {
          const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_jwt_secret") as any;
          if (decoded.role === "teacher" || decoded.role === "student") {
            const user = await User.findById(decoded.id);
            if (user) {
              instituteId = user.instituteId?.toString() || null;
            }
          } else {
            instituteId = decoded.id;
          }
        }
      } catch (err) {
      }
    }

    if (!instituteId) {
      return NextResponse.json(
        { error: "Institute ID is required" },
        { status: 400 }
      );
    }

    const teachers = await User.find({ role: "teacher", instituteId }).select("-passwordHash");

    return NextResponse.json({ teachers }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
