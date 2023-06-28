const express = require("express");

const ctrl = require("../../controllers/contacts");

const isValidBody = require("../../middlewares/isValidBody");
const isValidParams = require("../../middlewares/isValidParams");
const isValidId = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, isValidParams(schemas.requestParamsSchema), ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, isValidBody(schemas.addSchema), ctrl.add);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  isValidBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  isValidBody(schemas.updateFavoriteSchema, "missing field favorite"),
  ctrl.updateFavorite
);

module.exports = router;
