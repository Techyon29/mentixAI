import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAddress {
  city?: string;
  state?: string;
  country?: string;
}

export interface ISubscription {
  plan?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface IStats {
  teachersCount?: number;
  studentsCount?: number;
}

export interface IInstitute extends Document {
  instituteName: string;
  instituteCode: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  passwordHash: string;
  logo?: string;
  address?: IAddress;
  subscription?: ISubscription;
  stats?: IStats;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const InstituteSchema = new Schema<IInstitute>(
  {
    instituteName: {
      type: String,
      required: true,
    },
    instituteCode: {
      type: String,
      required: true,
      unique: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    ownerEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    ownerPhone: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
    address: {
      city: { type: String },
      state: { type: String },
      country: { type: String },
    },
    subscription: {
      plan: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
    },
    stats: {
      teachersCount: { type: Number, default: 0 },
      studentsCount: { type: Number, default: 0 },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "institutes",
  }
);

const Institute: Model<IInstitute> =
  mongoose.models.Institute || mongoose.model<IInstitute>("Institute", InstituteSchema);

export default Institute;