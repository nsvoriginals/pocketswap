import { NextRequest, NextResponse } from "next/server";
import { getAllUsers } from "@/lib/services/paymentService";

export async function GET (res:NextRequest){
    try{
        const users=await getAllUsers();
       if(!users){
        return NextResponse.json({message:"users not found"})
       }   
       return NextResponse.json({users},{status:200})
     
    }catch(error){
        return NextResponse.json({message:"ERROR "},{status:404})
    }
}