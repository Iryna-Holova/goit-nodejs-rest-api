const { Schema, model } = require("mongoose");
const Joi = require("joi");

const handleMongooseError = require("../helpers/handleMongooseError");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

contactSchema.post("save", handleMongooseError);

const phoneRegexp = /^\(\d{3}\)\s\d{3}-\d{4}$/;

const messages = {
  invalid: `{{#label}} field is invalid`,
  empty: `{{#label}} field is empty`,
  required: `missing required {{#label}} field`,
};

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": messages.invalid,
    "string.empty": messages.empty,
    "any.required": messages.required,
  }),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .messages({
      "string.base": messages.invalid,
      "string.empty": messages.empty,
      "any.required": messages.required,
      "string.email": "invalid email",
    }),
  phone: Joi.string().required().regex(phoneRegexp).messages({
    "string.base": messages.invalid,
    "string.empty": messages.empty,
    "any.required": messages.required,
    "string.pattern.base": "invalid phone number, (XXX) XXX-XXXX is required",
  }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "boolean.base": messages.invalid,
    "any.required": messages.required,
  }),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
