import Blobs from './index.js'

const b = new Blobs('/tmp/blobs')

const id = await b.put(Buffer.alloc(4 * 65535))

const buf = await b.get(id)

console.log(id, buf)
