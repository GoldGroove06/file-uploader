async function getSignin(req, res) {
    try {
        res.render("signin")
    } catch {
        console.log("error in GETSigin")
    }
}

async function postSignin(req, res) {
    try {
        const { email, password } = req.body
        console.log(email, password)
        res.status(200).send("signin successful")
    }
    catch (error) {
        console.error(error)
        console.log("error in PostSigin")
    }
}

module.exports = { getSignin, postSignin }