var Enum = require("enum");

export const RewardState = new Enum(["OPEN", "VERIFICATION" ,"RUNNING", "REDEEMED", "FULLY_REDEEMED"]);
export const VerificationType = new Enum({
    "MYKAD": "mykadNumber",
    "OLD_NRIC": "oldNricNumber",
    "PASSPORT": "passportNumber",
    "ARMY": "armyIdNumber",
    "POLICE": "policeIdNumber",
    "NAVY": "navyIdNumber"
  });
