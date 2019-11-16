const validationErrorInfo = require("../utils/validation_error_info");

const deps = require("../../deps");

module.exports = dwolla => async (
  { firstName, lastName, email, businessName, ipAddress },
  { idempotencyKey } = {}
) => {
  try {
    const { body } = await dwolla.post(
      "customers",
      {
        firstName,
        lastName,
        email,
        ipAddress,
        ...(businessName && { businessName })
      },
      idempotencyKey && { "Idempotency-Key": idempotencyKey }
    );

    return body;
  } catch (err) {
    switch (err.statusCode) {
    case 400:
      switch (err.code) {
      case "ValidationError":
        throw deps.badRequestError.sustainerCreatingValidation({
          info: validationErrorInfo(err),
          source: err
        });
      default:
        throw deps.badRequestError.sustainer({
          info: { errors: [{ message: err.message }] },
          source: err
        });
      }
    case 403:
      throw deps.forbiddenError.sustainerCreating({
        info: { errors: [{ message: err.message }] },
        source: err
      });
    default:
      throw deps.badRequestError.sustainer({
        info: { errors: [{ message: err.message }] },
        source: err
      });
    }
  }
};
