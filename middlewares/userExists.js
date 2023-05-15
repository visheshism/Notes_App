import { Note } from "../models/note.js";
import { User } from "../models/user.js";
import { retrieveInf } from "../utils/features.js";

export const checkUser = async (req, res, next) => {
    try {

        const { _sh___token, __xq__sh2, __xq__sh1 } = req.cookies
        if (!(__xq__sh1 || _sh___token || __xq__sh2)) {
            console.log("One/All of the cookies missing !")
            console.log("Cookies: ", _sh___token, __xq__sh2, __xq__sh1)
            console.log("Clearing it all")
            console.log("Clearing Done !!!")

            return res.cookie("_sh___token", "", { expires: new Date(Date.now()), }).cookie("__xq__sh2", "", { expires: new Date(Date.now()), }).cookie("__xq__sh1", "", { expires: new Date(Date.now()), }).redirect("/login")
        }

        const { userIty__, id__ } = retrieveInf(_sh___token, __xq__sh2, __xq__sh1)

        const user = await User.findOne({ _id: id__._id, userIty: userIty__.userIty })


        if (!user) {
            console.log("Couldn't find user with the cookies saved")
            console.log("Clearing 'em all")
            console.log("Done !!")
            return res.cookie("_sh___token", "", { expires: new Date(Date.now()), }).cookie("__xq__sh2", "", { expires: new Date(Date.now()), }).cookie("__xq__sh1", "", { expires: new Date(Date.now()), }).redirect("/login")
        }
        const notes = await Note.find({ user: id__ })

        res
            .cookie("_sh___token", _sh___token, {
                httpOnly: true,
                maxAge: 90 * 60 * 1000,
                sameSite: "Strict",
                secure: true,
            })
            .cookie("__xq__sh2", __xq__sh2, {
                httpOnly: true,
                maxAge: 90 * 60 * 1000,
                sameSite: "Strict",
                secure: true,
            })
            .cookie("__xq__sh1", __xq__sh1, {
                httpOnly: true,
                maxAge: 90 * 60 * 1000,
                sameSite: "Strict",
                secure: true,
            })
            .render("index", { notes })

    } catch (error) {
        console.log(error)
        next(error)
    }
}   