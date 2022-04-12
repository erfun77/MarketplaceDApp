# Decentralized Marketplace
This is a marketplace that runs on the blockchain. It allows people to list items for sale. It also allows people to purchase them on the website with cryptocurrency. Whenever someone purchases the item, they instantly become the owner. That’s because this application is powered by a smart contract on the blockchain which manages the market place. It tracks who owns the items for sale, and it transfers the ownership of the items automatically anytime someone purchases them with cryptocurrency. 

## developement
The smart contracts are build using truffle and tested locally using ganache-cli. The project is also deployed on rinkedby testnet. The front end is developed using React.js.

IPFS is also used to store image files related to products.

## test DApp on reinkedby
it is assumed that you have nodejs and yarn installed. You also need to have metamask extension added to your chrome browser.

The next steps will be:
1. Clone project
2. yarn in main directory will install all dependencies
```
yarn
```
3. yarn start will run DApp http://localhost:3000/
```
yarn start
```
If you are going to redeploy the contracts to testnet you can use:
```
truffle migrate --reset --network rinkeby
```
## test locally using ganache
You need to install truffle and ganache and truffle hdwallet-provider to compile, migrate, and test smart contracts locally.
In a command line window run: ganache-cli
Move to another command line window.
In MarketPlace sub-directory:
```
1. truffle compile
```
```
2. truffle migrate
```
```
3. truffle console
```
```
4. truffle test
```

## Used libraries and additional services
1. SafemMath from openzeppeline is used to restores this intuition by reverting the transaction when an operation overflows. Using this library instead of the unchecked operations eliminates an entire class of bugs, so it's recommended to use it always.
2. 
3. IPFS used for saving image files and theIPFS hash of images saved on blockchain
