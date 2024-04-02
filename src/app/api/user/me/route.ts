import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/db_connect";
import User from "@/models/userModel";
import { dataFromToken } from "@/helper/dataFromToken";

connect()


export async function POST(req:NextRequest) {
    //got the id from req cookies
    const userId = await dataFromToken(req)

    const user = await User.findById(userId).select('-password')

    var res
    if (!user) {
        res = NextResponse.json({
            message:'Invalid Token',
            succes:false,
            status:500
        })

    }  else {
        res = NextResponse.json({
            message:'User found',
            succes:true,
            status:200,
            data:user
        })
    }

    return res

}