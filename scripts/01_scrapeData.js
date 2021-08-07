var fs = require('fs');
const util = require('util');
const { ethers } = require("ethers");

const LUNARTOKENADDRESS = "0x43fb95c7afA1Ac1E721F33C695b2A0A94C7ddAb2";
const LUNARTOKENDEPLOYMENTBLOCKNUMBER = 4395031;
const LUNARTOKENABI = [{"constant":false,"inputs":[{"name":"enabled","type":"bool"}],"name":"setSubdivisionEnabled","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"metadata","type":"string"},{"name":"forSale","type":"bool"},{"name":"newPrice","type":"uint256"}],"name":"purchase","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"numPlots","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalOwned","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newBeneficiary","type":"address"}],"name":"setBeneficiary","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"initialPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"},{"name":"idx","type":"uint256"}],"name":"tokensOfOwnerByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tradingEnabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"newData","type":"string"}],"name":"setMetadata","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalPurchases","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"plots","outputs":[{"name":"owner","type":"address"},{"name":"price","type":"uint256"},{"name":"forSale","type":"bool"},{"name":"metadata","type":"string"},{"name":"disabled","type":"bool"},{"name":"subdivision","type":"uint8"},{"name":"parentID","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"subdivisionEnabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_priceInWei","type":"uint256"}],"name":"setInitialPrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feePercentage","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"forSale1","type":"bool"},{"name":"forSale2","type":"bool"},{"name":"price1","type":"uint256"},{"name":"price2","type":"uint256"},{"name":"metadata1","type":"string"},{"name":"metadata2","type":"string"}],"name":"subdivide","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_percentage","type":"uint8"}],"name":"setFeePercentage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"forSale","type":"bool"},{"name":"newPrice","type":"uint256"}],"name":"setPrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"enabled","type":"bool"}],"name":"setTradingEnabled","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"plotsOwned","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxSubdivisions","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"newOwner","type":"address"},{"name":"newData","type":"string"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"isUnowned","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_numPlots","type":"uint256"},{"name":"_initialPriceInWei","type":"uint256"},{"name":"_feePercentage","type":"uint8"},{"name":"_tradingEnabled","type":"bool"},{"name":"_subdivisionEnabled","type":"bool"},{"name":"_maxSubdivisions","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"id","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"id","type":"uint256"},{"indexed":false,"name":"price","type":"uint256"}],"name":"Purchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"id","type":"uint256"},{"indexed":false,"name":"newPrice","type":"uint256"}],"name":"PriceChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"id","type":"uint256"},{"indexed":false,"name":"newData","type":"string"}],"name":"MetadataUpdated","type":"event"}];

async function doIt() {
  const provider = new ethers.providers.JsonRpcProvider();
  const signer = provider.getSigner()
  const blockNumber = await provider.getBlockNumber();
  console.log("blockNumber: " + blockNumber.toString());

  const lunarToken = new ethers.Contract(LUNARTOKENADDRESS, LUNARTOKENABI, provider);
  const symbol = await lunarToken.symbol();
  console.log("symbol: " + symbol);
  const name = await lunarToken.name();
  console.log("name: " + name);
  const numPlots = await lunarToken.numPlots();
  console.log("numPlots: " + numPlots);
  const totalOwned = await lunarToken.totalOwned();
  console.log("totalOwned: " + totalOwned);
  const totalPurchases = await lunarToken.totalPurchases();
  console.log("totalPurchases: " + totalPurchases);
  const initialPrice = await lunarToken.initialPrice();
  console.log("initialPrice: " + ethers.utils.formatEther(initialPrice) + " ETH");
  const feePercentage = await lunarToken.feePercentage();
  console.log("feePercentage: " + feePercentage);
  const tradingEnabled = await lunarToken.tradingEnabled();
  console.log("tradingEnabled: " + tradingEnabled);
  const subdivisionEnabled = await lunarToken.subdivisionEnabled();
  console.log("subdivisionEnabled: " + subdivisionEnabled);
  const maxSubdivisions = await lunarToken.maxSubdivisions();
  console.log("maxSubdivisions: " + maxSubdivisions);
  const balance = await provider.getBalance(LUNARTOKENADDRESS)
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
    const plot = await lunarToken.plots(i);
    console.log(padLeft(i, 3) + " " + plot[0] + " " + padLeft(ethers.utils.formatEther(plot[1]), 20) + " " +
      (plot[2] ? "       y" : "       n") + " " +
      (plot[4] ? "       y" : "       n") + " " +
      plot[3]);

  }
}

doIt();

console.log(process.cwd());
