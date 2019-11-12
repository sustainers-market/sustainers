const { badRequest } = require("@blossm/errors");

module.exports = {
  sustainerUpdatingValidation: ({ cause, info } = {}) =>
    badRequest.message(
      "Some information was missing when updating this account.",
      {
        cause,
        info
      }
    ),
  sustainerCreatingValidation: ({ cause, info } = {}) =>
    badRequest.message(
      "Some information was missing when creating this account.",
      {
        cause,
        info
      }
    ),
  businessSustainerAuthorityUpdatingValidation: ({ cause, info } = {}) =>
    badRequest.message(
      "Some information was missing when updating this authority.",
      {
        cause,
        info
      }
    ),
  businessSustainerAuthorityCreatingValidation: ({ cause, info } = {}) =>
    badRequest.message(
      "Some information was missing when creating this authority.",
      {
        cause,
        info
      }
    ),
  sustainer: ({ cause, info } = {}) =>
    badRequest.message("This account couldn't be made.", {
      cause,
      info
    }),
  businessSustainerAuthority: ({ cause, info } = {}) =>
    badRequest.message("This authority couldn't be made.", {
      cause,
      info
    })
};
