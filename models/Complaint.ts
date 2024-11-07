import mongoose, { Schema, Document, Model } from "mongoose";


interface IComplaint extends Document {
  vehicleType: string;
  description: string;
  contactInfo: string;
  location: string;
  problemType: string;
  additionalNotes?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}


const ComplaintSchema: Schema = new Schema({
  vehicleType: { type: String, required: true },
  description: { type: String, required: true },
  contactInfo: { type: String, required: true },
  location: { type: String, required: true },
  problemType: { type: String, required: true },
  additionalNotes: { type: String },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number },
  },
});


const Complaint: Model<IComplaint> =
  mongoose.models.Complaint ||
  mongoose.model<IComplaint>("Complaint", ComplaintSchema);

export default Complaint;
