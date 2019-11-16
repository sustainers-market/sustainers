const validationErrorInfo = require("../utils/validation_error_info");

const deps = require("../../deps");

module.exports = dwolla => async (
  sustainerId,
  {
    firstName,
    lastName,
    ssn,
    dateOfBirth,
    address: { address1, address2, city, state, country, postalCode },
    passport: { number: passportNumber, country: passportCountry } = {}
  },
  { idempotencyKey } = {}
) => {
  try {
    const { body } = await dwolla.post(
      `customers/${sustainerId}/beneficial-owners`,
      {
        firstName,
        lastName,
        ssn,
        dateOfBirth,
        address: {
          address1,
          ...(address2 && { address2 }),
          city,
          stateProvinceRegion: state,
          country,
          postalCode
        },
        ...(passportNumber &&
          passportCountry && {
          passport: {
            number: passportNumber,
            country: passportCountry
          }
        })
      },
      idempotencyKey && { "Idempotency-Key": idempotencyKey }
    );

    return body;
  } catch (err) {
    switch (err.statusCode) {
    case 400:
      switch (err.code) {
      case "ValidationError":
        throw deps.badRequestError.businessSustainerAuthorityCreatingValidation(
          {
            info: validationErrorInfo(err),
            source: err
          }
        );
      default:
        throw deps.badRequestError.businessSustainerAuthority({
          info: { errors: [{ message: err.message }] },
          source: err
        });
      }
    case 403:
      throw deps.forbiddenError.businessSustainerAuthorityCreating({
        info: { errors: [{ message: err.message }] },
        source: err
      });
    default:
      throw deps.badRequestError.businessSustainerAuthority({
        info: { errors: [{ message: err.message }] },
        source: err
      });
    }
  }
};
