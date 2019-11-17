const deps = require("./deps");

const certifySustainerBusinessAuthority = require("./src/sustainer/certify_business_authority");
const createBusinessSustainerAuthority = require("./src/business_sustainer_authority/create");
const createBusinessSustainerAuthorityDocument = require("./src/business_sustainer_authority/create_document");
const createSustainerDocument = require("./src/sustainer/create_document");
const createReceiveOnlySustainer = require("./src/sustainer/create_receive_only");
const createUnverifiedSustainer = require("./src/sustainer/create_unverified");
const createVerifiedBusinessSustainer = require("./src/sustainer/create_verified_business");
const createVerifiedPersonalSustainer = require("./src/sustainer/create_verified_personal");
const deactivateSustainer = require("./src/sustainer/deactivate");
const deleteBusinessSustainerAuthority = require("./src/business_sustainer_authority/delete");
const getBusinessSustainerAuthority = require("./src/business_sustainer_authority/get");
const reactivateSustainer = require("./src/sustainer/reactivate");
const suspendSustainer = require("./src/sustainer/suspend");
const updateBusinessSustainerAuthority = require("./src/business_sustainer_authority/update");
const updateUnverifiedSustainer = require("./src/sustainer/update_unverified");
const updateVerifiedSustainer = require("./src/sustainer/update_verified");

module.exports = (key, secret, { environment }) => {
  const dwolla = deps.dwolla(key, secret, { environment });
  return {
    businessSustainerAuthority: {
      get: getBusinessSustainerAuthority(dwolla),
      create: createBusinessSustainerAuthority(dwolla),
      delete: deleteBusinessSustainerAuthority(dwolla),
      update: updateBusinessSustainerAuthority(dwolla),
      createDocument: createBusinessSustainerAuthorityDocument(dwolla)
    },
    sustainer: {
      certifyBusinessAuthority: certifySustainerBusinessAuthority(dwolla),
      createReceiveOnly: createReceiveOnlySustainer(dwolla),
      createUnverified: createUnverifiedSustainer(dwolla),
      createVerifiedBusiness: createVerifiedBusinessSustainer(dwolla),
      createVerifiedPersonal: createVerifiedPersonalSustainer(dwolla),
      deactivate: deactivateSustainer(dwolla),
      reactivate: reactivateSustainer(dwolla),
      suspend: suspendSustainer(dwolla),
      updateUnverified: updateUnverifiedSustainer(dwolla),
      updateVerified: updateVerifiedSustainer(dwolla),
      createDocument: createSustainerDocument(dwolla)
    }
  };
};
