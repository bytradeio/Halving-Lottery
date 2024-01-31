const HalvingLottery = artifacts.require("HalvingLottery");

module.exports = function (deployer) {
    deployer.deploy(HalvingLottery);
};
