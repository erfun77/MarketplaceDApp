// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16 <0.9.0;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract Marketplace {

    using SafeMath for uint;
    string public name;
    uint public productCount = 0;
    mapping(uint => Product) public products;

    constructor() public {
        name = "Marketplace";
    }

    struct Product {
        uint id;
        string name;
        string productHash;
        uint price;
        address payable owner;
        bool purchased;
    }

    event ProductCreated(
        uint id,
        string name,
        string productHash,
        uint price,
        address payable owner,
        bool purchased
    );

    function createProduct(string memory _name, string memory _img, uint _price) public {
        // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid price
        require(_price > 0);
        // Increment product count
        productCount =productCount.add(1);
        // Create the product
        products[productCount] = Product(productCount, _name, _img, _price,payable(msg.sender), false);
        // Trigger an event
        emit ProductCreated(productCount, _name, _img, _price, payable(msg.sender), false);
    }

    function getHash(uint256 _id) public view returns (string memory img) {
        img = products[_id].productHash;
    }

    event ProductPurchased(
    uint id,
    string name,
    string productHash,
    uint price,
    address payable owner,
    bool purchased
    );
    
    function purchaseProduct(uint _id) public payable {
    // Fetch the product
    Product memory _product = products[_id];
    // Fetch the owner
    address payable _seller = _product.owner;
    // Make sure the product has a valid id
    require(_product.id > 0 && _product.id <= productCount);
    // Require that there is enough Ether in the transaction
    require(msg.value >= _product.price);
    // Require that the product has not been purchased already
    require(!_product.purchased);
    // Require that the buyer is not the seller
    require(_seller != msg.sender);
    // Transfer ownership to the buyer
    _product.owner = payable(msg.sender);
    // Mark as purchased
    _product.purchased = true;
    // Update the product
    products[_id] = _product;
    // Pay the seller by sending them Ether
    _seller.transfer(msg.value);
    // Trigger an event
    emit ProductPurchased(productCount, _product.name, _product.productHash, _product.price, payable(msg.sender), true);
    }
}