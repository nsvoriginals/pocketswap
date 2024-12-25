import { NextRequest,NextResponse } from "next/server";
import { registerService } from "@/lib/services/userService";

export async function POST(req:NextRequest){
    const { name, email, password } = await req.json();
    try{
          const user = await registerService({name,email,password})
          return NextResponse.json({message:"Registration Successful"},{status:201})
    }catch(error){
         console.log(error)
         return NextResponse.json({message:"Registration failed"},{status:400})
    }
}