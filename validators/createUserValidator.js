const { body, param } = require("express-validator");
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


const emailCheck = () => {
    return body("email").isEmail().custom(async value => {
        console.log("working")
        const existingUser = await prisma.User.findMany({
            where: {
                email: value
            }
        })
        console.log(existingUser)
        if (existingUser[0]) {
          console.log("error")
          // Will use the below as the error message
          throw new Error('A user already exists with this e-mail address');
        }
      });
}


module.exports = {emailCheck}