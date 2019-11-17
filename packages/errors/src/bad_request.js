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
  sustainerDeactivatingValidation: ({ cause, info } = {}) =>
    badRequest.message(
      "Some information was missing when deactivating this account.",
      {
        cause,
        info
      }
    ),
  sustainerReactivatingValidation: ({ cause, info } = {}) =>
    badRequest.message(
      "Some information was missing when reactivating this account.",
      {
        cause,
        info
      }
    ),
  sustainerSuspendingValidation: ({ cause, info } = {}) =>
    badRequest.message(
      "Some information was missing when suspending this account.",
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
  sustainerDocumentCreatingValidation: ({ cause, info } = {}) =>
    badRequest.message(
      "Some information was missing when creating a document for this account.",
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
  businessSustainerAuthorityDocumentCreatingValidation: ({
    cause,
    info
  } = {}) =>
    badRequest.message(
      "Some information was missing when creating a document for this authority.",
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
