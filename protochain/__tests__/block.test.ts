import { describe, test, expect, beforeAll } from "@jest/globals"
import Block from "../src/lib/block"

describe("Block tests", () => {

  let genesis: Block

  beforeAll(() => {
    genesis = new Block(0, "", "Genesis Block")
  })

  test('should be valid', () => {
    const block = new Block(1, genesis.hash, "block 2")
    const valid = block.isValid(genesis.hash, genesis.index)
    expect(valid.success).toBeTruthy()
  })

  test('should NOT be valid (previous hash)', () => {
    const block = new Block(1, "abc", "block 2")
    const valid = block.isValid(genesis.hash, genesis.index)
    expect(valid.success).toBeFalsy()
  })

  test('should not be valid (timestamp)', () => {
    const block = new Block(1, genesis.hash, "block 2")
    block.timestamp = -1
    block.hash = block.getHash()
    const valid = block.isValid(genesis.hash, genesis.index)
    expect(valid.success).toBeFalsy()
  })

  test('should not be valid (hash)', () => {
    const block = new Block(1, genesis.hash, "block 2")
    block.hash = ""
    const valid = block.isValid(genesis.hash, genesis.index)
    expect(valid.success).toBeFalsy()
  })

  test('should not be valid (data)', () => {
    const block = new Block(1, genesis.hash, "block 2")
    block.data = ""
    block.hash = block.getHash()
    const valid = block.isValid(genesis.hash, genesis.index)
    expect(valid.success).toBeFalsy()
  });

  test('should not be valid (index)', () => {
    const block = new Block(-1, genesis.hash, "block 2")
    const valid = block.isValid(genesis.hash, genesis.index)
    expect(valid.success).toBeFalsy()
  })
})