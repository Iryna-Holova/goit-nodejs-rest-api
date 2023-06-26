const express = require("express");

const ctrl = require("../../controllers/contacts");

const isValidBody = require("../../middlewares/isValidBody");
const isValidId = require("../../middlewares/isValidId");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", isValidBody(schemas.addSchema), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  isValidId,
  isValidBody(schemas.addSchema, "missing fields"),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isValidBody(schemas.updateFavoriteSchema, "missing field favorite"),
  ctrl.updateFavorite
);

module.exports = router;
