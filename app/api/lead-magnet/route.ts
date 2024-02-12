import { prismadb } from "@/lib/prismadb";
import { NextResponse } from "@/node_modules/next/server";
import {currentUser, auth} from "@clerk/nextjs";
import { parse } from "path";
import { leadMagnetCreateRequest, leadMagnetUpdateRequest } from "./schema";
import { z } from "zod";

async function handleRequest(
    request: Request,
    schema: z.ZodType<any, any>,
    isUpdate = false
  ) {
    const user = await currentUser();

    if (!user || !user.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;
    const requestData = await request.json();
    const parsed = schema.safeParse(requestData);
    if (!parsed.success){
        return NextResponse.json({message: parsed.error.message
        }, {status:400})
    }
    if (isUpdate && parsed.data.userId !== userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    const data = {
        ...parsed.data,
        userId: userId,
      };
    const updatedLeadMagnet = isUpdate
    ? await prismadb.leadMagnet.update({ where: { id: data.id }, data })
    : await prismadb.leadMagnet.create({ data });

  return NextResponse.json(
    {
      message: isUpdate ? "Successfully updated Lead Magnet!": "Successfully created Lead Magnet!",
      data: updatedLeadMagnet,
    },
    { status: isUpdate ? 200 : 201 }
  );  
  }
  
export const POST = (request: Request) =>
  handleRequest(request, leadMagnetCreateRequest);
export const PUT = (request: Request) =>
  handleRequest(request, leadMagnetUpdateRequest, true);
export async function DELETE (request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const user = await currentUser();

    if (!user || !user.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!id) {
        return NextResponse.json(
        { message: "No id provided", success: false },
        { status: 400 }
        );
    }
    const leadMagnet = await prismadb.leadMagnet.findFirst({
        where: { id },
      });
    
    if (!leadMagnet) {
    return NextResponse.json(
        { message: "Lead magnet not found", success: false },
        { status: 404 }
    );
    }
    if (leadMagnet.userId !== user.id)
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

    await prismadb.leadMagnet.delete({ where: { id } });

    return NextResponse.json(
        {
        message: "Successfully deleted lead magnet",
        success: true,
        },
        { status: 202 }
    );
}