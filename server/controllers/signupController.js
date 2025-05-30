import { validationResult } from "express-validator";
import { genSalt, hash } from "bcryptjs";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


async function getSignup(req, res) {
  try {
    res.render("signup")
  }
  catch {
    console.log("error in Sigup")
  }
}

async function postSignup(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, confirmPassword } = req.body

    if (password != confirmPassword) {
      return res.status(400).json({ errors: "password doest match" });
    }

    if (name && email && password) {
      const salt = await genSalt(10)
      const hashedPassword = await hash(password, salt)
      await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword
        }
      })

      await prisma.folder.create({
        data: {
          name: "root",
          userEmail: email,
          parentId: null
        }
      })
      res.status(200).json({m:"signup successful"})
    }

    res.status(500).send("internal server error")




  }
  catch (error) {
    console.error(error)
    console.log("error in PostSigup")
  }
}

export default { getSignup, postSignup }