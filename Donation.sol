pragma solidity ^0.4.24;
contract Donation{

    struct Donate {
        address beneficiary;
        uint goal;
        uint alreadyGet;
        uint amount;
    }

    uint numDonate;
    mapping (uint => Donate) Donates;

    event ReturnValue(address indexed _from, uint _value);
    function newDonate(uint goal) public returns (uint donateID) {
        donateID = numDonate++;
        Donates[donateID] = Donate(msg.sender, goal, 0, 0);
        emit ReturnValue(msg.sender, donateID);
    }

    function donate(uint donateID) public payable {
        require(
            Donates[donateID].amount < Donates[donateID].goal,
            "Donation has already finished."
        );
        Donates[donateID].amount += msg.value;
    }

    function getMoney(uint donateID) public {
        require(
            Donates[donateID].amount > Donates[donateID].alreadyGet,
            "No money left."
        );
        
        require(
            Donates[donateID].beneficiary == msg.sender,
            "Only the beneficiary can get the money."
        );
        
        uint tmp = Donates[donateID].amount - Donates[donateID].alreadyGet;
        Donates[donateID].alreadyGet = Donates[donateID].amount;
        Donates[donateID].beneficiary.transfer(tmp);
    }
    
    function getDonation(uint donateID) public constant returns(uint goal_, uint amount_) {
        goal_ = Donates[donateID].goal;
        amount_ = Donates[donateID].amount;
    }
    
}