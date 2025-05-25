import { Router } from "express";
const authRoute = Router()
import passport from "passport";
import { getSignin, postSignin } from "../controllers/signinController";
import { getSignup, postSignup } from "../controllers/signupController";
import { emailCheck } from "../validators/createUserValidator";


authRoute.get("/signin", getSignin)
authRoute.post("/signin", postSignin)


authRoute.get("/signup", getSignup)
authRoute.post("/signup", emailCheck(), postSignup)

export default authRoute