const crypto = require('crypto');

module.exports = {
  async generateUniqueId() {
    const HASH_ALGORITHM_MD5 = 'md5';
    const HASH_DIGEST_HEX = 'hex';
    const DEFAULT_DATA = String(Date.now());
    const DEFAULT_SALT = Math.floor(1 + Math.random() * (10000 + 1 - 1));
    const saltedData = DEFAULT_DATA + DEFAULT_SALT;

    return crypto.createHash(HASH_ALGORITHM_MD5)
      .update(saltedData)
      .digest(HASH_DIGEST_HEX)
      .toUpperCase();
  } 
}