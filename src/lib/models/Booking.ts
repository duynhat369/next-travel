// models/Booking.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  userId: mongoose.Types.ObjectId;
  tourId: mongoose.Types.ObjectId;
  bookingDate: Date;
  tourStartDate: Date;
  tourEndDate: Date;
  numberOfParticipants: number;
  phoneNumber: string;
  status: 'pending' | 'approved' | 'cancelled';
  statusHistory: Array<{
    status: string;
    changedBy?: mongoose.Types.ObjectId;
    changedAt: Date;
    reason?: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tourId: {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
      required: true,
    },
    bookingDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    tourStartDate: {
      type: Date,
      required: true,
    },
    tourEndDate: {
      type: Date,
      required: true,
    },
    numberOfParticipants: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'cancelled'],
      default: 'pending',
    },
    statusHistory: [
      {
        status: String,
        changedBy: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        changedAt: {
          type: Date,
          default: Date.now,
        },
        reason: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

let BookingModel: mongoose.Model<IBooking>;

export function getBookingModel(): mongoose.Model<IBooking> {
  if (!BookingModel) {
    BookingModel = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
  }
  return BookingModel;
}

export default getBookingModel;
