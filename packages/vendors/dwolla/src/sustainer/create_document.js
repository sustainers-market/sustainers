const validationErrorInfo = require("../utils/validation_error_info");

const deps = require("../../deps");

module.exports = dwolla => async (
  id,
  { data, filename, contentType, knownLength },
  { type },
  { idempotencyKey } = {}
) => {
  try {
    const body = new deps.FormData();

    body.append("file", Buffer.from(data), {
      filename,
      contentType,
      knownLength
    });

    body.append("documentType", type);

    const { headers } = await dwolla.post(
      `customers/${id}/documents`,
      body,
      idempotencyKey && { "Idempotency-Key": idempotencyKey }
    );

    return headers.get("location");
  } catch (err) {
    switch (err.statusCode) {
    case 400:
      switch (err.code) {
      case "ValidationError":
        throw deps.badRequestError.sustainerDocumentCreatingValidation({
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
      throw deps.forbiddenError.sustainerDocumentCreating({
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
