const deps = require("../../deps");

module.exports = dwolla => async id => {
  try {
    const {
      body: { status }
    } = await dwolla.get(`customers/${id}/beneficial-ownership`, {});

    return {
      status
    };
  } catch (err) {
    switch (err.statusCode) {
      case 404:
        throw deps.resourceNotFoundError.sustainer({
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
