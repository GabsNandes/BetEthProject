import Beter from "./artifacts/contracts/Beter.sol/Beter.json";
import "./App.css";

import { useState } from "react";

import { ethers } from "ethers";



// Import ABI Code to interact with smart contract


// The contract address
const BeterAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

function App() {
  // Property Variables

  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  const [currentBeting, setCurrentBeting] = useState("");
  console.log(ethers.providers);
  // Helper Functions

  // Requests access to the user's Meta Mask Account
  // https://metamask.io/
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // Fetches the current value store in Beting
  async function fetchBeting() {
    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        BeterAddress,
        Beter.abi,
        provider
      );
      try {
        // Call Beter.Bet() and display current Beting in `console`
        /* 
          function Bet() public view returns (string memory) {
            return Beting;
          }
        */
        const data = await contract.Bet();
        console.log("data: ", data);
        setCurrentBeting(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }

  // Sets the Beting from input text box
  async function setBeting() {
    if (!message) return;

    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Create contract with signer
      /*
        function setBeting(string memory _Beting) public {
          console.log("Changing Beting from '%s' to '%s'", Beting, _Beting);
          Beting = _Beting;
        } 
      */
      const contract = new ethers.Contract(BeterAddress, Beter.abi, signer);
      const transaction = await contract.setBeting(message, message2);

      setMessage("");
      setMessage2("");
      await transaction.wait();
      fetchBeting();
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
          <button onClick={setBeting} style={{ backgroundColor: "red" }}>
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
        <h2 className="Beting">{currentBeting}</h2>
      </div>
    </div>
  );
}

export default App;