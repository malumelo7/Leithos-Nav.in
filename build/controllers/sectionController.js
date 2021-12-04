"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableBedsfromAllSections = exports.getBedsPerSection = exports.getAllSections = exports.createSection = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function createSection(req, res) {
    const { id } = req.body;
    const section = await prisma.section.create({
        data: {
            id: id
        }
    });
    res.json(section);
}
exports.createSection = createSection;
async function getAllSections(req, res) {
    const allSections = await allSectionsFunc();
    res.send({
        allSections
    });
}
exports.getAllSections = getAllSections;
async function getBedsPerSection(req, res) {
    const { sectionId } = req.params;
    const bedsPerSection = await prisma.beds.findMany({
        where: {
            sectionId: sectionId
        }
    });
    res.send({
        bedsPerSection
    });
}
exports.getBedsPerSection = getBedsPerSection;
async function getAvailableBedsfromAllSections(req, res) {
    const availableBedsFromAllSections = await availableBedsFromAllSectionsFunc();
    const allBedsFromAllSections = await allBedsFromAllSectionsFunc();
    res.send({
        availableBedsFromAllSections,
        allBedsFromAllSections
    });
}
exports.getAvailableBedsfromAllSections = getAvailableBedsfromAllSections;
async function getBedsPerSectionQuantity(section) {
    const bedsPerSection = await prisma.beds.count({
        where: {
            sectionId: section
        }
    });
    return bedsPerSection;
}
async function allSectionsFunc() {
    const allSections = await prisma.section.findMany();
    return allSections;
}
async function availableBedsFromAllSectionsFunc() {
    const allSections = await prisma.section.findMany();
    const allSectionArray = Object.values(allSections);
    const responseArray = [];
    for (let index = 0; index < allSectionArray.length; index += 1) {
        const getAvailableBedsPerSection = await getAvailableBedsPerSectionQuantity(allSectionArray[index].id);
        responseArray.push({ "section": allSectionArray[index].id, "quantity": getAvailableBedsPerSection });
    }
    return responseArray;
}
async function allBedsFromAllSectionsFunc() {
    const allSections = await prisma.section.findMany();
    const allSectionArray = Object.values(allSections);
    const responseArray = [];
    for (let index = 0; index < allSectionArray.length; index += 1) {
        const getBedsPersectionQtd = await getBedsPerSectionQuantity(allSectionArray[index].id);
        responseArray.push({ "section": allSectionArray[index].id, "quantity": getBedsPersectionQtd });
    }
    return responseArray;
}
async function getAvailableBedsPerSectionQuantity(sectionId) {
    const availableBedsPerSection = await prisma.beds.count({
        where: {
            status: 'AVAILABLE',
            sectionId: sectionId
        }
    });
    return availableBedsPerSection;
}
async function getOccupiedBedsPerSectionQuantity(req, res) {
    const { section } = req.params;
    const occupiedBedsPerSection = await prisma.beds.count({
        where: {
            status: 'OCCUPIED',
            sectionId: section
        }
    });
    res.send({
        occupiedBedsPerSection
    });
}
async function getNeedCleaningBedsPerSectionQuantity(req, res) {
    const { section } = req.params;
    const needCleaningBedsPerSection = await prisma.beds.count({
        where: {
            sectionId: section,
            status: 'CLEANING_NEEDED'
        }
    });
    res.send({
        needCleaningBedsPerSection
    });
}
async function getNeedMaintanenceBedsPerSectionQuantity(req, res) {
    const { section } = req.params;
    const needMaintanenceBedsPerSection = await prisma.beds.count({
        where: {
            status: 'MAINTANENCE_NEEDED',
            sectionId: section
        }
    });
    res.send({
        needMaintanenceBedsPerSection
    });
}
async function getCleaningBedsPerSectionQuantity(req, res) {
    const { section } = req.params;
    const cleaningBedsPerSection = await prisma.beds.count({
        where: {
            status: 'CLEANING',
            sectionId: section
        }
    });
    res.send({
        cleaningBedsPerSection
    });
}
async function getMaintenenceBedsPerSectionQuantity(req, res) {
    const { section } = req.params;
    const maintanenceBedsPerSection = await prisma.beds.count({
        where: {
            status: 'MAINTANENCE',
            sectionId: section
        }
    });
    res.send({
        maintanenceBedsPerSection
    });
}
