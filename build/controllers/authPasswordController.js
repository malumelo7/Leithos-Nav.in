"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserCredencials = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
const generateAccessToken_1 = require("./generateAccessToken");
const generateRefreshToken_1 = require("./generateRefreshToken");
const prisma = new client_1.PrismaClient();
async function checkUserCredencials(req, res, next) {
    const { email, password } = req.body;
    const findUserPassword = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    try {
        if (await (0, bcrypt_1.compare)(password, findUserPassword.password)) {
            const accessToken = (0, generateAccessToken_1.generateAccessToken)({ email });
            const refreshToken = (0, generateRefreshToken_1.generateRefreshToken)({ email });
            res.json({ accessToken: accessToken, refreshToken: refreshToken });
        }
        else {
            res.send('Not Allowed');
        }
    }
    catch (_a) {
        res.status(500).send();
    }
}
exports.checkUserCredencials = checkUserCredencials;