import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/db_connect";
import User from "@/models/userModel";

connect()

export async function POST(req:NextRequest) {
    try {
        const body = await req.json()
        const {token} = body

        const user = await User.findOne({
            verifyToken:token,
            verifyTokenEpiry:{
                $gt: Date.now()
            }
        })

        console.log('finded user while email verification'+user)
        console.log('token='+ token)
        if (!user ) {
            return NextResponse.json({
                message:'Token is expired',
                status:400
            })
        }

        console.log(user)

        user.idVerified  = true
        user.verifyTokenEpiry = undefined
        user.verifyToken = undefined

        await user.save()
        
        return NextResponse.json({
            message:'User verified succesfully',
            status:201
        })

    } catch (error:any) {
       return NextResponse.json({
            error:error.message,
            status:500
        })
    }
}