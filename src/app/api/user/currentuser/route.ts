import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/services/userService";

export async function GET(req: NextRequest) {
  const header = req.headers.get('Authorization');
  const token= header && header.split(' ')[1];
  console.log(token)
  try {
    const currentUser = await getCurrentUser(token);

    if (!currentUser) {

      return NextResponse.json({ message: "Current User not found" }, { status: 401 });
    }
    return NextResponse.json(currentUser, { status: 200 });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ message: error.message || "Error fetching current user" }, { status: 400 });
  }
}
