import dotenv from 'dotenv'
dotenv.config()

import axios from 'axios'
import readline from 'readline'
import Wallet from "../lib/wallet"

const BLOCKCHAIN_SERVER = process.env.BLOCKCHAIN_SERVER

let myWalletPub = ''
let myWalletPriv = ''

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function menu() {
  setTimeout(() => {
    console.clear()

    if (myWalletPub) {
      console.log(`You are logged as ${myWalletPub}`)
    } else {
      console.log(`You are not logged.`)
    }

    console.log("1 - Create Wallet")
    console.log("2 - Recover Wallet")
    console.log("3 - Balance")
    console.log("4 - Send tx")
    console.log("5 - Logout")
    rl.question("Choose your option: ", (answer) => {
      switch (answer) {
        case '1':
          createWallet()
        break
        case '2':
          recoverWallet()
        break
        case '3':
          getBalance()
        break
        case '4': 
          sendTx()
        break
        case '5': 
          myWalletPriv = ''
          myWalletPub = ''
        break
        default: {
          console.log('Wrong option!')
          menu()
        }
      }
    })

  }, 1000)
}

function prevMenu() {
  rl.question(`Press any key to continue...`, () => {
    menu()
  })
}

function createWallet() {
  console.clear()
  const wallet = new Wallet()
  console.log('Your new wallet:')
  console.log(wallet)

  myWalletPub = wallet.publicKey
  myWalletPriv = wallet.privateKey
  prevMenu()
}

function recoverWallet() {
  console.clear()
  rl.question(`What is your private key or WIF?`, (wifOrPrivateKey) => {
    const wallet = new Wallet(wifOrPrivateKey)
    console.log('Your recovered wallet:')
    console.log(wallet)
    
    myWalletPub = wallet.publicKey
    myWalletPriv = wallet.privateKey
    prevMenu()
  })
}

function getBalance() {
  console.clear()

  if (!myWalletPub) {
    console.log(`You don't have a wallet yet.`)
    return prevMenu()
  }

  // TODO: getBalance by API
  prevMenu()
}

function sendTx() {
  console.clear()

  if (!myWalletPub) {
    console.log(`You don't have a wallet yet.`)
    return prevMenu()
  }

  // TODO: sendTx by API
  prevMenu()
}

menu()