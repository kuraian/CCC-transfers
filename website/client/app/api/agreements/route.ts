import { NextApiRequest } from "next";
import clientPromise from "../../../lib/mongodb";

export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("schools");

    const agreements = await db.collection("deanza_2023").find().toArray();
    return Response.json(agreements);
  } catch (e) {
    console.error(e);
  }
}
