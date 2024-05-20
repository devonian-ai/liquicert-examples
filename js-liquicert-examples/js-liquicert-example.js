// Start by npm installing dotenv, ethers, js-liquicert
require('dotenv').config();
const { ethers } = require('ethers');
const { Liquicert } = require('js-liquicert');

// Set up a .env file with:
// INFURA_API_KEY -> key for the Infura account you'll use as a provider
// WALLET_SK -> Ethereum sk for the account you will use to sign messages
// Make sure that .env is included in .gitignore!

// Replace this address with the Eth address of the community you will be searching for paths from.
// This can be the address for the wallet above, or another communitiy
const srcCommunity = '0x02432e264b5b843264Bfcf6f385B0e601A141Dc7'

// Create an infura provider and connect to a wallet using the SK we want to use for liquicert
const infuraProvider = new ethers.InfuraProvider("sepolia", process.env.INFURA_API_KEY);
const wallet = new ethers.Wallet(process.env.WALLET_SK, infuraProvider);

// Set up a Liquicert instance and pass it the provider and wallet
const lc = new Liquicert(infuraProvider, wallet);

// Example function to make async calls
async function example(src, target) {

    // We will pin some data to IPFS, create an attestation, and save a path to that attestation.
    // If you already have your own data on IPFS, use that CID instead of this upload utility
    // Because this interacts with the public version of liquicert, add your own data here. It will be permanently made public.
    const dataToSave = {treeSpecies: "Arbutus Menziesii", diameter_cm: 23}

    // Pin the data and generate URL to view
    const cidResult = await lc.saveData(JSON.stringify(dataToSave))
    console.log(`View your data at https://${cidResult}.ipfs.w3s.link/`)

    // Replace with values that make sense give your data above.
    const data_name = 'Pacific Madrone Data';
    const data_CID = cidResult;
    const data_description = 'Diameter data for a pacific madrone tree specimen.'
    const data_trusted = true; // False means you are attesting the data is misinformation

    // Create an attestation for this data. Liquicert will use the wallet above to sign the CID
    // After this runs, your attestation should be available at https://liquicert.io/content
    // Commented out by default to avoid adding extra attestations
    // lc.createAttestation(data_name, data_CID, data_description, data_trusted)

    // Search for a trust path from a source (community eth address) -> target (data CID)
    // Returns an array, where each element is a path
    const cidTarget = 'bafybeiekou7hge26rupv24apyleug7ehz7d5xb67bekeggoexynzrzi6k4'
    const pathArray = await lc.findPath(srcCommunity, cidTarget);
    
    // Save a path, returns its CID
    const myPathJSON = pathArray[0]; // Choose a path
    console.log(myPathJSON)
    const path_CID = await lc.savePath(myPathJSON)
    console.log(`View the path at https://liquicert.io/attestation?trustpath=${path_CID}`)

}

example();