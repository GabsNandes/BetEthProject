const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Beter", function () {
  it("Should return the new Beting once it's changed", async function () {
    const Beter = await ethers.getContractFactory("Beter");
    const Beter = await Beter.deploy("Hello, world!");
    await Beter.deployed();

    expect(await Beter.Bet()).to.equal("Hello, world!");

    const setBetingTx = await Beter.setBeting("Hola, mundo!");

    // wait until the transaction is mined
    await setBetingTx.wait();

    expect(await Beter.Bet()).to.equal("Hola, mundo!");
  });
});
