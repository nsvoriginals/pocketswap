import { NextRequest, NextResponse } from "next/server";
import { paymentService } from "@/lib/services/paymentService";

export async function POST(req: NextRequest) {

    const { senderId, recieverId, amount } = await req.json();

    try {
       
        const payment = await paymentService(senderId, recieverId, amount);

        
        return NextResponse.json({ message: "Payment Successful" }, { status: 200 });
    } catch (error: any) {
      
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
