import db from "../../../lib/db";
import withHandler, { ResponseType } from "../../../lib/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 90000) + "";
  const token = await db.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  /*   if (phone) {
    const message = await twiliodb.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.MY_PHONE!,
      body: "Your login token is payload",
    });
    console.log(message);
  }
  if (email) {
    const mailOptions = {
      from: process.env.MAIL_ID,
      to: email,
      subject: "Nomad Carrot Authentication Email",
      text: `Authentication Code : ${payload}`,
    };
    const result = await smtpTransport.sendMail(
      mailOptions,
      (error, responses) => {
        if (error) {
          console.log(error);
          return null;
        } else {
          console.log(responses);
          return null;
        }
      }
    );
    smtpTransport.close();
    console.log(result);
  } */
  // 줄바꿈 ㅎㅅㅎ
  /*  if (email) {
    user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (user) console.log("found it");
    if (!user) {
      user = await db.user.create({
        data: {
          name: "Anonymous",
          email,
        },
      });
    }
    console.log(user);
  }
  if (phone) {
    user = await db.user.findUnique({
      where: {
        phone: +phone,
      },
    });
    if (user) console.log("found it");
    if (!user) {
      user = await db.user.create({
        data: {
          name: "Anonymous",
          phone: +phone,
        },
      });
    }
    console.log(user);
  } */
  return res.json({
    ok: true,
  });
}

export default withHandler({
  methods: ["POST"],
  handler,
  isPrivate: false,
});
