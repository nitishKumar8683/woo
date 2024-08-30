import mongoose from "mongoose";

const conscientSchema = new mongoose.Schema({
    childName: {
        type: String,
    },
    guardianName: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    address: {
        type: String
    },
    dob: {
        type: Date
    },
    timeIn: {
        type: String
    },
    timeOut: {
        type: String
    },
    isDelete: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Conscient = mongoose.models.conscients || mongoose.model("conscients", conscientSchema)

export default Conscient