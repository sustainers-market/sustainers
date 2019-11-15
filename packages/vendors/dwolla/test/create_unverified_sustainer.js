const { expect } = require("chai").use(require("sinon-chai"));
const { restore, replace, fake } = require("sinon");
const dwolla = require("..");

const deps = require("../deps");

const key = "some-key";
const secret = "some-secret";
const environment = "some-environment";

const firstName = "some-first-name";
const lastName = "some-last-name";
const email = "some-email";
const ipAddress = "some-ip";
const businessName = "some-business-name";

const idempotencyKey = "some-idempotency-key";

describe("Dwolla create unverified sustainer", () => {
  afterEach(() => {
    restore();
  });
  it("it should post correctly", async () => {
    const responseBody = "some-response-body";
    const response = {
      body: responseBody
    };
    const postFake = fake.returns(response);
    const dwollaClient = {
      post: postFake
    };
    const dwollaFake = fake.returns(dwollaClient);
    replace(deps, "dwolla", dwollaFake);

    const result = await dwolla(key, secret, {
      environment
    }).createUnverifiedSustainer(
      {
        firstName,
        lastName,
        email,
        ipAddress,
        businessName
      },
      { idempotencyKey }
    );

    expect(result).to.equal(responseBody);
    expect(dwollaFake).to.have.been.calledWith(key, secret, { environment });
    expect(postFake).to.have.been.calledWith(
      "customers",
      {
        firstName,
        lastName,
        email,
        ipAddress,
        businessName
      },
      { "Idempotency-Key": idempotencyKey }
    );
  });
  it("it should post correctly without optionals", async () => {
    const responseBody = "some-response-body";
    const response = {
      body: responseBody
    };
    const postFake = fake.returns(response);
    const dwollaClient = {
      post: postFake
    };
    const dwollaFake = fake.returns(dwollaClient);
    replace(deps, "dwolla", dwollaFake);

    const result = await dwolla(key, secret, {
      environment
    }).createUnverifiedSustainer(
      {
        firstName,
        lastName,
        email,
        ipAddress
      },
      { idempotencyKey }
    );

    expect(result).to.equal(responseBody);
    expect(dwollaFake).to.have.been.calledWith(key, secret, { environment });
    expect(postFake).to.have.been.calledWith(
      "customers",
      {
        firstName,
        lastName,
        email,
        ipAddress
      },
      { "Idempotency-Key": idempotencyKey }
    );
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
    replace(deps.badRequestError, "sustainerCreatingValidation", errorFake);

    try {
      await dwolla(key, secret, {
        environment
      }).createUnverifiedSustainer(
        {
          firstName,
          lastName,
          email,
          ipAddress
        },
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
      }).createUnverifiedSustainer(
        {
          firstName,
          lastName,
          email,
          ipAddress
        },
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
    replace(deps.forbiddenError, "sustainerCreating", errorFake);

    try {
      await dwolla(key, secret, {
        environment
      }).createUnverifiedSustainer(
        {
          firstName,
          lastName,
          email,
          ipAddress
        },
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
      }).createUnverifiedSustainer(
        {
          firstName,
          lastName,
          email,
          ipAddress
        },
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
