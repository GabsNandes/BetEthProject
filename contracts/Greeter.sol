//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.12;

import "hardhat/console.sol";

contract Greeter {
    string private colorChosen;
    bool private winning;
    string private winner;
    uint8 private numChosen;

    string private winningColor;
    uint private winningNumber;

    

    struct Roleta {
        uint numSorted;
        string color;

    }

    Roleta[] public roletas;
    

    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function sortRoleta() public{
        Roleta storage roleta1 = roletas[0];

        

        
            uint numDecided = random();
            roleta1.numSorted = numDecided;

            if(numDecided%2==0){

                roleta1.color = "black"; //simula vermelho

            }else{

                roleta1.color = "red"; //simula preto

        }
        

    }

    function random() public view returns (uint) {
        require(blockhash(block.number - 1) != bytes32(0), "Blockhash not available");

        uint256 blockValue = uint256(blockhash(block.number - 1));
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, blockValue, msg.sender)));
        return (randomNumber % 50);
    }

    constructor(string memory _colorChosen, uint8 _numChosen, bool _winning, string memory _winner) {
        console.log("Deploying a Greeter with greeting:", _colorChosen);
        console.log("Deploying a Greeter with greeting:", _numChosen);
        colorChosen = _colorChosen;
        numChosen = _numChosen;
        winning = _winning;
        winner = _winner;


        Roleta memory roleta;
        
        
        roleta.color= colorChosen;
        roleta.numSorted = numChosen;
            
            roletas.push(
                roleta);
        
    }

    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function bytesToString(bytes memory data) public pure returns (string memory) {
        // Check if the data length is zero
        require(data.length > 0, "Input data is empty");

        string memory result;
        assembly {
            result := add(data, 32) 
        }
        return result;
    }

    function greet() public view returns (string memory, string memory) {
        

        string memory message;
        string memory message2;

        string memory test;
        string memory test2;

        uint8 help;

        help = uint8(winningNumber);

        test = uint2str(help);

        test2 = uint2str(numChosen);

        message = string.concat("Winning Color: ", winningColor," Winning number: ", test, " ", winner);
        message2 = string.concat("You picked: ", test2, " and ",  colorChosen);
        
        return (message, message2);
        
    }

    function setGreeting(string memory _colorChosen, uint8 _numChosen) public {
        console.log("Changing greeting from '%s' to '%s'", colorChosen, _colorChosen);
        colorChosen= _colorChosen;

        console.log("Changing greeting from '%s' to '%s'", numChosen, _numChosen);
        numChosen = _numChosen;

        sortRoleta();

        

        

        Roleta storage roleta1 = roletas[0];

        winningColor = roleta1.color;

        console.log(roleta1.numSorted);

        if(compareStrings(roleta1.color,colorChosen)==true){

            if(roleta1.numSorted==numChosen){
                winning = true;
                winner = "You Win!(BIG WIN)";
            }else{
                winner = "You Win!";
            }
        }else{

            if(roleta1.numSorted==numChosen){
                winning = true;
                winner = "You Win!";
            }else{
                winner = "You Lose!";
            }
        }
    }
}