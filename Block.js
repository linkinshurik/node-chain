const SHA256 = require('crypto-js/sha256');

class Block {
    constructor (timestamp, lasthash, hash, data) {
        this.timestamp = timestamp;
        this.lastHash = lasthash;
        this.hash = hash;
        this.data = data;
    }

    toString() {
        return `Block -
            Timestamp: ${this.timestamp}
            LastHash : ${this.lasthash.substring(0, 10)}
            Hash     : ${this.hash.substring(0, 10)}
            Data     : ${this.data}
        `
    }

    static genesis() {
        return new this('Genesis time', '--------', 'hvywi5jcnx', ['some', 'valuable', 'data'])
    }

    static mineBlock(lastBlock, data) {
        const timestamp = new Date();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp, lastHash, data);

        return new this(timestamp, lastHash, hash, data);

    }

    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString() ;
    }
}

module.exports = Block;