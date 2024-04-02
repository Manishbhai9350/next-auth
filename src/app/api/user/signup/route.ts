import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/db_connect";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helper/mailer";
connect();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { username, email, password } = body;
    console.log(body);

    // finding if user exist
    const findedUser = await User.findOne({
      email,
    });

    // if there is an user then return error
    if (findedUser)
      return NextResponse.json({
        message: "Error user already exist",
        status: 400,
      });
    // generating hashed token using  bcrypt js
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // generating new user with info
    const newUser = await new User({
      email,
      username,
      password: hashedPass,
    });

    const savedUser = await newUser.save();

    // sending mail to user for verification
    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: savedUser._id,
    });

    // return the created user by next response 
    return NextResponse.json({
      message: "User registered successfuly",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}
