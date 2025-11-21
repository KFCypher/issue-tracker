import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { issueSchema } from "../../validationSchemas";
import { getServerSession } from "next-auth";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? (globalForPrisma.prisma = new PrismaClient());

export async function POST(request: NextRequest){
  const session = await getServerSession(); // Ensure the user is authenticated
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success) 
    return NextResponse.json(validation.error.issues, { status: 400});
  
  const newIssue = await prisma.issue.create({
    data: { title: body.title, 
            description: body.description }
  });

  return NextResponse.json(newIssue, { status: 201 });
}