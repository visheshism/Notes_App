import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../data/env.js";

import bcrypt from "bcrypt";

import { genArr } from "../utils/functions.js";


export const login = async (req, res, next) => {
    try {

        const { Email, Password } = req.body;


        const user = await User.findOne({ email: Email.toLowerCase() }).select("+password")

        if (!user) return res.render("login", { style: "display:inline-block;", message: "User doesn't exist with this email address", email: Email, password: Password })

        const isMatch = await bcrypt.compare(Password, user.password)

        if (!isMatch) return res.render("login", { style: "display:inline-block;", message: "Invalid Email or Password", email: Email, password: Password })

        const preDecode = jwt.sign({ userIty: user.userIty }, JWT_SECRET)

        const [__xq__sh1, _sh___token, __xq__sh2] = [jwt.sign({ _id: user._id }, JWT_SECRET), preDecode.slice(0, preDecode.length / 2) + ".pq_", "_md." + preDecode.slice(preDecode.length / 2)]


        res
            .cookie("_sh___token", _sh___token, {
                httpOnly: true,
                maxAge: 3 * 90 * 60 * 1000,
                sameSite: "strict",
                secure: true,
            })
            .cookie("__xq__sh2", __xq__sh2, {
                httpOnly: true,
                maxAge: 3 * 90 * 60 * 1000,
                sameSite: "strict",
                secure: true,
            })
            .cookie("__xq__sh1", __xq__sh1, {
                httpOnly: true,
                maxAge: 3 * 90 * 60 * 1000,
                sameSite: "strict",
                secure: true,
            })
            .redirect("/")

    } catch (error) {
        next(error)
    }

}

export const register = async (req, res, next) => {
    try {
        let userIty = genArr(20)
        const { Name, Email, Password } = req.body
        const emailToLower = Email.toLowerCase()
        let user = await User.findOne({ email: Email });

        if (user) return res.render("signup", { style: "display:inline-block;", message: "User already exists", email: Email.toLowerCase(), password: Password, name: Name })

        const hashedPassword = await bcrypt.hash(Password, 12)

        user = await User.create({ name: Name.charAt(0).toUpperCase() + Name.slice(1), email: Email.toLowerCase(), password: hashedPassword, userIty })

        const preDecode = jwt.sign({ userIty: user.userIty }, JWT_SECRET)

        const [__xq__sh1, _sh___token, __xq__sh2] = [jwt.sign({ _id: user._id }, JWT_SECRET), preDecode.slice(0, preDecode.length / 2) + ".pq_", "_md." + preDecode.slice(preDecode.length / 2)]


        res
            .cookie("_sh___token", _sh___token, {
                httpOnly: true,
                maxAge: 3 * 90 * 60 * 1000,
                sameSite: "strict",
                secure: true,
            })
            .cookie("__xq__sh2", __xq__sh2, {
                httpOnly: true,
                maxAge: 3 * 90 * 60 * 1000,
                sameSite: "strict",
                secure: true,
            })
            .cookie("__xq__sh1", __xq__sh1, {
                httpOnly: true,
                maxAge: 3 * 90 * 60 * 1000,
                sameSite: "strict",
                secure: true,
            })
            .redirect("/")

    } catch (error) {
        next(error)
    }
}

export const getMyProfile = (req, res, next) => {
    try {

        res.render("userNav", {
            name: req.user.name.charAt(0).toUpperCase() + req.user.name.slice(1)
        })

    } catch (error) {
        next(error)
    }

}

export const logout = (req, res, next) => {
    const { _sh___token, __xq__sh2, __xq__sh1 } = req.cookies;

    if (!(_sh___token || __xq__sh2 || __xq__sh1)) return next(new ErrorHandler("Login First", 404))


    res
        .cookie("_sh___token", "", {
            expires: new Date(Date.now()),
            sameSite: "none",
            secure: true,

        })
        .cookie("__xq__sh2", "", {
            expires: new Date(Date.now()),
            sameSite: "none",
            secure: true,

        })
        .cookie("__xq__sh1", "", {
            expires: new Date(Date.now()),
            sameSite: "none",
            secure: true,

        })
        .redirect("/")

}

export const updateEmail = async (req, res, next) => {
    try {
        const { userIty, _id } = req.creds

        const { newEmail } = req.body
        const oldEmail = req.user.email

        if (oldEmail === newEmail) return res.render("updateEmail", {
            style: "display:inline-block;", message: "New email address can't be same as the Current one", oldEmail, newEmail
        })

        const ifUserExists = await User.findOne({ email: newEmail })

        if (ifUserExists) return res.render("updateEmail", {
            style: "display:inline-block;", message: "Email address is already in use, try another one", newEmail, oldEmail
        })

        const user = await User.findOne({
            _id, userIty
        })

        user.email = newEmail
        await user.save()
        res.render("updateSuccess", {
            title: "Email", context: "Email"
        })
    } catch (error) {
        next(error)
    }
}

export const updatePassword = async (req, res, next) => {
    try {


        const { userIty, _id } = req.creds

        const { password1, password2 } = req.body

        if (password1 !== password2) return res.render("updatePassword", {
            style: "display:inline-block;", message: "Passwords don't match", password1, password2
        })

        const comparePass = await bcrypt.compare(password1, req.user.password)
        if (comparePass) return res.render("updatePassword", {
            style: "display:inline-block;", message: "New password can't be same as old one", password1, password2
        })

        const hashedPassword = await bcrypt.hash(password1, 12)

        const user = await User.findOne({ _id, userIty })
        user.password = hashedPassword
        await user.save()

        res.render("updateSuccess", {
            title: "Password", context: "Password"
        })
    } catch (error) {
        next(error)
    }
}
