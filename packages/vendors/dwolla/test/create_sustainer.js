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
const dateOfBirth = "some-dob";
const ssn = "some-ssn";
const address1 = "some-address1";
const address2 = "some-address2";
const city = "some-city";
const state = "some-state";
const postalCode = "some-postal-code";
const phone = "some-phone";

const businessName = "some-business-name";
const businessClassification = "some-classification";
const ein = "some-ein";
const website = "some-website";

const controllerFirstName = "some-controller-first-name";
const controllerLastName = "some-controller-last-name";
const controllerTitle = "some-controller-title";
const controllerDateOfBirth = "some-controller-dob";
const controllerSsn = "some-controller-ssn";
const controllerPassportNumber = "some-controller-passport-number";
const controllerPassportCountry = "some-controller-passport-country";
const controllerAddress1 = "some-controller-address1";
const controllerAddress2 = "some-controller-address2";
const controllerCity = "some-controller-city";
const controllerStateProvinceRegion = "some-controller-state-region-province";
const controllerPostalCode = "some-controller-postal-code";
const controllerCountry = "some-countroller-country";

const idempotencyKey = "some-idempotency-key";

describe("Dwolla create sustainer", () => {
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
    }).createSustainer({
      firstName,
      lastName,
      email,
      ipAddress
    });

    expect(result).to.equal(responseBody);
    expect(dwollaFake).to.have.been.calledWith(key, secret, { environment });
    expect(postFake).to.have.been.calledWith("customers", {
      firstName,
      lastName,
      email,
      ipAddress
    });
  });
  it("it should post correctly with idempotency key", async () => {
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
    }).createSustainer(
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
  it("it should post correctly with type personal", async () => {
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
    }).createSustainer(
      {
        firstName,
        lastName,
        email,
        ipAddress,
        type: "personal",
        dateOfBirth,
        ssn,
        address1,
        address2,
        city,
        state,
        postalCode,
        phone
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
        type: "personal",
        dateOfBirth,
        ssn,
        address1,
        address2,
        city,
        state,
        postalCode,
        phone
      },
      { "Idempotency-Key": idempotencyKey }
    );
  });
  it("it should post correctly with type business sole-prop", async () => {
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
    }).createSustainer(
      {
        firstName,
        lastName,
        email,
        ipAddress,
        type: "business",
        dateOfBirth,
        ssn,
        address1,
        address2,
        city,
        state,
        postalCode,
        businessName,
        businessType: "soleProprietorship",
        businessClassification,
        ein,
        website,
        phone
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
        type: "business",
        dateOfBirth,
        ssn,
        address1,
        address2,
        city,
        state,
        postalCode,
        businessName,
        businessType: "soleProprietorship",
        businessClassification,
        ein,
        website,
        phone
      },
      { "Idempotency-Key": idempotencyKey }
    );
  });
  it("it should post correctly with type business llc", async () => {
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
    }).createSustainer(
      {
        firstName,
        lastName,
        email,
        ipAddress,
        type: "business",
        dateOfBirth,
        ssn,
        address1,
        address2,
        city,
        state,
        postalCode,
        businessName,
        businessType: "llc",
        businessClassification,
        ein,
        website,
        phone
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
        type: "business",
        dateOfBirth,
        ssn,
        address1,
        address2,
        city,
        state,
        postalCode,
        businessName,
        businessType: "llc",
        businessClassification,
        ein,
        website,
        phone,
        controller: {
          firstName,
          lastName,
          title: "Owner",
          dateOfBirth,
          ssn,
          address: {
            address1,
            address2,
            city,
            stateProvinceRegion: state,
            postalCode,
            country: "US"
          }
        }
      },
      { "Idempotency-Key": idempotencyKey }
    );
  });
  it("it should post correctly with type business llc with controller info", async () => {
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
    }).createSustainer(
      {
        firstName,
        lastName,
        email,
        ipAddress,
        type: "business",
        dateOfBirth,
        ssn,
        address1,
        address2,
        city,
        state,
        postalCode,
        businessName,
        businessType: "llc",
        businessClassification,
        ein,
        website,
        phone,
        controller: {
          firstName: controllerFirstName,
          lastName: controllerLastName,
          title: controllerTitle,
          dateOfBirth: controllerDateOfBirth,
          ssn: controllerSsn,
          passport: {
            number: controllerPassportNumber,
            country: controllerPassportCountry
          },
          address: {
            address1: controllerAddress1,
            address2: controllerAddress2,
            city: controllerCity,
            stateProvinceRegion: controllerStateProvinceRegion,
            postalCode: controllerPostalCode,
            country: controllerCountry
          }
        }
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
        type: "business",
        dateOfBirth,
        ssn,
        address1,
        address2,
        city,
        state,
        postalCode,
        businessName,
        businessType: "llc",
        businessClassification,
        ein,
        website,
        phone,
        controller: {
          firstName: controllerFirstName,
          lastName: controllerLastName,
          title: controllerTitle,
          dateOfBirth: controllerDateOfBirth,
          ssn: controllerSsn,
          passport: {
            number: controllerPassportNumber,
            country: controllerPassportCountry
          },
          address: {
            address1: controllerAddress1,
            address2: controllerAddress2,
            city: controllerCity,
            stateProvinceRegion: controllerStateProvinceRegion,
            postalCode: controllerPostalCode,
            country: controllerCountry
          }
        }
      },
      { "Idempotency-Key": idempotencyKey }
    );
  });
  it("it should post correctly with type business corporation", async () => {
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
    }).createSustainer(
      {
        firstName,
        lastName,
        email,
        ipAddress,
        type: "business",
        dateOfBirth,
        ssn,
        address1,
        address2,
        city,
        state,
        postalCode,
        businessName,
        businessType: "corporation",
        businessClassification,
        ein,
        website,
        phone
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
        type: "business",
        dateOfBirth,
        ssn,
        address1,
        address2,
        city,
        state,
        postalCode,
        businessName,
        businessType: "corporation",
        businessClassification,
        ein,
        website,
        phone,
        controller: {
          firstName,
          lastName,
          title: "Owner",
          dateOfBirth,
          ssn,
          address: {
            address1,
            address2,
            city,
            stateProvinceRegion: state,
            postalCode,
            country: "US"
          }
        }
      },
      { "Idempotency-Key": idempotencyKey }
    );
  });
  it("it should post correctly with type business corporation with controller info", async () => {
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
    }).createSustainer(
      {
        firstName,
        lastName,
        email,
        ipAddress,
        type: "business",
        dateOfBirth,
        ssn,
        address1,
        address2,
        city,
        state,
        postalCode,
        businessName,
        businessType: "corporation",
        businessClassification,
        ein,
        website,
        phone,
        controller: {
          firstName: controllerFirstName,
          lastName: controllerLastName,
          title: controllerTitle,
          dateOfBirth: controllerDateOfBirth,
          ssn: controllerSsn,
          passport: {
            number: controllerPassportNumber,
            country: controllerPassportCountry
          },
          address: {
            address1: controllerAddress1,
            address2: controllerAddress2,
            city: controllerCity,
            stateProvinceRegion: controllerStateProvinceRegion,
            postalCode: controllerPostalCode,
            country: controllerCountry
          }
        }
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
        type: "business",
        dateOfBirth,
        ssn,
        address1,
        address2,
        city,
        state,
        postalCode,
        businessName,
        businessType: "corporation",
        businessClassification,
        ein,
        website,
        phone,
        controller: {
          firstName: controllerFirstName,
          lastName: controllerLastName,
          title: controllerTitle,
          dateOfBirth: controllerDateOfBirth,
          ssn: controllerSsn,
          passport: {
            number: controllerPassportNumber,
            country: controllerPassportCountry
          },
          address: {
            address1: controllerAddress1,
            address2: controllerAddress2,
            city: controllerCity,
            stateProvinceRegion: controllerStateProvinceRegion,
            postalCode: controllerPostalCode,
            country: controllerCountry
          }
        }
      },
      { "Idempotency-Key": idempotencyKey }
    );
  });
  it("it should post correctly with type business partnership", async () => {
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
    }).createSustainer(
      {
        firstName,
        lastName,
        email,
        ipAddress,
        type: "business",
        dateOfBirth,
        ssn,
        address1,
        address2,
        city,
        state,
        postalCode,
        businessName,
        businessType: "partnership",
        businessClassification,
        ein,
        website,
        phone
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
        type: "business",
        dateOfBirth,
        ssn,
        address1,
        address2,
        city,
        state,
        postalCode,
        businessName,
        businessType: "partnership",
        businessClassification,
        ein,
        website,
        phone,
        controller: {
          firstName,
          lastName,
          title: "Owner",
          dateOfBirth,
          ssn,
          address: {
            address1,
            address2,
            city,
            stateProvinceRegion: state,
            postalCode,
            country: "US"
          }
        }
      },
      { "Idempotency-Key": idempotencyKey }
    );
  });
  it("it should post correctly with type business partnership with controller info", async () => {
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
    }).createSustainer(
      {
        firstName,
        lastName,
        email,
        ipAddress,
        type: "business",
        dateOfBirth,
        ssn,
        address1,
        address2,
        city,
        state,
        postalCode,
        businessName,
        businessType: "partnership",
        businessClassification,
        ein,
        website,
        phone,
        controller: {
          firstName: controllerFirstName,
          lastName: controllerLastName,
          title: controllerTitle,
          dateOfBirth: controllerDateOfBirth,
          ssn: controllerSsn,
          passport: {
            number: controllerPassportNumber,
            country: controllerPassportCountry
          },
          address: {
            address1: controllerAddress1,
            address2: controllerAddress2,
            city: controllerCity,
            stateProvinceRegion: controllerStateProvinceRegion,
            postalCode: controllerPostalCode,
            country: controllerCountry
          }
        }
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
        type: "business",
        dateOfBirth,
        ssn,
        address1,
        address2,
        city,
        state,
        postalCode,
        businessName,
        businessType: "partnership",
        businessClassification,
        ein,
        website,
        phone,
        controller: {
          firstName: controllerFirstName,
          lastName: controllerLastName,
          title: controllerTitle,
          dateOfBirth: controllerDateOfBirth,
          ssn: controllerSsn,
          passport: {
            number: controllerPassportNumber,
            country: controllerPassportCountry
          },
          address: {
            address1: controllerAddress1,
            address2: controllerAddress2,
            city: controllerCity,
            stateProvinceRegion: controllerStateProvinceRegion,
            postalCode: controllerPostalCode,
            country: controllerCountry
          }
        }
      },
      { "Idempotency-Key": idempotencyKey }
    );
  });
});
