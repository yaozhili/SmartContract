myabi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "donateID",
        "type": "uint256"
      }
    ],
    "name": "getMoney",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "goal",
        "type": "uint256"
      }
    ],
    "name": "newDonate",
    "outputs": [
      {
        "name": "donateID",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "donateID",
        "type": "uint256"
      }
    ],
    "name": "getDonation",
    "outputs": [
      {
        "name": "goal_",
        "type": "uint256"
      },
      {
        "name": "amount_",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "donateID",
        "type": "uint256"
      }
    ],
    "name": "donate",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "ReturnValue",
    "type": "event"
  }
]