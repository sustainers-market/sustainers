const { forbidden } = require("@blossm/errors");

module.exports = {
  sustainerUpdating: ({ cause, info } = {}) =>
    forbidden.message("You aren't allowed to update this account.", {
      cause,
      info
    }),
  sustainerCreating: ({ cause, info } = {}) =>
    forbidden.message("You aren't allowed to create this account.", {
      cause,
      info
    }),
  sustainerDocumentCreating: ({ cause, info } = {}) =>
    forbidden.message(
      "You aren't allowed to create a document for this account.",
      {
        cause,
        info
      }
    ),
  sustainerSuspending: ({ cause, info } = {}) =>
    forbidden.message("You aren't allowed to suspend this account.", {
      cause,
      info
    }),
  sustainerDeactivating: ({ cause, info } = {}) =>
    forbidden.message("You aren't allowed to deactivate this account.", {
      cause,
      info
    }),
  sustainerReactivating: ({ cause, info } = {}) =>
    forbidden.message("You aren't allowed to reactivate this account.", {
      cause,
      info
    }),
  businessSustainerAuthorityUpdating: ({ cause, info } = {}) =>
    forbidden.message("You aren't allowed to update this authority.", {
      cause,
      info
    }),
  businessSustainerAuthorityDocumentCreating: ({ cause, info } = {}) =>
    forbidden.message(
      "You aren't allowed to create a document for this authority.",
      {
        cause,
        info
      }
    ),
  businessSustainerAuthorityCreating: ({ cause, info } = {}) =>
    forbidden.message("You aren't allowed to create this authority.", {
      cause,
      info
    })
};
