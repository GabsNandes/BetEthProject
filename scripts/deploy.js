const hre = require("hardhat");

async function main() {


  var randNum = Math.floor(Math.random() * 50);

  var color = "0";

  if(randNum%2==0){
    color = "black";
  }else{
    color="red";
  }


  const Beter = await hre.ethers.getContractFactory("Beter");



  const beter = await Beter.deploy(color, randNum, false, "Lose :(");

  await beter.deployed();

  console.log("Beter deployed to:", beter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
