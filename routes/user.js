import express from "express";
import { getMyProfile, register, login, logout, updateEmail, updatePassword } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { retrieveInf } from "../utils/features.js";
import { User } from "../models/user.js";

const router = express.Router();

router.get("/login", async (req, res, next) => {
    try {

        const { __xq__sh1, _sh___token, __xq__sh2 } = req.cookies;
        if (__xq__sh1 && _sh___token && __xq__sh2) {

            const { id__, userIty__ } = retrieveInf(_sh___token, __xq__sh2, __xq__sh1)
            const [userIty, _id] = [userIty__.userIty, id__._id]
            const user = await User.findOne({
                _id, userIty
            }).select("-_id -__v -userIty +password")
            if (user) return res.redirect("/")

        }

        res.render("login", { style: "display:none;" })
    } catch (error) {
        next(error)
    }
})

router.get("/new", async (req, res, next) => {
    try {
        const { __xq__sh1, _sh___token, __xq__sh2 } = req.cookies;
        if (__xq__sh1 && _sh___token && __xq__sh2) {

            const { id__, userIty__ } = retrieveInf(_sh___token, __xq__sh2, __xq__sh1)
            const [userIty, _id] = [userIty__.userIty, id__._id]
            const user = await User.findOne({
                _id, userIty
            }).select("-_id -__v -userIty +password")
            if (user) return res.redirect("/")

        }

        res.render("signup", { style: "display:none;" })
    } catch (error) {
        next(error)
    }
})

router.post("/new", register)

router.post("/login", login)

router.get("/logout", logout)

router.get("/me", isAuthenticated, getMyProfile)

router.get("/me/update_email", isAuthenticated, (req, res, next) => {
    try {
        res.render("updateEmail", { style: "display:none;", oldEmail: req.user.email })
    } catch (error) {
        next(error)
    }
})

router.post("/me/update_email", isAuthenticated, updateEmail)

router.get("/me/update_password", isAuthenticated, (req, res, next) => {
    try {
        res.render("updatePassword", { style: "display:none;" })
    } catch (error) {
        next(error)
    }
})

router.post("/me/update_password", isAuthenticated, updatePassword)

router.get("/me/update/email", isAuthenticated, (req, res, next) => {
    try {
        res.redirect("/me/update_email")
    } catch (error) {
        next(error)
    }
})

router.get("/me/update/password", isAuthenticated, (req, res, next) => {
    try {
        res.redirect("/me/update_password")
    } catch (error) {
        next(error)
    }
})

export default router;