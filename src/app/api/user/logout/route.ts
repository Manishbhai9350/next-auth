import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/db_connect";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


export async function POST(req: NextRequest) {
    try {

        const response = NextResponse.json({
            message:'Log out succesfully',
            succes:true
        })

        response.cookies.set('token','',{
            httpOnly:true
        })
        

        return response
    } catch (error:any) {
        return NextResponse.json({
            error: error.message,
            status: 500,
          });
    }

}