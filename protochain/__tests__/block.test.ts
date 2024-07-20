import { describe, test, expect, beforeAll } from "@jest/globals"
import Block from "../src/lib/block"

describe("Block tests", () => {

  const exampleDifficulty = 0
  const exampleMiner = "lf"
  let genesis: Block

  beforeAll(() => {
    genesis = new Block({
      data: "Genesis Block"
    } as Block)
  })

  test('should be valid', () => {
    const block = new Block({ index: 1, previousHash: genesis.hash, data: "Block 2" } as Block)
    block.mine(exampleDifficulty, exampleMiner)
    const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty)
    expect(valid.success).toBeTruthy()
  })

  test('should NOT be valid (fallbacks)', () => {
    const block = new Block()
    const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty)
    expect(valid.success).toBeFalsy()
  })

  test('should NOT be valid (previous hash)', () => {
    const block = new Block({ index: 1, previousHash: "abc", data: "block 2" } as Block)
    const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty)
    expect(valid.success).toBeFalsy()
  })

  test('should not be valid (timestamp)', () => {
    const block = new Block({ index: 1, previousHash: genesis.hash, data: "block 2" } as Block)
    block.timestamp = -1
    block.hash = block.getHash()
    const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty)
    expect(valid.success).toBeFalsy()
  })

  test('should not be valid (empty hash)', () => {
    const block = new Block({ index: 1, previousHash: genesis.hash, data: "block 2" } as Block)
    block.mine(exampleDifficulty, exampleMiner)
    block.hash = ""
    const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty)
    expect(valid.success).toBeFalsy()
  })

  test('should not be valid (no mined)', () => {
    const block = new Block({ index: 1, previousHash: genesis.hash, data: "block 2" } as Block)
    block.hash = ""
    const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty)
    expect(valid.success).toBeFalsy()
  })

  test('should not be valid (data)', () => {
    const block = new Block({ index: 1, previousHash: genesis.hash, data: "block 2" } as Block)
    block.data = ""
    block.hash = block.getHash()
    const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty)
    expect(valid.success).toBeFalsy()
  });

  test('should not be valid (index)', () => {
    const block = new Block({ index: -1, previousHash: genesis.hash, data: "block 2" } as Block)
    const valid = block.isValid(genesis.hash, genesis.index, exampleDifficulty)
    expect(valid.success).toBeFalsy()
  })
})