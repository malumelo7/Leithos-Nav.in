"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sectionController_1 = require("../controllers/sectionController");
const authenticateToken_1 = require("../middleware/authenticateToken");
const router = (0, express_1.Router)();
router.get('/getAllSections', authenticateToken_1.authenticateToken, sectionController_1.getAllSections);
router.post('/createSection', authenticateToken_1.authenticateToken, sectionController_1.createSection);
module.exports = router;
