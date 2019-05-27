const SHA256 = require('crypto-js/sha256');


class Block { // Block 

    constructor(timestamp, data) {

        this.index = 0;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = "0";
        this.nonce = 0;
        this.hash = this.calculateHash();
       
    }

    calculateHash() {
        return SHA256(this.index +this.previousHash + this.timestamp  +  this.nonce + JSON.stringify(this.data)).toString();


    }

    mineBlock(difficulty) {
        // Keep changing the nonce until the hash of our block starts with enough zero's.
  while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
    this.nonce++;
    this.hash = this.calculateHash();
  }


  console.log("BLOCK MINED: " + this.hash);

    }
}


class Blockchain{   // Chain of Block
    constructor() {
        this.chain = [this.createGenesis()];
        this.difficulty = 4;

    }

    createGenesis() {
        return new Block("01/01/2017", "Genesis block")
    }

    latestBlock() {
        return this.chain[this.chain.length - 1]
    }

    

    addBlock(newBlock){ 
        const now = new Date();
        newBlock.previousHash = this.latestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        newBlock.index =  this.latestBlock().index +1;
        newBlock.timestamp = now;
        // console.log("Index of Previeus Block is :"+ newBlock.previousBlockIndex()+ 1);
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    checkValid() { // Check validate or tempering check
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}


let jsChain = new Blockchain();  // Create Genesis Block
console.log("Block 1 is minning...");
jsChain.addBlock(new Block( "12/25/2017", {amount: 5})); // Add block 1

console.log("Block 2 is minning.....");
jsChain.addBlock(new Block("12/26/2017", {amount: 10})); // Add block 2


console.log("Block 3 is minning....."); // Add block 3
jsChain.addBlock(new Block("12/26/2017", {amount1: 10,
amount:30})); 



console.log("Block 4 is minning....."); // Add block 3
jsChain.addBlock(new Block("12/26/2017", {amount1: 10,
amount:30,
msg1: "You can add any thing in data part"})); 


console.log(JSON.stringify(jsChain, null, 4));
console.log("Is blockchain valid? " + jsChain.checkValid()); 

