import { User } from "../models/user.js";
import { retrieveInf } from "../utils/features.js";
import { currentDateTime } from "../utils/functions.js";

export const isAuthenticated = async (req, res, next) => {
    try {

        const { __xq__sh1, _sh___token, __xq__sh2 } = req.cookies;

        if (!(__xq__sh1 || _sh___token || __xq__sh2)) return res.redirect("/")

        const { id__, userIty__ } = retrieveInf(_sh___token, __xq__sh2, __xq__sh1)

        const [userIty, _id] = [userIty__.userIty, id__._id]

        req.user = await User.findOneAndUpdate({
            _id, userIty
        }, {
            lastAccessed: currentDateTime()
        }).select({ password: 1, name: 1, email: 1, _id: 0 })

        req.creds = { userIty, _id }

        next()

    } catch (err) {
        next(err)
    }
}
