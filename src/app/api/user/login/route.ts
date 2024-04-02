import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/db_connect";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

connect();

export async function POST(req: NextRequest) {
  try {


    const body = await req.json();
    const { username, email, password } = body;
    console.log(body);

    const user = await User.findOne({ 
        email, //email
    })

    if (!user) {
        return NextResponse.json({
            message:'User does not exist'
        })
    }

    console.log(user)

    // mathing the password
    const isValidPass = await bcrypt.compare(password,user.password)

    if (!isValidPass) {
        return NextResponse.json({
            message:'Check your credentials',
            status:400
        })
    }

    // Use is jwt json web token to generate token and watch further video of chai or code
    
    const tokenData = {
      id:user._id,
      username:user.username,
      email:user.email
    }

    const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{
      expiresIn:'1d'
    })

    const response = NextResponse.json({
      message:'User login succesfully',
      succes:true,
    })

    response.cookies.set('token',token,{
      httpOnly:true
    })


    return response



  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
