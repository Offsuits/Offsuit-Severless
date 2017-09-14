import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      result: null,
      instance: null,
      cards: null,
      fiveSpades: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Playing_card_spade_5.svg/400px-Playing_card_spade_5.svg.png',
      fiveHearts: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/5_of_hearts.svg/2000px-5_of_hearts.svg.png',
      ace: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Ace_of_diamonds.svg/2000px-Ace_of_diamonds.svg.png',
      flopA: null,
      flopB: null,
      flopC: null,
      account: null
    };
    this.testServer = this.testServer.bind(this);
    this.receiveCards = this.receiveCards.bind(this);
    this.deal = this.deal.bind(this);
    this.increase = this.increase.bind(this);

  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      });

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    });
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */
    // getHoleCards() {

    // }

    // getFlop(){

    // }

    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
        this.setState({account: accounts[1]})
      simpleStorage.deployed().then((instance) => {

        simpleStorageInstance = instance
        this.setState({instance});

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        console.log(result);
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0]);
      }).then((result) => {
        console.log(result);
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }


  testServer() {
    
    // simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var con;
    
      
      return simpleStorage.deployed().then((r)=> {
        con = r;
        return con.sendName.call(this.state.account);
      }).then((blah)=>{
        console.log('first line ' + blah);
        return con.increment(1, {from: this.state.account});
      }).then((blah)=>{
        console.log('second line' + blah);
        return con.sendName.call(this.state.account);
      }).then((result)=>{
        console.log('easak sucks ' + result);
      })
    
   }

  receiveCards() {
    console.log('easak hong has a tiny dong');
   
    return this.state.instance.sendCard().then((result)=> {
      console.log(result);
      this.setState({cards: result});
    })
  }

  increase() {
    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    
      simpleStorage.deployed().then((instance)=>{
        instance.increment(1, {from: this.state.account})
      }).then((r)=>{
        console.log('helloooo')
      })
  
   
  }

  deal() {  
    let pics = {
      height: 100,
      width: 100
    }
    setTimeout(()=> {
      this.setState({flopA: <img style={{...pics}} src={this.state.fiveSpades} />})
      setTimeout(()=>{
        this.setState({flopB: <img style={{...pics}} src={this.state.fiveHearts} />})
        setTimeout(()=>{
          this.setState({flopC: <img style={{...pics}} src={this.state.ace} />})
        },500)
      },500)
    },500)
  }
    

  render() {
    let img = {
      width: 100,
      height: 100
    }

    let cards = {
      width: 70,
      height: 100,
    }

    
    return (

      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Offsuit</h1>
              <p>GameRoom : Easak's home game</p>
              <button onClick={this.increase}>increase counter </button> 
              <button onClick={this.sendName}>leave table! </button> 
              <button onClick={this.testServer}>settings </button>
              <h2>Smart Contract Example</h2> 
              <div>
              <p>flop: </p>
              <button onClick={this.deal}>deal flop</button>
              {this.state.flopA}
              {this.state.flopB}
              {this.state.flopC}
              
              </div>
              <p>Player: Marc the Shark </p>
              <img style={img} src='https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/10436243_767574619930634_1658954431227105562_n.jpg?oh=ed04714834db96eaf0e497c86c3dfb8b&oe=5A5CCEF1' />
              <div className='hi'>
              <p> Hole Cards: </p>
              <img style={cards} src='https://upload.wikimedia.org/wikipedia/commons/d/d0/Poker-sm-232-Kd.png' />
              <img style={cards} src='https://upload.wikimedia.org/wikipedia/commons/2/25/Poker-sm-242-Kc.png' />
              </div>
              <p>Current chipstack: $500</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
