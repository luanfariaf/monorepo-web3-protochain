# Protochain

## Description
This project is a Protochain that simulate a blockchain server that handles transactions and wallets. It provides endpoints to interact with the blockchain, add transactions, and retrieve wallet information.

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/luanfariaf/monorepo-web3-protochain.git
    ```
2. Navigate to the project directory:
    ```sh
    cd monorepo-web3-protochain
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
4. Navigate to protochain:
    ```sh
    cd protochain
    ```

    ### Start Blockchain Server
    To start the blockchain server:
        ```
        npm run blockchain
        ```
    ### Start Miner Client
    To start the miner client:
        ```
        npm run miner
        ```

    ### Start Wallet Client
    To start the wallet client:
        ```
        npm run wallet
        ```

## Usage
Once the server is running, you can interact with it using the following endpoints:

### API Endpoints

#### Get Transactions
- **Endpoint**: `/transactions/:hash?`
- **Method**: GET
- **Description**: Retrieve a specific transaction by hash or get the next set of transactions in the mempool.
- **Parameters**:
  - `hash` (optional): The hash of the transaction to retrieve.

#### Add Transaction
- **Endpoint**: `/transactions`
- **Method**: POST
- **Description**: Add a new transaction to the blockchain.
- **Body**:
  - `hash` (required): The hash of the transaction.

#### Get Wallet Information
- **Endpoint**: `/wallets/:wallet`
- **Method**: GET
- **Description**: Retrieve the UTXO, balance, and fee per transaction for a specific wallet.
- **Parameters**:
  - `wallet` (required): The wallet address.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License
This project is licensed under the MIT License.

## Created by Luan Faria

<p align="center">
  <samp>
    <a href="https://luuanfaria.dev">website</a> .
    <a href="https://linkedin.com/in/luuanfaria">linkedin</a> .
    <a href="https://twitter.com/luuanfariaf">twitter</a> .
  </samp>
</p>