const { expect } = require("chai");
const { badRequest } = require("..");

const cause = new Error();
const info = { some: "info" };

describe("Bad request", () => {
  it("sustainerUpdatingValidation correct", () => {
    const error = badRequest.sustainerUpdatingValidation();
    expect(error.toJSON()).to.deep.equal({
      statusCode: 400,
      code: "BadRequest",
      info: {},
      message: "Some information was missing when updating this account."
    });
  });
  it("sustainerUpdatingValidation correct with props", () => {
    const error = badRequest.sustainerUpdatingValidation({ cause, info });
    expect(error.toJSON()).to.deep.equal({
      statusCode: 400,
      code: "BadRequest",
      info,
      cause,
      message: "Some information was missing when updating this account."
    });
  });
  it("sustainerCreatingValidation correct", () => {
    const error = badRequest.sustainerCreatingValidation();
    expect(error.toJSON()).to.deep.equal({
      statusCode: 400,
      code: "BadRequest",
      info: {},
      message: "Some information was missing when creating this account."
    });
  });
  it("sustainerCreatingValidation correct with props", () => {
    const error = badRequest.sustainerCreatingValidation({ cause, info });
    expect(error.toJSON()).to.deep.equal({
      statusCode: 400,
      code: "BadRequest",
      info,
      cause,
      message: "Some information was missing when creating this account."
    });
  });
  it("sustainerDeactivatingValidation correct", () => {
    const error = badRequest.sustainerDeactivatingValidation();
    expect(error.toJSON()).to.deep.equal({
      statusCode: 400,
      code: "BadRequest",
      info: {},
      message: "Some information was missing when deactivating this account."
    });
  });
  it("sustainerDeactivatingValidation correct with props", () => {
    const error = badRequest.sustainerDeactivatingValidation({ cause, info });
    expect(error.toJSON()).to.deep.equal({
      statusCode: 400,
      code: "BadRequest",
      info,
      cause,
      message: "Some information was missing when deactivating this account."
    });
  });
  it("sustainerReactivatingValidation correct", () => {
    const error = badRequest.sustainerReactivatingValidation();
    expect(error.toJSON()).to.deep.equal({
      statusCode: 400,
      code: "BadRequest",
      info: {},
      message: "Some information was missing when reactivating this account."
    });
  });
  it("sustainerReactivatingValidation correct with props", () => {
    const error = badRequest.sustainerReactivatingValidation({ cause, info });
    expect(error.toJSON()).to.deep.equal({
      statusCode: 400,
      code: "BadRequest",
      info,
      cause,
      message: "Some information was missing when reactivating this account."
    });
  });
  it("sustainerSuspendingValidation correct", () => {
    const error = badRequest.sustainerSuspendingValidation();
    expect(error.toJSON()).to.deep.equal({
      statusCode: 400,
      code: "BadRequest",
      info: {},
      message: "Some information was missing when suspending this account."
    });
  });
  it("sustainerSuspendingValidation correct with props", () => {
    const error = badRequest.sustainerSuspendingValidation({ cause, info });
    expect(error.toJSON()).to.deep.equal({
      statusCode: 400,
      code: "BadRequest",
      info,
      cause,
      message: "Some information was missing when suspending this account."
    });
  });
  it("businessSustainerAuthorityUpdatingValidation correct", () => {
    const error = badRequest.businessSustainerAuthorityUpdatingValidation();
    expect(error.toJSON()).to.deep.equal({
      statusCode: 400,
      code: "BadRequest",
      info: {},
      message: "Some information was missing when updating this authority."
    });
  });
  it("businessSustainerAuthorityUpdatingValidation correct with props", () => {
    const error = badRequest.businessSustainerAuthorityUpdatingValidation({
      cause,
      info
    });
    expect(error.toJSON()).to.deep.equal({
      statusCode: 400,
      code: "BadRequest",
      info,
      cause,
      message: "Some information was missing when updating this authority."
    });
  });
  it("businessSustainerAuthorityCreatingValidation correct", () => {
    const error = badRequest.businessSustainerAuthorityCreatingValidation();
    expect(error.toJSON()).to.deep.equal({
      statusCode: 400,
      code: "BadRequest",
      info: {},
      message: "Some information was missing when creating this authority."
    });
  });
  it("businessSustainerAuthorityCreatingValidation correct with props", () => {
    const error = badRequest.businessSustainerAuthorityCreatingValidation({
      cause,
      info
    });
    expect(error.toJSON()).to.deep.equal({
      statusCode: 400,
      code: "BadRequest",
      info,
      cause,
      message: "Some information was missing when creating this authority."
    });
  });
  it("sustainer correct", () => {
    const error = badRequest.sustainer();
    expect(error.toJSON()).to.deep.equal({
      statusCode: 400,
      code: "BadRequest",
      info: {},
      message: "This account couldn't be made."
    });
  });
  it("sustainer correct with props", () => {
    const error = badRequest.sustainer({ cause, info });
    expect(error.toJSON()).to.deep.equal({
      statusCode: 400,
      code: "BadRequest",
      info,
      cause,
      message: "This account couldn't be made."
    });
  });
  it("businessSustainerAuthority correct", () => {
    const error = badRequest.businessSustainerAuthority();
    expect(error.toJSON()).to.deep.equal({
      statusCode: 400,
      code: "BadRequest",
      info: {},
      message: "This authority couldn't be made."
    });
  });
  it("businessSustainerAuthority correct with props", () => {
    const error = badRequest.businessSustainerAuthority({ cause, info });
    expect(error.toJSON()).to.deep.equal({
      statusCode: 400,
      code: "BadRequest",
      info,
      cause,
      message: "This authority couldn't be made."
    });
  });
});
