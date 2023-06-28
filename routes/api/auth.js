const express = require("express");

const ctrl = require("../../controllers/auth");

const isValidBody = require("../../middlewares/isValidBody");
const authenticate = require("../../middlewares/authenticate");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", isValidBody(schemas.registerSchema), ctrl.register);

router.post("/login", isValidBody(schemas.loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/subscription",
  authenticate,
  isValidBody(schemas.updateSubscriptionSchema, "missing field subscription"),
  ctrl.updateSubscription
);

module.exports = router;
