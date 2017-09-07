pragma solidity ^0.4.2;

contract SimpleStorage {
   uint storedData;
  // bytes32 user;
  // user = "Easak";
  // var age = 9;
  // var info = []; 
   string name;
   
   

  function set(uint x) {
    storedData = x;
  }

  function get() constant returns (uint) {
    return storedData;
  }

  // function printMe(y) {
  //   console.log(y);
  // } 

  function sendName() constant returns (string) {
    name = "Abhi";
    return name;
  }






}
