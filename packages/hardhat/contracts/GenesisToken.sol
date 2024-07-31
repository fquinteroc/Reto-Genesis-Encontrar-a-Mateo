// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "./GenesisTokenADN.sol";

contract GenesisToken is ERC721, ERC721Enumerable, GenesisTokenADN {
    string public greeting = "Genesis Token Contract";
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _idCounter;
    uint256 public maxSupply;
    mapping(uint256 => uint8[13]) public tokenAttributes;

    constructor(uint256 _maxSupply) ERC721("GenesisToken", "GTK") {
        maxSupply = _maxSupply;
    }

    function mint(uint8[13] memory selectedAttributes) public {
        uint256 current = _idCounter.current();
        require(current < maxSupply, "No more tokens available");

        tokenAttributes[current] = selectedAttributes;
        _safeMint(msg.sender, current);
        _idCounter.increment();
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://avataaars.io/";
    }

    function _paramsURI(uint8[13] memory attributes) internal view returns (string memory) {
        string[13] memory params;
        params[0] = string(abi.encodePacked('accessoriesType=', getAccessoriesType(attributes[0])));
        params[1] = string(abi.encodePacked("clotheColor=", getClotheColor(attributes[1])));
        params[2] = string(abi.encodePacked("clotheType=", getClotheType(attributes[2])));
        params[3] = string(abi.encodePacked("eyeType=", getEyeType(attributes[3])));
        params[4] = string(abi.encodePacked("eyebrowType=", getEyeBrowType(attributes[4])));
        params[5] = string(abi.encodePacked("facialHairColor=", getFacialHairColor(attributes[5])));
        params[6] = string(abi.encodePacked("facialHairType=", getFacialHairType(attributes[6])));
        params[7] = string(abi.encodePacked("hairColor=", getHairColor(attributes[7])));
        params[8] = string(abi.encodePacked("hatColor=", getHatColor(attributes[8])));
        params[9] = string(abi.encodePacked("graphicType=", getGraphicType(attributes[9])));
        params[10] = string(abi.encodePacked("mouthType=", getMouthType(attributes[10])));
        params[11] = string(abi.encodePacked("skinColor=", getSkinColor(attributes[11])));
        params[12] = string(abi.encodePacked("topType=", getTopType(attributes[12])));

        string memory result = params[0];
        for (uint i = 1; i < params.length; i++) {
            result = string(abi.encodePacked(result, "&", params[i]));
        }
        return result;
    }

    function imageByAttributes(uint8[13] memory attributes) public view returns (string memory) {
        string memory baseURI = _baseURI();
        string memory paramsURI = _paramsURI(attributes);
        return string(abi.encodePacked(baseURI, "?", paramsURI));
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Metadatos ERC721: Consulta URI para token inexistente");

        uint8[13] memory attributes = tokenAttributes[tokenId];
        string memory image = imageByAttributes(attributes);

        string memory jsonURI = Base64.encode(
            abi.encodePacked(
                '{ "name": "GenesisToken #',
                tokenId.toString(),
                '", "description": "Los Genesis Tokens son retratos hablados de personas buscadas", "image": "',
                image,
                '"}'
            )
        );

        return string(abi.encodePacked("data:application/json;base64,", jsonURI));
    }

    function previewImage(uint8[13] memory selectedAttributes) public view returns (string memory) {
        return imageByAttributes(selectedAttributes);
    }

    function getAllTokenURIs() public view returns (string[] memory) {
        uint256 totalTokens = totalSupply();
        string[] memory uris = new string[](totalTokens);
        for (uint256 i = 0; i < totalTokens; i++) {
            uris[i] = tokenURI(tokenByIndex(i));
        }
        return uris;
    }

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}

    