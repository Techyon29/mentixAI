import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
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

    const newStudent = new User({
      name,
      email,
      passwordHash,
      role: "student",
      instituteId,
      profileImage,
      isActive: isActive !== undefined ? isActive : true,
    });

    await newStudent.save();

    return NextResponse.json(
      { message: "Student created successfully", student: newStudent },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
