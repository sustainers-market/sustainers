const deps = require("../deps");

module.exports = dwolla => async (id, { idempotencyKey } = {}) => {
  try {
    const { body } = await dwolla.delete(
      `beneficial-owners/${id}`,
      {},
      idempotencyKey && { "Idempotency-Key": idempotencyKey }
    );

    return body;
  } catch (err) {
    switch (err.statusCode) {
    case 404:
      throw deps.resourceNotFound.businessSustainerAuthority({
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
