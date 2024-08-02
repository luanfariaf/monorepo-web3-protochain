import * as ecc from 'tiny-secp256k1'
import ECPairFactory, { ECPairInterface } from 'ecpair'

const ECPair = ECPairFactory(ecc)

/**
 * Wallet class
 */
export default class Wallet {
  privateKey: string
  publicKey: string

  constructor(wifOrPRivateKey?: string) {
    let keys

    if (wifOrPRivateKey) {
      if (wifOrPRivateKey.length === 64)
        keys = ECPair.fromPrivateKey(Buffer.from(wifOrPRivateKey, 'hex'))
      else
        keys = ECPair.fromWIF(wifOrPRivateKey)
    } else {
      keys = ECPair.makeRandom()
    }

    /* c8 ignore next */
    this.privateKey = keys.privateKey?.toString('hex') || ""
    this.publicKey = keys.publicKey.toString('hex')
  }
}