const RW = require('read-write-mutexify')
const spec = require('./spec/db')
const HyperDB = require('hyperdb')
const b4a = require('b4a')

module.exports = class RocksBlobs {
  constructor (storage) {
    this.db = HyperDB.rocks(storage, spec)
    this.rw = new RW()
  }

  ready () {
    return this.db.ready()
  }

  close () {
    return this.db.close()
  }

  async put (buffer) {
    await this.rw.write.lock()
    const tx = this.db.transaction()

    try {
      const digest = (await tx.get('@blobs/digest')) || { blocks: 0, bytes: 0, blockSize: 65536 }
      const id = { blockOffset: digest.blocks, blockLength: 0, byteOffset: digest.bytes, byteLength: 0 }

      let offset = 0
      while (offset < buffer.byteLength) {
        const value = buffer.subarray(offset, offset += digest.blockSize)

        offset += value.byteLength
        digest.bytes += value.byteLength

        id.blockLength++
        id.byteLength += value.byteLength

        await tx.insert('@blobs/blocks', { index: digest.blocks++, value })
      }

      await tx.insert('@blobs/digest', digest)
      await tx.flush()

      return id
    } catch (err) {
      await tx.close()
      throw err
    } finally {
      await this.rw.write.unlock()
    }
  }

  async get (id) {
    if (id.blockLength === 1) {
      const blk = await this.db.get('@blobs/blocks', { index: id.blockOffset })
      return blk && blk.value
    }

    const all = []

    this.db.cork()
    for (let i = 0; i < id.blockLength; i++) {
      all.push(this.db.get('@blobs/blocks', { index: id.blockOffset + i }))
    }
    this.db.uncork()

    const blocks = await Promise.all(all)
    const bufs = new Array(blocks.length)

    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i] === null) return null
      bufs[i] = blocks[i].value
    }

    return b4a.concat(bufs)
  }
}
