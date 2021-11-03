// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

contract Housing {
  mapping(uint256 => Lease) private Leases;

  struct Lease {
    address owner;
    string leaseHash;
  }
}
