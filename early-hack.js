// defines target server for the hack
var target = 'insert server';

// defines the max ammount of money the server should have
// before we decide to hack it, this case is 75% of the max money
var moneyThresh = getServerMaxMoney(target) * 0.75;

//defines the max security level the server can have.
//if it is higher than this we have to weaken it.
var securityThresh = getServerMinSecurityLevel(target) + 5;

// if we have the BruteSSH.exe program use it to open the SSH port
if (fileExists("BruteSSH.exe", "home")){
  brutessh(target);
}
//get root access to target server
nuke(target);

// Infinite loop that continously hacks/grows/weakens the target server
while(true) {
    if (getServerSecurityLevel(target) > securityThresh) {
        // If the server's security level is above our threshold, weaken it
        weaken(target);
    } else if (getServerMoneyAvailable(target) < moneyThresh) {
        // If the server's money is less than our threshold, grow it
        grow(target);
    } else {
        // Otherwise, hack it
        hack(target);
    }
}