require('dotenv').config();
const { ethers } = require('ethers');
const { Liquicert } = require('js-liquicert');

// Set up a .env file with:
// INFURA_API_KEY -> key for the Infura account you'll use as a provider
// WALLET_SK -> Ethereum sk for the account you will use to sign messages

console.log(process.env.TEST)

// Create an infura provider and connect to a wallet using the SK we want to use for liquicert
const infuraProvider = new ethers.InfuraProvider("sepolia", process.env.INFURA_API_KEY);
const wallet = new ethers.Wallet(process.env.WALLET_SK, infuraProvider);

// Set up a Liquicert instance and pass it the provider and wallet
const lc = new Liquicert(infuraProvider, wallet);

