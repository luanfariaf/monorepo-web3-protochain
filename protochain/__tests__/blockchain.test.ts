import { describe, test, expect } from "@jest/globals"
import Blockchain from '../src/lib/blockchain'
import Block from "../src/lib/block"

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
    blockchain.addBlock(new Block(1, blockchain.blocks[0].hash, "Block 2"))
    expect(blockchain.isValid().success).toEqual(true)
  })

  test('should NOT be valid', () => {
    const blockchain = new Blockchain()
    blockchain.addBlock(new Block(1, blockchain.blocks[0].hash, "Block 2"))
    blockchain.blocks[1].data = "account XYZ transfer 100BTC to account ZXY"
    expect(blockchain.isValid().success).toEqual(false)
  })

  test('should add block', () => {
    const blockchain = new Blockchain()
    const result = blockchain.addBlock(new Block(1, blockchain.blocks[0].hash, "Block 2"))
    expect(result.success).toEqual(true)
  })

  test('should not add block', () => {
    const blockchain = new Blockchain()
    const block = new Block(-1, blockchain.blocks[0].hash, "Block 2")
    const result = blockchain.addBlock(block)
    expect(result.success).toEqual(false)
  })
})