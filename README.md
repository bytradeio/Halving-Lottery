# Halving-Lottery

Contract Details
Name: Halving Pass
Symbol: HP
Total Supply Limit: 200,000 tokens
Blockchain: PolyGon
Standard: ERC721 (with URI Storage Extension)


# Key Features
1. Ownership
The contract uses OpenZeppelin's Ownable contract, giving special control privileges to the contract owner (who deploys the contract).
2. Minting Pause Control
Pause() - The contract owner can pause the minting process. No new tokens can be minted while the contract is paused.
unpause() - The contract owner can resume the minting process.
3. Whitelisting
whitelistAddress(address _address) - Allows the contract owner to whitelist an address, enabling it to mint tokens.
removeFromWhitelist(address _address) - Allows the contract owner to remove an address from the whitelist.
4. Token Minting
mint(address to, uint256 numberOfTokens, string[] memory uri) - Enables whitelisted addresses and the owner to mint new tokens. The function takes the recipient's address, the number of tokens to mint, and an array of URIs corresponding to each token's metadata.


# Constraints and Security
1. Pause Feature
Minting can be halted by the contract owner to prevent new token creation during specific periods or in case of emergencies.
2. Whitelist Control
Only whitelisted addresses and the contract owner are permitted to mint new tokens, adding a layer of access control.
3. Total Supply Cap
The total number of tokens that can be minted is capped at 200,000, ensuring scarcity and preventing inflation.
4. URI Storage
Each token's metadata is stored and referenced via a URI, ensuring that each NFT can have distinct characteristics or attributes.

