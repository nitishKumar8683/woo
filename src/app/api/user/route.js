import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found", success: false });
        }
        console.log("user exits");

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ message: "Invalid password", success: false });
        }

        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
            expiresIn: "1h",
        });


        const response = NextResponse.json({
            message: "Login Successfull",
            success: true,
            tokenData,
        });

        response.cookies.set("token", token, { httpOnly: true, path: "/" });

        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
