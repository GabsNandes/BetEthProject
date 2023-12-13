const hre = require("hardhat");

async function main() {


  var randNum = Math.floor(Math.random() * 50);

  var color = "0";

  if(randNum%2==0){
    color = "black";
  }else{
    color="red";
  }


  const Greeter = await hre.ethers.getContractFactory("Greeter");



  const greeter = await Greeter.deploy(color, randNum, false, "Lose :(");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
