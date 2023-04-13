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
    session: { user },
  } = req;
  const alreadyExists = await db.fav.findFirst({
    where: {
      postId: +id!.toString(),
      userId: user?.id,
    },
  });
  if (alreadyExists) {
    await db.fav.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await db.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        post: {
          connect: {
            id: +id!.toString(),
          },
        },
      },
    });
  }
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
