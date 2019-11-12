const validationErrorInfo = require("./utils/validation_error_info");

const deps = require("../deps");

module.exports = dwolla => async (
  id,
  {
    email,
    ipAddress,
    address1,
    address2,
    city,
    state,
    postalCode,
    website,
    phone
  },
  { idempotencyKey } = {}
) => {
  try {
    const { body } = await dwolla.post(
      `customers/${id}`,
      {
        ...(email && { email }),
        ...(ipAddress && { ipAddress }),
        ...(address1 && { address1 }),
        ...(address2 && { address2 }),
        ...(city && { city }),
        ...(state && { state }),
        ...(postalCode && { postalCode }),
        ...(website && { website }),
        ...(phone && { phone })
      },
      idempotencyKey && { "Idempotency-Key": idempotencyKey }
    );

    return body;
  } catch (err) {
    switch (err.statusCode) {
    case 400:
      switch (err.code) {
      case "ValidationError":
        throw deps.badRequestError.sustainerUpdatingValidation({
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
      throw deps.forbiddenError.sustainerUpdating({
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
