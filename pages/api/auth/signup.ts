import { hashPassword } from "lib/auth"
import short from "short-uuid"
import dbConnect from "lib/dbConnect"
import User from "models/user"
import Permissions from "models/permissions"
import { NextApiRequest, NextApiResponse } from "next"

import AWS from "aws-sdk"
const { Buffer } = require("buffer")

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION,
  params: {
    Bucket: process.env.AWS_BUCKET_NAME
  }
})

const getImageBuffer = (base64: string) => {
  const base64Str = base64.slice(22, base64.length)
  return Buffer.from(base64Str, "base64")
}

const uploadImage = (path: string, buffer: Buffer) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: path,
    Body: buffer,
    ContentEncoding: "base64",
    ContentType: "image/jpeg",
    ACL: "public-read",
    CacheControl: "no-cache",
    Expires: new Date()
  }

  return new Promise((resolve, reject) => {
    // @ts-expect-error
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data.Location)
      }
    })
  })
}

const handleUploadImage = async (buffer: Buffer, uid: string) => {
  // const newBuffer = getImageBuffer(base64);
  return await uploadImage(`${uid}/profile_picture.png`, buffer)
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(500).json({ message: "Route not valid" })
    return
  }
  const data = req.body
  const { fullName, username, email, password } = data

  await dbConnect()

  const generateUid = async () => {
    const uid = short.generate()
    try {
      const existingUid = await User.findOne({ uid: uid })
      if (existingUid) generateUid()
      return uid
    } catch (e: any) {
      e && console.log(e.message)
    }
  }

  const uid = await generateUid()

  const existingUsername = await User.findOne({
    username: username
  })

  if (existingUsername) {
    res.status(422).json({ message: "Username already exists" })
    return
  }

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long."
    })
    return
  }

  const existingUser = await User.findOne({ email: email })

  if (existingUser) {
    res.status(422).json({ message: "User exists already!" })
    return
  }

  const hashedPassword = await hashPassword(password)

  try {
    await User.create({
      uid,
      verified: false,
      fullName,
      email,
      password: hashedPassword,
      username,
      image: "new",
      bio: "",
      listings: [],
      favorites: [],
      links: [],
      following: [],
      followers: 0,
      rating: "none"
    })

    await Permissions.create({
      uid,
      permissions: ["user:read", "user:write"]
    })

    res.status(201).json({ message: "Created user!" })
  } catch (e: any) {
    res.status(417).json({ message: "Something went wrong" })
    e && console.log(e.message)
  }
}

export default handler
