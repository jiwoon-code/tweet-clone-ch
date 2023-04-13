import withHandler, { ResponseType } from "../../../../lib/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../lib/db";
import { withApiSession } from "../../../../lib/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
  } = req;
  const favs = await db.fav.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      post: {
        include: {
          _count: {
            select: {
              favs: true,
            },
          },
        },
      },
    },
  });
  res.json({
    ok: true,
    favs,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
