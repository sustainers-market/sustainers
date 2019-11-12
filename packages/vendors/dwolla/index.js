const deps = require("./deps");

const certifyBusinessSustainerAuthority = require("./src/certify_business_sustainer_authority");
const createBusinessSustainerAuthority = require("./src/certify_business_sustainer_authority");
const createReceiveOnlySustainer = require("./src/create_receive_only_sustainer");
const createUnverifiedSustainer = require("./src/create_unverified_sustainer");
const createVerifiedBusinessSustainer = require("./src/create_verified_business_sustainer");
const createVerifiedPersonalSustainer = require("./src/create_verified_personal_sustainer");
const deactivateSustainer = require("./src/deactivate_sustainer");
const deleteSustainerAuthority = require("./src/delete_sustainer_authority");
const reactivateSustainer = require("./src/reactivate_sustainer");
const suspendSustainer = require("./src/suspend_sustainer");
const updateBusinessSustainerAuthority = require("./src/update_business_sustainer_authority");
const updateUnverifiedSustainer = require("./src/update_unverified_sustainer");
const updateVerifiedSustainer = require("./src/update_verified_sustainer");

module.exports = (key, secret, { environment }) => {
  const dwolla = deps.dwolla(key, secret, { environment });
  return {
    certifyBusinessSustainerAuthority: certifyBusinessSustainerAuthority(
      dwolla
    ),
    createBusinessSustainerAuthority: createBusinessSustainerAuthority(dwolla),
    createReceiveOnlySustainer: createReceiveOnlySustainer(dwolla),
    createUnverifiedSustainer: createUnverifiedSustainer(dwolla),
    createVerifiedBusinessSustainer: createVerifiedBusinessSustainer(dwolla),
    createVerifiedPersonalSustainer: createVerifiedPersonalSustainer(dwolla),
    deactivateSustainer: deactivateSustainer(dwolla),
    deleteSustainerAuthority: deleteSustainerAuthority(dwolla),
    reactivateSustainer: reactivateSustainer(dwolla),
    suspendSustainer: suspendSustainer(dwolla),
    updateBusinessSustainerAuthority: updateBusinessSustainerAuthority(dwolla),
    updateUnverifiedSustainer: updateUnverifiedSustainer(dwolla),
    updateVerifiedSustainer: updateVerifiedSustainer(dwolla)
  };
};
