import Conscient from "../../../../models/conscientModel";
import { connect } from "@/db/dbConfig";
import { NextResponse } from "next/server";

connect()

export async function POST(req) {
    try {
        const reqBody = await req.json()

        const { childName, guardianName, phoneNumber, address, timeIn, dob, timeOut } = reqBody

        const extingUser = await Conscient.findOne({ phoneNumber })
        if (extingUser) {
            return NextResponse.json({
                message: "Phone Number already exists",
                status: 400,
                success: false,
            });
        }

        const newConscient = new Conscient({
            childName,
            guardianName,
            phoneNumber,
            address,
            timeIn,
            dob,
            timeOut,
            isDelete: ""
        })

        const savedConscient = await newConscient.save()
        console.log(savedConscient)
        return NextResponse.json({
            message: "Consent form save successfully",
            savedConscient,
            success: true,
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Error creating user",
                error: error.message,
            },
            { status: 500 },
        );
    }
}