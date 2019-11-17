const { expect } = require("chai").use(require("sinon-chai"));
const { restore, replace, fake } = require("sinon");
const dwolla = require("../..");

const deps = require("../../deps");

const key = "some-key";
const secret = "some-secret";
const environment = "some-environment";

const id = "some-id";

const filename = "some-filename";
const contentType = "some-content-type";
const knownLength = 3;
const data = "some-data";
const type = "some-document-type";

const idempotencyKey = "some-idempotency-key";

describe("Dwolla create sustainer document", () => {
  afterEach(() => {
    restore();
  });
  it("it should post correctly", async () => {
    const location = "some-location";
    const getFake = fake.returns(location);
    const responseHeaders = {
      get: getFake
    };
    const response = {
      headers: responseHeaders
    };
    const postFake = fake.returns(response);
    const dwollaClient = {
      post: postFake
    };
    const dwollaFake = fake.returns(dwollaClient);
    replace(deps, "dwolla", dwollaFake);

    const appendFake = fake();
    const body = {
      append: appendFake
    };

    const formDataFake = fake.returns(body);
    replace(deps, "FormData", formDataFake);

    const result = await dwolla(key, secret, {
      environment
    }).sustainer.createDocument(
      id,
      {
        data,
        filename,
        contentType,
        knownLength
      },
      { type },
      { idempotencyKey }
    );

    expect(result).to.equal(location);
    expect(dwollaFake).to.have.been.calledWith(key, secret, { environment });
    expect(postFake).to.have.been.calledWith(
      `customers/${id}/documents`,
      body,
      {
        "Idempotency-Key": idempotencyKey
      }
    );
    expect(appendFake).to.have.been.calledWith("file", Buffer.from(data), {
      filename,
      contentType,
      knownLength
    });
    expect(appendFake).to.have.been.calledWith("documentType", type);
    expect(appendFake).to.have.been.calledTwice;
    expect(formDataFake).to.have.been.calledWith();
  });
  it("it should post correctly with 400 validation", async () => {
    const message = "some-error-message";
    const postError = new Error(message);
    const errorMessage0 = "some-error";
    const path0 = "/somePath/yep";
    const errorMessage1 = "some-other-error";
    const path1 = "/someOtherPath/";
    postError.statusCode = 400;
    postError.code = "ValidationError";
    postError.body = {
      _embedded: {
        errors: [
          { message: errorMessage0, path: path0 },
          { message: errorMessage1, path: path1 }
        ]
      }
    };
    const postFake = fake.rejects(postError);
    const dwollaClient = {
      post: postFake
    };
    const dwollaFake = fake.returns(dwollaClient);
    replace(deps, "dwolla", dwollaFake);

    const error = new Error();
    const errorFake = fake.returns(error);
    replace(
      deps.badRequestError,
      "sustainerDocumentCreatingValidation",
      errorFake
    );

    try {
      await dwolla(key, secret, {
        environment
      }).sustainer.createDocument(
        id,
        {
          data,
          filename,
          contentType,
          knownLength
        },
        { type },
        { idempotencyKey }
      );

      //shouldn't be called.
      expect(2).to.equal(1);
    } catch (e) {
      expect(errorFake).to.have.been.calledWith({
        info: {
          errors: [
            {
              message: errorMessage0,
              path: "somePath.yep"
            },
            {
              message: errorMessage1,
              path: "someOtherPath"
            }
          ]
        },
        source: postError
      });
      expect(e).to.equal(error);
    }
  });
  it("it should post correctly with 400 default", async () => {
    const message = "some-error-message";
    const postError = new Error(message);
    postError.statusCode = 400;
    const postFake = fake.rejects(postError);
    const dwollaClient = {
      post: postFake
    };
    const dwollaFake = fake.returns(dwollaClient);
    replace(deps, "dwolla", dwollaFake);

    const error = new Error();
    const errorFake = fake.returns(error);
    replace(deps.badRequestError, "sustainer", errorFake);

    try {
      await dwolla(key, secret, {
        environment
      }).sustainer.createDocument(
        id,
        {
          data,
          filename,
          contentType,
          knownLength
        },
        { type },
        { idempotencyKey }
      );

      //shouldn't be called.
      expect(2).to.equal(1);
    } catch (e) {
      expect(errorFake).to.have.been.calledWith({
        info: { errors: [{ message }] },
        source: postError
      });
      expect(e).to.equal(error);
    }
  });
  it("it should post correctly with 403 default", async () => {
    const message = "some-error-message";
    const postError = new Error(message);
    postError.statusCode = 403;
    const postFake = fake.rejects(postError);
    const dwollaClient = {
      post: postFake
    };
    const dwollaFake = fake.returns(dwollaClient);
    replace(deps, "dwolla", dwollaFake);

    const error = new Error();
    const errorFake = fake.returns(error);
    replace(deps.forbiddenError, "sustainerDocumentCreating", errorFake);

    try {
      await dwolla(key, secret, {
        environment
      }).sustainer.createDocument(
        id,
        {
          data,
          filename,
          contentType,
          knownLength
        },
        { type },
        { idempotencyKey }
      );

      //shouldn't be called.
      expect(2).to.equal(1);
    } catch (e) {
      expect(errorFake).to.have.been.calledWith({
        info: { errors: [{ message }] },
        source: postError
      });
      expect(e).to.equal(error);
    }
  });
  it("it should post correctly with default", async () => {
    const message = "some-error-message";
    const postError = new Error(message);
    const postFake = fake.rejects(postError);
    const dwollaClient = {
      post: postFake
    };
    const dwollaFake = fake.returns(dwollaClient);
    replace(deps, "dwolla", dwollaFake);

    const error = new Error();
    const errorFake = fake.returns(error);
    replace(deps.badRequestError, "sustainer", errorFake);

    try {
      await dwolla(key, secret, {
        environment
      }).sustainer.createDocument(
        id,
        {
          data,
          filename,
          contentType,
          knownLength
        },
        { type },
        { idempotencyKey }
      );

      //shouldn't be called.
      expect(2).to.equal(1);
    } catch (e) {
      expect(errorFake).to.have.been.calledWith({
        info: { errors: [{ message }] },
        source: postError
      });
      expect(e).to.equal(error);
    }
  });
});
