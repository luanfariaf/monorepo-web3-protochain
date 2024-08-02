import * as ecc from 'tiny-secp256k1'
import ECPairFactory from "ecpair"
import sha256 from 'crypto-js/sha256'
import Validation from './validation'

const ECPair = ECPairFactory(ecc)

/**
 * TransactionInput class
 */
export default class TransactionInput {
  fromAddress: string
  amount: number
  signature: string

  /**
   * Creates a new TransactionInput
   * @param txInput 
   */
  constructor(txInput?: TransactionInput) {
    this.fromAddress = txInput?.fromAddress || ""
    this.amount = txInput?.amount || 0
    this.signature = txInput?.signature || ""
  }

  /**
   * Generate a tx input signature
   * @param privateKey 'from' private key
   */
  sign(privateKey: string): void {
    this.signature = ECPair.fromPrivateKey(Buffer.from(privateKey, "hex"))
      .sign(Buffer.from(this.getHash(), "hex"))
      .toString("hex")
  }

  /**
   * Generates a tx input hash
   * @returns 
   */
  getHash(): string {
    return sha256(this.fromAddress + this.amount).toString()
  }


  /**
  * Verify if TransactionInput is valid
  * @returns a result validation object
  */
  isValid(): Validation {
    if (!this.signature) return new Validation(false, "Signature is invalid.")
    if (this.amount < 1) return new Validation(false, "Amount must be greater than 0.")

    const hash = Buffer.from(this.getHash(), "hex")

    const isValid = ECPair.fromPublicKey(Buffer.from(this.fromAddress, "hex"))
      .verify(hash, Buffer.from(this.signature, "hex"))

    return isValid ? new Validation() : new Validation(false, "Invalid tx input signature.")
  }
}