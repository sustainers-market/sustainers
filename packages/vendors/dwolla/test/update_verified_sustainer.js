const { expect } = require("chai").use(require("sinon-chai"));
const { restore, replace, fake } = require("sinon");
const dwolla = require("..");

const deps = require("../deps");

const key = "some-key";
const secret = "some-secret";
const environment = "some-environment";

const email = "some-email";
const ipAddress = "some-ip";
const address1 = "some-address1";
const address2 = "some-address2";
const city = "some-city";
const state = "some-state";
const postalCode = "some-postal-code";
const phone = "some-phone";
const website = "some-website";

const id = "some-id";

const idempotencyKey = "some-idempotency-key";

describe("Dwolla create verified business sustainer", () => {
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
    }).updateVerifiedSustainer(
      id,
      {
        email,
        ipAddress,
        address1,
        address2,
        city,
        state,
        postalCode,
        website,
        phone
      },
      { idempotencyKey }
    );

    expect(result).to.equal(responseBody);
    expect(dwollaFake).to.have.been.calledWith(key, secret, { environment });
    expect(postFake).to.have.been.calledWith(
      `customers/${id}`,
      {
        email,
        ipAddress,
        address1,
        address2,
        city,
        state,
        postalCode,
        website,
        phone
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
    }).updateVerifiedSustainer(id, {}, { idempotencyKey });

    expect(result).to.equal(responseBody);
    expect(dwollaFake).to.have.been.calledWith(key, secret, { environment });
    expect(postFake).to.have.been.calledWith(
      `customers/${id}`,
      {},
      { "Idempotency-Key": idempotencyKey }
    );
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
      }).updateVerifiedSustainer(id, {}, { idempotencyKey });

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
    replace(deps.forbiddenError, "sustainerUpdating", errorFake);

    try {
      await dwolla(key, secret, {
        environment
      }).updateVerifiedSustainer(id, {}, { idempotencyKey });

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
      }).updateVerifiedSustainer(id, {}, { idempotencyKey });

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
