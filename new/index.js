const { secp256k1 } = require ('@noble/curves/secp256k1'); // ESM and Common.js
// const { toHex } = require("ethereum-cryptography/utils");
const { toHex } = require ('ethereum-cryptography/utils');
const {keccak256} = require ("ethereum-cryptography/keccak");
const { utf8ToBytes } = require ('ethereum-cryptography/utils');
// const { hexToBytes } = require('ethereum-cryptography/utils');


function hexSig(signature) {

    let serializedSignature
    
    if (typeof signature.r === 'bigint' && typeof signature.s === 'bigint') {
        // Serialize the signature to hexadecimal
        serializedSignature = signature.r.toString(16).padStart(64, '0') + signature.s.toString(16).padStart(64, '0');
      
        // Now, send the "serializedSignature" to the server side
        // ...
      } else {
        console.error('Invalid signature format. Signature must consist of "r" and "s" integers.');
      }

      return serializedSignature
}
  


async function main() {

    const privKey = "3d244e6095dd08998b7d4a970f71a28cf07a02800b207aad482500a246ef542f"
    // sha256 of 'hello world'
    // const msg = 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9';
    
    const bytes = utf8ToBytes("hello");
    const msg = keccak256(bytes);

    const pubKey = secp256k1.getPublicKey(privKey);
    console.log("Ok")
    console.log(toHex(pubKey))
    console.log("Ok OK")

    const signature = secp256k1.sign(msg, privKey);
    console.log(signature)
    console.log("\n")

    const sig = hexSig(signature)
    console.log(sig)

    

    const recoveredPubKey = signature.recoverPublicKey(msg).toRawBytes();
    console.log(toHex(recoveredPubKey))

}

main()