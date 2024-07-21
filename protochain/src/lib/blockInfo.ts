import Transaction from "./transaction"

/**
 * Blockchain Interface
 */
export default interface BlockInfo {
  index: number
  previousHash: string
  difficulty: number
  maxDifficulty: number
  feePeerTx: number
  transactions: Transaction[]
}