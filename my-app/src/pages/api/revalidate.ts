// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  revalidated: boolean;
  messege?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.query.token !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ revalidated: false, messege: "insert correct token" });
  }
  if (req.query.data === "product") {
    try {
      await res.revalidate("/product/static");
      return res.json({ revalidated: true });
    } catch (error) {
      return res.status(500).send({ revalidated: false });
    }
  }
  return res.json({
    revalidated: false,
    messege: "pilih data yg mau di revalidate",
  });
}
