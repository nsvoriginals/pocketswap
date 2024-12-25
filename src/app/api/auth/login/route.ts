import { NextRequest, NextResponse } from "next/server";
import { loginService } from "@/lib/services/userService";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  
  try {
    const token = await loginService({ email, password });
    
    if (!token) {
      return NextResponse.json({ message: "User could not login" }, { status: 401 });
    }
    
    return NextResponse.json({ "auth token": token }, { status: 200 });
  } catch (error:any) {
    console.error('Login error:', error); 
    return NextResponse.json({ message: error.message || "Login failed" }, { status: 400 });
  }
}

export function GET() {
  return NextResponse.json({ message: "hi there" });
}
