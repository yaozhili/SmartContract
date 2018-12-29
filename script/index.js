if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
}
var myContract = web3.eth.contract(myabi);

var my = myContract.at("0xeae15f58cb3ac5b49bb951fd6e9421978fe97363");

web3.eth.defaultAccount = web3.eth.accounts[0];

var accounts = web3.eth.accounts.length;

$(document).ready(function() {
    displayAccounts();
    $("#chooseDefaultAccountButton").click(function(){changeDefaultAccount();})
    $("#newDonateButton").click(function(){newDonate();})
    var event = my.ReturnValue({_from: web3.eth.defaultAccount});
    event.watch(function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(result.args._value);
      $("#newDonateRet").html("Your donation id is " + result.args._value);
    })
    $("#getMoneyButton").click(function(){getMoney();})
    $("#getDonationButton").click(function(){getDonation();})
})

function displayAccounts() {
    var accounts_area = $("#accounts");
    for (var i = 0; i < accounts; i++) {
        accounts_area.append($("<div></div>").addClass("account").attr("id", i.toString()));
        $("#"+i.toString()).html("Accounts "+ i + " : " + web3.eth.accounts[i] + 
            " Balances : " + web3.fromWei(web3.eth.getBalance(web3.eth.accounts[i]), 'ether') + " ether");
    }
    $("#defaultAccount").html("Your default account is accounts 0.");
}

function newDonate() {
    var goal = parseInt($("#newDonateGoal").val());
    if (goal > 0) {
        my.newDonate.sendTransaction(goal, function(err, tx) {
            if (tx == undefined) {
                $("#newDonateRet").html("Account locked, newDonate failed.");
            } else {
                console.log(tx);
                $("#newDonateRet").html("New donation created.Transaction hash: " + tx);
            }
        });
    } else {
        $("#newDonateRet").html("Invalid input, newDonate failed.");
    }
    
}

function changeDefaultAccount() {
    var i = parseInt($("#chooseDefaultAccount").val());
    if (i >= 0 && i < accounts) {
        web3.eth.defaultAccount = web3.eth.accounts[i];
        $("#defaultAccount").html("Your default account is accounts " + i +".");
    }
}

function getMoney() {
    var id = parseInt($("#getMoneyValue").val());
    my.getMoney.sendTransaction(id, function(err, tx) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(tx);
    });
}

function getDonation() {
    var id = parseInt($("#getDonationValue").val());
    var ret = my.getDonation.call(id);
    var info = "Goal: " + ret[0].toNumber() + "        AlreadyGet: " + ret[1].toNumber();
    $("#getDonationRet").html(info);
}