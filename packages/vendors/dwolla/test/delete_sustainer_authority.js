const { expect } = require("chai").use(require("sinon-chai"));
const { restore, replace, fake } = require("sinon");
const dwolla = require("..");

const deps = require("../deps");

const key = "some-key";
const secret = "some-secret";
const environment = "some-environment";

const id = "some-id";

const idempotencyKey = "some-idempotency-key";

describe("Dwolla suspend sustainer", () => {
  afterEach(() => {
    restore();
  });
  it("it should post correctly", async () => {
    const responseBody = "some-response-body";
    const response = {
      body: responseBody
    };
    const deleteFake = fake.returns(response);
    const dwollaClient = {
      delete: deleteFake
    };
    const dwollaFake = fake.returns(dwollaClient);
    replace(deps, "dwolla", dwollaFake);

    const result = await dwolla(key, secret, {
      environment
    }).deleteSustainerAuthority(id, { idempotencyKey });

    expect(result).to.equal(responseBody);
    expect(dwollaFake).to.have.been.calledWith(key, secret, { environment });
    expect(deleteFake).to.have.been.calledWith(
      `beneficial-owners/${id}`,
      {},
      {
        "Idempotency-Key": idempotencyKey
      }
    );
  });
  it("it should post correctly with 404", async () => {
    const message = "some-error-message";
    const deleteError = new Error(message);
    deleteError.statusCode = 404;
    const deleteFake = fake.rejects(deleteError);
    const dwollaClient = {
      delete: deleteFake
    };
    const dwollaFake = fake.returns(dwollaClient);
    replace(deps, "dwolla", dwollaFake);

    const error = new Error();
    const errorFake = fake.returns(error);
    replace(
      deps.resourceNotFoundError,
      "businessSustainerAuthority",
      errorFake
    );

    try {
      await dwolla(key, secret, {
        environment
      }).deleteSustainerAuthority(id, { idempotencyKey });

      //shouldn't be called.
      expect(2).to.equal(1);
    } catch (e) {
      expect(errorFake).to.have.been.calledWith({
        info: { errors: [{ message }] },
        source: deleteError
      });
      expect(e).to.equal(error);
    }
  });
  it("it should post correctly with default", async () => {
    const message = "some-error-message";
    const deleteError = new Error(message);
    const deleteFake = fake.rejects(deleteError);
    const dwollaClient = {
      delete: deleteFake
    };
    const dwollaFake = fake.returns(dwollaClient);
    replace(deps, "dwolla", dwollaFake);

    const error = new Error();
    const errorFake = fake.returns(error);
    replace(deps.badRequestError, "businessSustainerAuthority", errorFake);

    try {
      await dwolla(key, secret, {
        environment
      }).deleteSustainerAuthority(id, { idempotencyKey });

      //shouldn't be called.
      expect(2).to.equal(1);
    } catch (e) {
      expect(errorFake).to.have.been.calledWith({
        info: { errors: [{ message }] },
        source: deleteError
      });
      expect(e).to.equal(error);
    }
  });
  // it("it should post correctly with 403 default", async () => {
  //   const message = "some-error-message";
  //   const postError = new Error(message);
  //   postError.statusCode = 403;
  //   const postFake = fake.rejects(postError);
  //   const dwollaClient = {
  //     post: postFake
  //   };
  //   const dwollaFake = fake.returns(dwollaClient);
  //   replace(deps, "dwolla", dwollaFake);

  //   const error = new Error();
  //   const errorFake = fake.returns(error);
  //   replace(deps.forbiddenError, "sustainerDeactivating", errorFake);

  //   try {
  //     await dwolla(key, secret, {
  //       environment
  //     }).deactivateSustainer(id, { idempotencyKey });

  //     //shouldn't be called.
  //     expect(2).to.equal(1);
  //   } catch (e) {
  //     expect(errorFake).to.have.been.calledWith({
  //       info: { errors: [{ message }] },
  //       source: postError
  //     });
  //     expect(e).to.equal(error);
  //   }
  // });
  // it("it should post correctly with default", async () => {
  //   const message = "some-error-message";
  //   const postError = new Error(message);
  //   const postFake = fake.rejects(postError);
  //   const dwollaClient = {
  //     post: postFake
  //   };
  //   const dwollaFake = fake.returns(dwollaClient);
  //   replace(deps, "dwolla", dwollaFake);

  //   const error = new Error();
  //   const errorFake = fake.returns(error);
  //   replace(deps.badRequestError, "sustainer", errorFake);

  //   try {
  //     await dwolla(key, secret, {
  //       environment
  //     }).deactivateSustainer(id, { idempotencyKey });

  //     //shouldn't be called.
  //     expect(2).to.equal(1);
  //   } catch (e) {
  //     expect(errorFake).to.have.been.calledWith({
  //       info: { errors: [{ message }] },
  //       source: postError
  //     });
  //     expect(e).to.equal(error);
  //   }
  // });
});
