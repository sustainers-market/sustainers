const { expect } = require("chai");
const { forbidden } = require("..");

const cause = new Error();
const info = { some: "info" };

describe("Forbidden", () => {
  it("sustainerUpdating correct", () => {
    const error = forbidden.sustainerUpdating();
    expect(error.toJSON()).to.deep.equal({
      statusCode: 403,
      code: "Forbidden",
      info: {},
      message: "You aren't allowed to update this account."
    });
  });
  it("sustainerUpdating correct with props", () => {
    const error = forbidden.sustainerUpdating({ cause, info });
    expect(error.toJSON()).to.deep.equal({
      statusCode: 403,
      code: "Forbidden",
      info,
      cause,
      message: "You aren't allowed to update this account."
    });
  });
  it("sustainerCreating correct", () => {
    const error = forbidden.sustainerCreating();
    expect(error.toJSON()).to.deep.equal({
      statusCode: 403,
      code: "Forbidden",
      info: {},
      message: "You aren't allowed to create this account."
    });
  });
  it("sustainerCreating correct with props", () => {
    const error = forbidden.sustainerCreating({ cause, info });
    expect(error.toJSON()).to.deep.equal({
      statusCode: 403,
      code: "Forbidden",
      info,
      cause,
      message: "You aren't allowed to create this account."
    });
  });
  it("sustainerReactivating correct", () => {
    const error = forbidden.sustainerReactivating();
    expect(error.toJSON()).to.deep.equal({
      statusCode: 403,
      code: "Forbidden",
      info: {},
      message: "You aren't allowed to reactivate this account."
    });
  });
  it("sustainerReactivating correct with props", () => {
    const error = forbidden.sustainerReactivating({ cause, info });
    expect(error.toJSON()).to.deep.equal({
      statusCode: 403,
      code: "Forbidden",
      info,
      cause,
      message: "You aren't allowed to reactivate this account."
    });
  });
  it("sustainerSuspending correct", () => {
    const error = forbidden.sustainerSuspending();
    expect(error.toJSON()).to.deep.equal({
      statusCode: 403,
      code: "Forbidden",
      info: {},
      message: "You aren't allowed to suspend this account."
    });
  });
  it("sustainerSuspending correct with props", () => {
    const error = forbidden.sustainerSuspending({ cause, info });
    expect(error.toJSON()).to.deep.equal({
      statusCode: 403,
      code: "Forbidden",
      info,
      cause,
      message: "You aren't allowed to suspend this account."
    });
  });
  it("sustainerDeactivating correct", () => {
    const error = forbidden.sustainerDeactivating();
    expect(error.toJSON()).to.deep.equal({
      statusCode: 403,
      code: "Forbidden",
      info: {},
      message: "You aren't allowed to deactivate this account."
    });
  });
  it("sustainerDeactivating correct with props", () => {
    const error = forbidden.sustainerDeactivating({ cause, info });
    expect(error.toJSON()).to.deep.equal({
      statusCode: 403,
      code: "Forbidden",
      info,
      cause,
      message: "You aren't allowed to deactivate this account."
    });
  });

  it("businessSustainerAuthorityUpdating correct", () => {
    const error = forbidden.businessSustainerAuthorityUpdating();
    expect(error.toJSON()).to.deep.equal({
      statusCode: 403,
      code: "Forbidden",
      info: {},
      message: "You aren't allowed to update this authority."
    });
  });
  it("businessSustainerAuthorityUpdating correct with props", () => {
    const error = forbidden.businessSustainerAuthorityUpdating({
      cause,
      info
    });
    expect(error.toJSON()).to.deep.equal({
      statusCode: 403,
      code: "Forbidden",
      info,
      cause,
      message: "You aren't allowed to update this authority."
    });
  });

  it("businessSustainerAuthorityCreating correct", () => {
    const error = forbidden.businessSustainerAuthorityCreating();
    expect(error.toJSON()).to.deep.equal({
      statusCode: 403,
      code: "Forbidden",
      info: {},
      message: "You aren't allowed to create this authority."
    });
  });
  it("businessSustainerAuthorityCreating correct with props", () => {
    const error = forbidden.businessSustainerAuthorityCreating({
      cause,
      info
    });
    expect(error.toJSON()).to.deep.equal({
      statusCode: 403,
      code: "Forbidden",
      info,
      cause,
      message: "You aren't allowed to create this authority."
    });
  });
});
