const { expect } = require("chai");
const { resourceNotFound } = require("..");

const cause = new Error();
const info = { some: "info" };

describe("Resource not found", () => {
  it("businessSustainerAuthority correct", () => {
    const error = resourceNotFound.businessSustainerAuthority();
    expect(error.toJSON()).to.deep.equal({
      statusCode: 404,
      code: "ResourceNotFound",
      info: {},
      message: "This authority wasn't found."
    });
  });
  it("businessSustainerAuthority correct with props", () => {
    const error = resourceNotFound.businessSustainerAuthority({ cause, info });
    expect(error.toJSON()).to.deep.equal({
      statusCode: 404,
      code: "ResourceNotFound",
      info,
      cause,
      message: "This authority wasn't found."
    });
  });
});
