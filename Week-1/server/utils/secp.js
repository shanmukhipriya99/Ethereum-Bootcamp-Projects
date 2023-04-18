const secp = require('ethereum-cryptography/secp256k1');
const { hexToBytes, toHex } = require('ethereum-cryptography/utils');

exports.getSignature = (sign) => {
  let signature = {};
  const signatureBytes = hexToBytes(sign.slice(2));
  signature.r = BigInt(`0x${toHex(signatureBytes.slice(0, 32))}`);
  signature.s = BigInt(`0x${toHex(signatureBytes.slice(32, 64))}`);
  signature.recovery = signatureBytes[64] - 27;
  return signature;
};

exports.getPublicKey = (signature, hashedMsg) => {
  const publicKeyPoint = new secp.secp256k1.Signature(
    signature.r,
    signature.s,
    signature.recovery
  ).recoverPublicKey(hashedMsg);
  const publicKey = new secp.secp256k1.ProjectivePoint(
    publicKeyPoint.px,
    publicKeyPoint.py,
    publicKeyPoint.pz
  ).toRawBytes(true);
  return publicKey;
};

exports.isValidSignature = (signature, hashedMsg, publicKey) => {
  return secp.secp256k1.verify(signature, hashedMsg, publicKey);
};
