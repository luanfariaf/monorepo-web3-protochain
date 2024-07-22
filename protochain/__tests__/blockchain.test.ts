import { describe, test, expect, jest } from "@jest/globals"
import Blockchain from '../src/lib/blockchain'
import Block from "../src/lib/block"
import Transaction from "../src/lib/transaction"

jest.mock('../src/lib/block')
jest.mock('../src/lib/transaction')

describe("Blockchain tests", () => {

  test('should has genesis blocks', () => {
    const blockchain = new Blockchain()

    expect(blockchain.blocks.length).toEqual(1)
  })

  test('should be valid (genesis)', () => {
    const blockchain = new Blockchain()

    expect(blockchain.isValid().success).toEqual(true)
  })

  test('should be valid (two blocks)', () => {
    const blockchain = new Blockchain()
    blockchain.addBlock(new Block({
      index: 1, 
      previousHash: blockchain.blocks[0].hash, 
      transactions: [new Transaction({ data: "Block 2"} as Transaction)]
    } as Block))
    expect(blockchain.isValid().success).toEqual(true)
  })

  test('should NOT be valid', () => {
    const blockchain = new Blockchain()

    const tx = new Transaction({
      data: 'tx1'
    } as Transaction) 

    blockchain.mempool.push(tx)

    blockchain.addBlock(new Block({
      index: 1, 
      previousHash: blockchain.blocks[0].hash, 
      transactions: [new Transaction({ data: "Block 2"} as Transaction)]
    } as Block))
    blockchain.blocks[1].index = -1
    expect(blockchain.isValid().success).toEqual(false)
  })

  test('should add transaction', () => {
    const blockchain = new Blockchain()

    const tx = new Transaction({
      data: 'tx1',
      hash: 'xyz'
    } as Transaction) 

    const validation = blockchain.addTransaction(tx)
    
    expect(validation.success).toEqual(true)
  })

  test('should NOT add transaction (invalid tx)', () => {
    const blockchain = new Blockchain()

    const tx = new Transaction({
      data: '',
      hash: 'xyz'
    } as Transaction) 

    const validation = blockchain.addTransaction(tx)
    
    expect(validation.success).toEqual(false)
  })

  test('should NOT add transaction (duplicated in blockchain)', () => {
    const blockchain = new Blockchain()

    const tx = new Transaction({
      data: 'tx1',
      hash: 'xyz'
    } as Transaction) 

    blockchain.blocks.push(new Block({
      transactions: [tx]
    } as Block))

    const validation = blockchain.addTransaction(tx)
    
    expect(validation.success).toEqual(false)
  })

  test('should NOT add transaction (duplicated in mempool)', () => {
    const blockchain = new Blockchain()

    const tx = new Transaction({
      data: 'tx1',
      hash: 'xyz'
    } as Transaction) 

    blockchain.mempool.push(tx)
    const validation = blockchain.addTransaction(tx)
    
    expect(validation.success).toEqual(false)
  })

  test('should get transaction (mempool)', () => {
    const blockchain = new Blockchain()

    const tx = new Transaction({
      data: 'tx1',
      hash: 'randomHash123213123'
    } as Transaction) 

    blockchain.mempool.push(tx)
    const result = blockchain.getTransaction('randomHash123213123')
    
    expect(result.mempoolIndex).toEqual(0)
  })

  test('should get transaction (blockchain)', () => {
    const blockchain = new Blockchain()

    const tx = new Transaction({
      data: 'tx1',
      hash: 'randomHash4123123'
    } as Transaction) 

    blockchain.blocks.push(new Block({
      transactions: [tx]
    } as Block))

    const result = blockchain.getTransaction('randomHash4123123')
    
    expect(result.blockIndex).toEqual(1)
  })

  test('should NOT get transaction', () => {
    const blockchain = new Blockchain()
    const result = blockchain.getTransaction('randomHash4123123')
    
    expect(result.blockIndex).toEqual(-1)
    expect(result.mempoolIndex).toEqual(-1)
  })

  test('should add block', () => {
    const blockchain = new Blockchain()

    const tx = new Transaction({
      data: 'tx1'
    } as Transaction) 

    blockchain.mempool.push(tx)

    const result = blockchain.addBlock(new Block({
      index: 1, 
      previousHash: blockchain.blocks[0].hash, 
      transactions: [new Transaction({ data: "Block 2"} as Transaction)]
    } as Block))
    expect(result.success).toEqual(true)
  })

  test('should not add block', () => {
    const blockchain = new Blockchain()
    const block = new Block({
      index: -1, 
      previousHash: blockchain.blocks[0].hash, 
      transactions: [new Transaction({ data: "Block 2"} as Transaction)]
    } as Block)
    const result = blockchain.addBlock(block)
    expect(result.success).toEqual(false)
  })

  test('should get block', () => {
    const blockchain = new Blockchain()
    const block = blockchain.getBlock(blockchain.blocks[0].hash)
    expect(block).toBeTruthy()
  })

  test('should get next blockInfo', () => {
    const blockchain = new Blockchain()
    blockchain.mempool.push(new Transaction())

    const info = blockchain.getNextBlock()
    expect(info ? info.index : 0).toEqual(1)
  })

  test('should NOT get next blockInfo', () => {
    const blockchain = new Blockchain()
    const info = blockchain.getNextBlock()
    expect(info).toBeNull()
  })

})