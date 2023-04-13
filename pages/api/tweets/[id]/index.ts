import withHandler, { ResponseType } from "../../../../lib/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../lib/db";
import { withApiSession } from "../../../../lib/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
  } = req; //해당하는 post찾기
  const post = await db.post.findUnique({
    where: {
      id: +id!.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  res.json({ ok: true, post });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
