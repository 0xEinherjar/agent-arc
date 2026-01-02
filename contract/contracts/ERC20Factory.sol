// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title Simple ERC20 Factory
/// @author Einherjar
/// @notice Factory that creates simple ERC20 tokens with initial name/symbol/supply using OpenZeppelin.

/// ---------- Simple ERC20 (OpenZeppelin-based) ----------
contract SimpleERC20 is ERC20 {
    /// @notice Emitted when this token is created from the factory.
    event TokenCreated(address indexed owner, string name, string symbol, uint256 initialSupply);

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        address owner
    ) ERC20(name, symbol) {
        if (initialSupply > 0) {
            _mint(owner, initialSupply * 10 ** decimals());
        }
        emit TokenCreated(owner, name, symbol, initialSupply);
    }
}

/// ---------- Factory ----------
contract ERC20Factory {
    /// Emitted when a new token is created
    event ERC20TokenDeployed(address indexed creator, address indexed tokenAddress, string name, string symbol, uint256 initialSupply);

    /// List of all tokens deployed via this factory
    address[] public allTokens;

    /// Mapping creator => tokens they created
    mapping(address => address[]) public tokensByCreator;

    /// Create a new SimpleERC20 token.
    /// @param name Token name
    /// @param symbol Token symbol
    /// @param initialSupply Initial supply (in token base units, i.e. include decimals)
    /// @param owner Address that receives the initial supply (if initialSupply > 0)
    /// @return tokenAddress Address of newly deployed token contract
    function createToken(
        string calldata name,
        string calldata symbol,
        uint256 initialSupply,
        address owner
    ) external returns (address tokenAddress) {
        // If owner is zero, default to msg.sender
        address tokenOwner = owner == address(0) ? msg.sender : owner;

        // Deploy a fresh SimpleERC20 using OpenZeppelin's ERC20
        SimpleERC20 token = new SimpleERC20(name, symbol, initialSupply, tokenOwner);

        tokenAddress = address(token);

        // Record
        allTokens.push(tokenAddress);
        tokensByCreator[msg.sender].push(tokenAddress);

        emit ERC20TokenDeployed(msg.sender, tokenAddress, name, symbol, initialSupply);
    }

    /// Convenience view: number of tokens deployed by factory
    function allTokensLength() external view returns (uint256) {
        return allTokens.length;
    }

    /// Get tokens created by an address
    function getTokensByCreator(address creator) external view returns (address[] memory) {
        return tokensByCreator[creator];
    }
}
