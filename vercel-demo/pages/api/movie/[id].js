import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  const { id } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const movies = await db
      .collection("movies")
      .find({ _id: ObjectId(id) })
      .toArray();

    res.json(movies);
  } catch (e) {
    console.error(e);
  }
};
