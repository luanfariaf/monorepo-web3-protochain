import { describe, test, expect, jest } from "@jest/globals"
import Blockchain from '../src/lib/blockchain'
import Block from "../src/lib/block"

jest.mock('../src/lib/block')

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
      data: "Block 2"
    } as Block))
    expect(blockchain.isValid().success).toEqual(true)
  })

  test('should NOT be valid', () => {
    const blockchain = new Blockchain()
    blockchain.addBlock(new Block({
      index: 1, 
      previousHash: blockchain.blocks[0].hash, 
      data: "Block 2"
    } as Block))
    blockchain.blocks[1].index = -1
    expect(blockchain.isValid().success).toEqual(false)
  })

  test('should add block', () => {
    const blockchain = new Blockchain()
    const result = blockchain.addBlock(new Block({
      index: 1, 
      previousHash: blockchain.blocks[0].hash, 
      data: "Block 2"
    } as Block))
    expect(result.success).toEqual(true)
  })

  test('should not add block', () => {
    const blockchain = new Blockchain()
    const block = new Block({
      index: -1, 
      previousHash: blockchain.blocks[0].hash, 
      data: "Block 2"
    } as Block)
    const result = blockchain.addBlock(block)
    expect(result.success).toEqual(false)
  })

  test('should get block', () => {
    const blockchain = new Blockchain()
    const block = blockchain.getBlock(blockchain.blocks[0].hash)
    expect(block).toBeTruthy()
  })

})