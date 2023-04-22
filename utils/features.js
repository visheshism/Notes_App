import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../data/env.js";

export const sendCookie = (user, res, message, statusCode = 200) => {

    const preDecode = jwt.sign({ userIty: user.userIty }, JWT_SECRET)
    const [__xq__sh1, _sh___token, __xq__sh2] = [jwt.sign({ _id: user._id }, JWT_SECRET), preDecode.slice(0, preDecode.length / 2) + ".pq_", "_md." + preDecode.slice(preDecode.length / 2)]


    res.status(statusCode)
        .cookie("_sh___token", _sh___token, {
            httpOnly: true,
            maxAge: 90 * 60 * 1000,
            // sameSite: "none",
            // secure: true,
        })
        .cookie("__xq__sh2", __xq__sh2, {
            httpOnly: true,
            maxAge: 90 * 60 * 1000,
            // sameSite: "none",
            // secure: true,
        })
        .cookie("__xq__sh1", __xq__sh1, {
            httpOnly: true,
            maxAge: 90 * 60 * 1000,
            // sameSite: "none",
            // secure: true,
        })
        .json({
            success: true,
            message
        })
}

export const retrieveInf = (_sh___token, __xq__sh2, __xq__sh1) => {
    const id__ = jwt.decode(__xq__sh1, JWT_SECRET)

    let code = ".pq__md."
    let alTogether = (_sh___token + __xq__sh2).split(code)
    alTogether = alTogether[0] + alTogether[1]

    const userIty__ = jwt.decode(alTogether, JWT_SECRET)

    return { userIty__, id__ }
}
