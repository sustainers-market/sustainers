const {
  badRequest,
  forbidden,
  resourceNotFound
} = require("@sustainers/errors");

exports.dwolla = (key, secret, { environment }) =>
  new require("dwolla-v2").Client({
    key,
    secret,
    environment
  });

const FormData = require("form-data");

exports.badRequestError = badRequest;
exports.forbiddenError = forbidden;
exports.resourceNotFoundError = resourceNotFound;
exports.FormData = FormData;
