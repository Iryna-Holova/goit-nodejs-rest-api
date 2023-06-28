const express = require("express");

const ctrl = require("../../controllers/contacts");

const isValidBody = require("../../middlewares/isValidBody");
const isValidParams = require("../../middlewares/isValidParams");
const isValidId = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.use(authenticate)

router.get("/", isValidParams(schemas.requestParamsSchema), ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", isValidBody(schemas.addSchema), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  isValidId,
  isValidBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isValidBody(schemas.updateFavoriteSchema, "missing field favorite"),
  ctrl.updateFavorite
);

module.exports = router;
