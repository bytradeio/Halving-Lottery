const MyNFT = artifacts.require("HalvingLottery");

contract("MyNFT", (accounts) => {
    let myNFT;
    const owner = accounts[0];
    const nonOwner = accounts[1];
    const whitelistedUser = accounts[2];

    before(async () => {
        myNFT = await MyNFT.deployed();
    });

    // Deployement test
    describe("Deployment", () => {
        it("should deploy successfully with correct name and symbol", async () => {
            const name = await myNFT.name();
            const symbol = await myNFT.symbol();
            assert.equal(name, "Halving Pass", "Name should be 'Halving Pass'");
            assert.equal(symbol, "HP", "Symbol should be 'HP'");
        });
    });


    // Pause and Unpause Functionality
    describe("Pause and Unpause Functionality", () => {
        it("should be able to pause and unpause the contract", async () => {
            await myNFT.Pause({from: owner});
            let pausedState = await myNFT.pause();
            assert.equal(pausedState, true, "Contract should be paused");
    
            await myNFT.unpause({from: owner});
            pausedState = await myNFT.pause();
            assert.equal(pausedState, false, "Contract should be unpaused");
        });
    
        it("should not allow non-owner to pause or unpause", async () => {
            try {
                await myNFT.Pause({from: nonOwner});
                assert.fail("Non-owner should not be able to pause");
            } catch (error) {
                assert(error, "Expected an error but did not get one");
            }
    
            try {
                await myNFT.unpause({from: nonOwner});
                assert.fail("Non-owner should not be able to unpause");
            } catch (error) {
                assert(error, "Expected an error but did not get one");
            }
        });
    });
    

    // Whitelisting Functionality
    describe("Whitelisting Functionality", () => {
        it("should allow owner to whitelist an address", async () => {
            await myNFT.whitelistAddress(whitelistedUser, {from: owner});
            const isWhitelisted = await myNFT.whitelisted(whitelistedUser);
            assert.equal(isWhitelisted, true, "Address should be whitelisted");
        });
    
        it("should allow owner to remove an address from whitelist", async () => {
            await myNFT.removeFromWhitelist(whitelistedUser, {from: owner});
            const isWhitelisted = await myNFT.whitelisted(whitelistedUser);
            assert.equal(isWhitelisted, false, "Address should not be whitelisted anymore");
        });
    });


    // Minting Functionality
    describe("Minting Functionality", () => {
        it("should allow minting when conditions are met", async () => {
            await myNFT.whitelistAddress(whitelistedUser, {from: owner});
            const tokenURI = "someURI";
            await myNFT.mint(whitelistedUser, 1, [tokenURI], {from: whitelistedUser});
            const totalMinted = await myNFT.totalMinted();
            assert.equal(totalMinted.toNumber(), 1, "Total minted should be updated");
        });
    
        it("should not allow minting when paused", async () => {
            await myNFT.Pause({from: owner});
            try {
                const tokenURI = "someURI";
                await myNFT.mint(whitelistedUser, 1, [tokenURI], {from: whitelistedUser});
                assert.fail("Should not mint when paused");
            } catch (error) {
                assert(error, "Expected an error but did not get one");
            }
            await myNFT.unpause({from: owner});
        });
    
    
    });
    
    
});