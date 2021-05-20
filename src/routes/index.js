const express = require("express");

// routes
const authRoutes = require("./auth");
const busDetailRoutes = require("./bus_detail");
const checklistRoutes = require("./checklist");
const webGoalRoutes = require("./web_goal");
const adServiceRoutes = require("./ad_service");
const adOfferRoutes = require("./ad_offer");
const mediaPostingRoutes = require("./media_posting");
const mediaAccountRoutes = require("./media_account");
const mediaWebRoutes = require("./media_website");
const logoDesignRoutes = require("./logo_design");
const aboutRoutes = require("./about");
const companyDetailRoutes = require("./company_detail");

// middlrwares
const isAuthMiddleware = require("../middlewares/is_auth");

const router = express.Router();
router.use("/auth", authRoutes);
router.use("/bus-detail", isAuthMiddleware, busDetailRoutes);
router.use("/checklist", isAuthMiddleware, checklistRoutes);
router.use("/web-goal", isAuthMiddleware, webGoalRoutes);
router.use("/ad-service", isAuthMiddleware, adServiceRoutes);
router.use("/ad-offer", isAuthMiddleware, adOfferRoutes);
router.use("/social-media-post", isAuthMiddleware, mediaPostingRoutes);
router.use("/social-media-account", isAuthMiddleware, mediaAccountRoutes);
router.use("/social-media-web", isAuthMiddleware, mediaWebRoutes);
router.use("/logo-design", isAuthMiddleware, logoDesignRoutes);
router.use("/about", isAuthMiddleware, aboutRoutes);
router.use("/company-detail", isAuthMiddleware, companyDetailRoutes);

module.exports = router;
