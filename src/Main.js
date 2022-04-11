import React, { Component } from 'react';
import Web3 from 'web3';
import ipfs from "./ipfs";

class Main extends Component {

  constructor(props) {
    super(props)

    this.state = {
      ipfsHash:'',
      buffer: null,
    }
    this.captureFile = this.captureFile.bind(this);
  }

  captureFile(event) {

    event.preventDefault();
    const img = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(img)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result)})

      ipfs.files.add(this.state.buffer, (error, result) => {
        if(error) {
          console.error(error)
          return
        }
        console.log('Hash', result[0].hash)
        this.setState({ ipfsHash: result[0].hash })
        
      })
    }
  }


  render() {
    return (
      <div id="content">
        <h1>Add Product</h1>
        <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt=""/>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          const hash = this.state.ipfsHash

          this.props.createProduct(name, hash, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Product Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="Product Price"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productImage"
              type="file"
              onChange={this.captureFile}
              className="form-control"
              placeholder="Product Image"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
        <p> </p>
        <h2>Buy Product</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col">Image</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
              { this.props.products.map((product,key) => {
                  return(
                  <tr key = {key}>
                    <th scope="row">{product.id.toString()}</th>
                    <td>{product.name}</td>
                    <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} ETH</td>
                    <td>{product.owner}</td>
                    <td><a href={'https://ipfs.io/ipfs/' + product.productHash} alt="">Product Photo</a></td>
                    
                    <td>
                      { !product.purchased
                        ?<button  
                          name = {product.id}
                          value = {product.price}
                          onClick={(event)=>{
                            this.props.purchaseProduct(event.target.name, event.target.value)
                          }}>
                          Buy
                        </button> 
                        : null
                      }
                    </td>
                  </tr>
                  )
                })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;