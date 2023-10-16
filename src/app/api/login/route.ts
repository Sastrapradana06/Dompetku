import { NextRequest } from "next/server";

export async function GET(req:NextRequest) {
  const request = req.json()
  console.log({request});
  
}