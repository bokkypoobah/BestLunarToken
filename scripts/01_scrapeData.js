var fs = require('fs');
const util = require('util');
const { ethers } = require("ethers");

const LUNATOKENADDRESS = "0x43fb95c7afA1Ac1E721F33C695b2A0A94C7ddAb2";
const LUNATOKENDEPLOYMENTBLOCKNUMBER = 4395031;
const LUNATOKENABI = [{"constant":false,"inputs":[{"name":"enabled","type":"bool"}],"name":"setSubdivisionEnabled","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"metadata","type":"string"},{"name":"forSale","type":"bool"},{"name":"newPrice","type":"uint256"}],"name":"purchase","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"numPlots","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalOwned","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newBeneficiary","type":"address"}],"name":"setBeneficiary","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"initialPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"},{"name":"idx","type":"uint256"}],"name":"tokensOfOwnerByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tradingEnabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"newData","type":"string"}],"name":"setMetadata","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalPurchases","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"plots","outputs":[{"name":"owner","type":"address"},{"name":"price","type":"uint256"},{"name":"forSale","type":"bool"},{"name":"metadata","type":"string"},{"name":"disabled","type":"bool"},{"name":"subdivision","type":"uint8"},{"name":"parentID","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"subdivisionEnabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_priceInWei","type":"uint256"}],"name":"setInitialPrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feePercentage","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"forSale1","type":"bool"},{"name":"forSale2","type":"bool"},{"name":"price1","type":"uint256"},{"name":"price2","type":"uint256"},{"name":"metadata1","type":"string"},{"name":"metadata2","type":"string"}],"name":"subdivide","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_percentage","type":"uint8"}],"name":"setFeePercentage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"forSale","type":"bool"},{"name":"newPrice","type":"uint256"}],"name":"setPrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"enabled","type":"bool"}],"name":"setTradingEnabled","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"plotsOwned","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxSubdivisions","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"newOwner","type":"address"},{"name":"newData","type":"string"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"isUnowned","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_numPlots","type":"uint256"},{"name":"_initialPriceInWei","type":"uint256"},{"name":"_feePercentage","type":"uint8"},{"name":"_tradingEnabled","type":"bool"},{"name":"_subdivisionEnabled","type":"bool"},{"name":"_maxSubdivisions","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"id","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"id","type":"uint256"},{"indexed":false,"name":"price","type":"uint256"}],"name":"Purchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"id","type":"uint256"},{"indexed":false,"name":"newPrice","type":"uint256"}],"name":"PriceChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"id","type":"uint256"},{"indexed":false,"name":"newData","type":"string"}],"name":"MetadataUpdated","type":"event"}];

async function doIt() {
  const provider = new ethers.providers.JsonRpcProvider();
  const signer = provider.getSigner()
  const blockNumber = await provider.getBlockNumber();
  console.log("blockNumber: " + blockNumber.toString());

  const lunaToken = new ethers.Contract(LUNATOKENADDRESS, LUNATOKENABI, provider);
  const symbol = await lunaToken.symbol();
  console.log("symbol: " + symbol);
  const name = await lunaToken.name();
  console.log("name: " + name);
  const numPlots = await lunaToken.numPlots();
  console.log("numPlots: " + numPlots);
  const totalOwned = await lunaToken.totalOwned();
  console.log("totalOwned: " + totalOwned);
  const totalPurchases = await lunaToken.totalPurchases();
  console.log("totalPurchases: " + totalPurchases);
  const initialPrice = await lunaToken.initialPrice();
  console.log("initialPrice: " + ethers.utils.formatEther(initialPrice) + " ETH");
  const feePercentage = await lunaToken.feePercentage();
  console.log("feePercentage: " + feePercentage);
  const tradingEnabled = await lunaToken.tradingEnabled();
  console.log("tradingEnabled: " + tradingEnabled);
  const subdivisionEnabled = await lunaToken.subdivisionEnabled();
  console.log("subdivisionEnabled: " + subdivisionEnabled);
  const maxSubdivisions = await lunaToken.maxSubdivisions();
  console.log("maxSubdivisions: " + maxSubdivisions);
  const balance = await provider.getBalance(LUNATOKENADDRESS)
  console.log("balance: " + ethers.utils.formatEther(balance) + " ETH");

  function padLeft(s, n) {
    var o = s.toString();
    while (o.length < n) {
      o = " " + o;
    }
    return o;
  }

  console.log("  # Owner                                         Price To Purchase For Sale Disabled Metadata");
  for (let i = 0; i < numPlots; i++) {
    const plot = await lunaToken.plots(i);
    console.log(padLeft(i, 3) + " " + plot[0] + " " + padLeft(ethers.utils.formatEther(plot[1]), 20) + " " +
      (plot[2] ? "       y" : "       n") + " " +
      (plot[4] ? "       y" : "       n") + " " +
      plot[3]);

  }

  // struct LunarPlot {
  //   address owner;
  //   uint price;
  //   bool forSale;
  //   string metadata;
  //   bool disabled;
  //   uint8 subdivision;
  //   uint parentID;
  // }


  // event Assign(address indexed to, uint256 punkIndex);
  // event Transfer(address indexed from, address indexed to, uint256 value);
  // event PunkTransfer(address indexed from, address indexed to, uint256 punkIndex);
  // event PunkOffered(uint indexed punkIndex, uint minValue, address indexed toAddress);
  // event PunkBidEntered(uint indexed punkIndex, uint value, address indexed fromAddress);
  // event PunkBidWithdrawn(uint indexed punkIndex, uint value, address indexed fromAddress);
  // event PunkBought(uint indexed punkIndex, uint value, address indexed fromAddress, address indexed toAddress);
  // event PunkNoLongerForSale(uint indexed punkIndex);


}

doIt();

//
// const fetch = require('node-fetch');
//
// const BATCHSIZE = 50;
// const TOTALSUPPLY = 11305;
//
// const downloadFile = (async (url, path) => {
//   const res = await fetch(url);
//   const fileStream = fs.createWriteStream(path);
//   await new Promise((resolve, reject) => {
//     res.body.pipe(fileStream);
//     res.body.on("error", reject);
//     fileStream.on("finish", resolve);
//   });
// });
//
// async function doit() {
//   for (let i = 0; i < TOTALSUPPLY; i += BATCHSIZE) {
//     let filename = "osraw/" + i + ".json";
//     let url = "https://api.opensea.io/api/v1/assets?asset_contract_address=0x31385d3520bCED94f77AaE104b406994D8F2168C\&order_direction=desc\&limit=50\&offset=0";
//     for (let j = i; j < i + BATCHSIZE && j < TOTALSUPPLY; j++) {
//       url = url + "&token_ids=" + j;
//     }
//     console.log("Downloading " + i + " with batch size " + BATCHSIZE);
//     await downloadFile(url, filename);
//   }
// }
//
// doit();

console.log(process.cwd());
