// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HalvingLottery is ERC721URIStorage, Ownable{
    
    uint256 public totalMinted;    
    bool public pause;
    mapping(address => bool) private whitelisted; 
    uint256 internal constant totalSupply = 200000;

    constructor() ERC721("Halving Pass", "HP")  Ownable(msg.sender){}

    // function to pause minting
    function Pause() public onlyOwner {
        pause = true;
    }

    // function to unpause minting
    function unpause() public onlyOwner {
        pause = false;
    }

    // Function to whitelist addresses
    function whitelistAddress(address _address) public onlyOwner {
        whitelisted[_address] = true;
    }


    // Function to remove from whitelist
    function removeFromWhitelist(address _address) public onlyOwner {
        whitelisted[_address] = false;
    }


    // minting tokens on given address
    function mint(address to, uint256 numberOfTokens, string[] memory uri) public {
        require(!pause, "The contract is paused");
        require(whitelisted[msg.sender] || msg.sender == owner(), "Not whitelisted or owner");
        require(totalMinted + numberOfTokens <= totalSupply, "Max supply exceeded");

        for (uint256 i = 0; i < numberOfTokens; i++) {
            uint256 tokenId = totalMinted + 1;
            _mint(to, tokenId);
            _setTokenURI(tokenId, uri[i]);
            totalMinted++;
        }
    }

}
