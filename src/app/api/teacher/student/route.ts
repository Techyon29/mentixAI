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
    const { name, email, class: studentClass, section, rollNo, instituteId, profileImage, isActive } = body;

    if (!name || !email || !studentClass || !section || !rollNo) {
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

    let finalInstituteId = instituteId;
    if (!finalInstituteId) {
      try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (token) {
          const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_jwt_secret") as any;
          const teacher = await User.findById(decoded.id);
          if (teacher) {
            finalInstituteId = teacher.instituteId;
          }
        }
      } catch (err) {
      }
    }

    const firstWord = name.trim().split(/\s+/)[0];
    const password = `${firstWord}${rollNo}`;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newStudent = new User({
      name,
      email,
      passwordHash,
      role: "student",
      instituteId: finalInstituteId,
      profileImage,
      isActive: isActive !== undefined ? isActive : true,
      extra: {
        class: studentClass,
        section,
        rollNo,
      },
    });

    await newStudent.save();

    const { passwordHash: _, ...studentResponse } = newStudent.toObject();

    return NextResponse.json(
      { message: "Student created successfully", student: studentResponse },
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

    let instituteId: string | undefined;
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value;
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_jwt_secret") as any;
        const teacher = await User.findById(decoded.id);
        if (teacher) {
          instituteId = teacher.instituteId?.toString();
        }
      }
    } catch (err) {
    }

    const query = { role: "student" } as any;
    if (instituteId) {
      query.instituteId = instituteId;
    }

    const students = await User.find(query).select("-passwordHash");

    return NextResponse.json({ students }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

