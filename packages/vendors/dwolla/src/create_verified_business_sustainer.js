const validationErrorInfo = require("./utils/validation_error_info");

const deps = require("../deps");

module.exports = dwolla => async (
  {
    firstName,
    lastName,
    email,
    ipAddress,
    dateOfBirth,
    ssn,
    address1,
    address2,
    city,
    state,
    postalCode,
    businessName,
    businessType,
    businessClassification,
    ein,
    website,
    phone,
    controller: {
      firstName: controllerFirstName,
      lastName: controllerLastName,
      title: controllerTitle,
      dateOfBirth: controllerDateOfBirth,
      ssn: controllerSsn,
      passport: {
        number: controllerPassportNumber,
        country: controllerPassportCountry
      } = {},
      address: {
        address1: controllerAddress1,
        address2: controllerAddress2,
        city: controllerCity,
        stateProvinceRegion: controllerStateProvinceRegion,
        postalCode: controllerPostalCode,
        country: controllerCountry
      } = {}
    } = {}
  },
  { idempotencyKey } = {}
) => {
  const doesRequireController =
    businessType &&
    ["llc", "corporation", "partnership"].includes(businessType);

  const doesRequireEin =
    businessType &&
    ["llc", "corporation", "partnership"].includes(businessType);
  try {
    const { body } = await dwolla.post(
      "customers",
      {
        firstName,
        lastName,
        email,
        ipAddress,
        type: "business",
        dateOfBirth,
        ssn,
        address1,
        ...(address2 && { address2 }),
        city,
        state,
        postalCode,
        businessName,
        businessType,
        businessClassification,
        ...(doesRequireEin && { ein }),
        ...(website && { website }),
        ...(phone && { phone }),
        ...(doesRequireController && {
          controller: {
            firstName: controllerFirstName || firstName,
            lastName: controllerLastName || lastName,
            title: controllerTitle || "Owner",
            dateOfBirth: controllerDateOfBirth || dateOfBirth,
            ssn: controllerSsn || ssn,
            ...(controllerPassportNumber &&
              controllerPassportCountry && {
              passport: {
                number: controllerPassportNumber,
                country: controllerPassportCountry
              }
            }),
            address: {
              address1: controllerAddress1 || address1,
              ...((controllerAddress2 || address2) && {
                address2: controllerAddress2 || address2
              }),
              city: controllerCity || city,
              stateProvinceRegion: controllerStateProvinceRegion || state,
              postalCode: controllerPostalCode || postalCode,
              country: controllerCountry || "US"
            }
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
