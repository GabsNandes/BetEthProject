import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import "./App.css";

import { useState } from "react";

import { ethers } from "ethers";



// Import ABI Code to interact with smart contract


// The contract address
const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  // Property Variables

  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  const [currentGreeting, setCurrentGreeting] = useState("");
  console.log(ethers.providers);
  // Helper Functions

  // Requests access to the user's Meta Mask Account
  // https://metamask.io/
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // Fetches the current value store in greeting
  async function fetchGreeting() {
    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );
      try {
        // Call Greeter.greet() and display current greeting in `console`
        /* 
          function greet() public view returns (string memory) {
            return greeting;
          }
        */
        const data = await contract.greet();
        console.log("data: ", data);
        setCurrentGreeting(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }

  // Sets the greeting from input text box
  async function setGreeting() {
    if (!message) return;

    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Create contract with signer
      /*
        function setGreeting(string memory _greeting) public {
          console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
          greeting = _greeting;
        } 
      */
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(message, message2);

      setMessage("");
      setMessage2("");
      await transaction.wait();
      fetchGreeting();
    }
  }

  // Return
  return (
    <div className="App">
      <div className="App-header">
        {/* DESCRIPTION  */}
        <div className="description">
          <h1>BetEth</h1>
          
        </div>
        {/* BUTTONS - Fetch and Set */}
        <div className="custom-buttons">
          <button onClick={setGreeting} style={{ backgroundColor: "red" }}>
            Place Bet!
          </button>
        </div>
        {/* INPUT TEXT - String  */}
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Color"
        />

        <input
          onChange={(e) => setMessage2(e.target.value)}
          value={message2}
          placeholder="Number"
        />

        {/* Current Value stored on Blockchain */}
        <h2 className="greeting">{currentGreeting}</h2>
      </div>
    </div>
  );
}

export default App;