const { resourceNotFound } = require("@blossm/errors");

module.exports = {
  businessSustainerAuthority: ({ cause, info } = {}) =>
    resourceNotFound.message("This authority wasn't found.", {
      cause,
      info
    }),
  sustainer: ({ cause, info } = {}) =>
    resourceNotFound.message("This sustainer wasn't found.", {
      cause,
      info
    })
};
