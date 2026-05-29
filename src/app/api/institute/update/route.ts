import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "@/src/utils/db";
import Institute from "@/src/models/institute";

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    let instituteId: string | null = null;
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value;
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_jwt_secret") as any;
        instituteId = decoded.id;
      }
    } catch (err) {
    }

    const targetId = body.instituteId || instituteId;

    if (!targetId) {
      return NextResponse.json(
        { error: "Unauthorized or missing institute ID" },
        { status: 401 }
      );
    }

    const updateData: any = {};
    if (body.instituteName !== undefined) updateData.instituteName = body.instituteName;
    if (body.ownerName !== undefined) updateData.ownerName = body.ownerName;
    if (body.ownerPhone !== undefined) updateData.ownerPhone = body.ownerPhone;
    if (body.logo !== undefined) updateData.logo = body.logo;
    if (body.address !== undefined) updateData.address = body.address;
    if (body.subscription !== undefined) updateData.subscription = body.subscription;
    if (body.isActive !== undefined) updateData.isActive = body.isActive;

    if (body.ownerEmail !== undefined) {
      const existing = await Institute.findOne({ ownerEmail: body.ownerEmail, _id: { $ne: targetId } });
      if (existing) {
        return NextResponse.json(
          { error: "Email is already in use by another institute" },
          { status: 400 }
        );
      }
      updateData.ownerEmail = body.ownerEmail;
    }

    const updatedInstitute = await Institute.findByIdAndUpdate(
      targetId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedInstitute) {
      return NextResponse.json(
        { error: "Institute not found" },
        { status: 404 }
      );
    }

    const { passwordHash: _, ...instituteResponse } = updatedInstitute.toObject();

    return NextResponse.json(
      { message: "Institute updated successfully", institute: instituteResponse },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
