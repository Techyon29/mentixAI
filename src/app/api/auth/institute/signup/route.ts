import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import connectDB from "@/src/utils/db";
import Institute from "@/src/models/institute";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const {
      instituteName,
      ownerName,
      ownerEmail,
      ownerPhone,
      password,
      logo,
      address,
      subscription,
      stats,
      isActive,
    } = body;

    if (!instituteName || !ownerName || !ownerEmail || !ownerPhone || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingInstitute = await Institute.findOne({ ownerEmail });

    if (existingInstitute) {
      return NextResponse.json(
        { error: "Institute with this owner email already exists" },
        { status: 400 }
      );
    }

    const instituteCode = uuidv4();
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newInstitute = new Institute({
      instituteName,
      instituteCode,
      ownerName,
      ownerEmail,
      ownerPhone,
      passwordHash,
      logo,
      address,
      subscription,
      stats,
      isActive,
    });

    await newInstitute.save();

    return NextResponse.json(
      { message: "Institute created successfully", institute: newInstitute },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
