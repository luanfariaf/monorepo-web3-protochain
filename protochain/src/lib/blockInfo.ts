/**
 * Blockchain Interface
 */
export default interface BlockInfo {
  index: number
  previousHash: string
  difficulty: number
  maxDifficulty: number
  feePeerTx: number
  data: string
}