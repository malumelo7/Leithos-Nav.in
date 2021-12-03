"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYearlyInAndOuts = exports.getMonthlyInAndOuts = exports.getWeeklyInAndOuts = exports.getDailyInAndOuts = exports.getAllHistoric = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function getPatientIn(timeRange) {
    const date = new Date();
    const gmt = -3;
    const initialTimestamp = new Date(date.getFullYear(), date.getMonth(), date.getDate() - timeRange, gmt, 0, 0);
    const endTimestamp = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23 + gmt, 59, 59);
    const dailyIn = await prisma.historic.count({
        where: {
            lastBedStatus: 'AVAILABLE',
            newBedStatus: 'OCCUPIED',
            newDate: {
                gte: initialTimestamp,
                lte: endTimestamp
            }
        }
    });
    return dailyIn;
}
async function getPatientOut(timeRange) {
    const date = new Date();
    const gmt = -3;
    const initialTimestamp = new Date(date.getFullYear(), date.getMonth(), date.getDate() - timeRange, gmt, 0, 0);
    const endTimestamp = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23 + gmt, 59, 59);
    const dailyOut = await prisma.historic.count({
        where: {
            lastBedStatus: 'OCCUPIED',
            newDate: {
                gte: initialTimestamp,
                lte: endTimestamp
            }
        }
    });
    return dailyOut;
}
async function getAllHistoric(req, res) {
    const allHistoric = await prisma.historic.findMany();
    res.send({
        allHistoric
    });
}
exports.getAllHistoric = getAllHistoric;
async function getDailyInAndOuts(req, res) {
    const dailyIn = await getPatientIn(0);
    const dailyOut = await getPatientOut(0);
    res.send({
        dailyIn,
        dailyOut
    });
}
exports.getDailyInAndOuts = getDailyInAndOuts;
async function getWeeklyInAndOuts(req, res) {
    const weeklyIn = await getPatientIn(7);
    const weeklyOut = await getPatientOut(7);
    res.send({
        weeklyIn,
        weeklyOut
    });
}
exports.getWeeklyInAndOuts = getWeeklyInAndOuts;
async function getMonthlyInAndOuts(req, res) {
    const monthlyIn = await getPatientIn(30);
    const monthlyOut = await getPatientOut(30);
    res.send({
        monthlyIn,
        monthlyOut
    });
}
exports.getMonthlyInAndOuts = getMonthlyInAndOuts;
async function getYearlyInAndOuts(req, res) {
    const yearlyIn = await getPatientIn(365);
    const yearlyOut = await getPatientOut(365);
    res.send({
        yearlyIn,
        yearlyOut
    });
}
exports.getYearlyInAndOuts = getYearlyInAndOuts;
