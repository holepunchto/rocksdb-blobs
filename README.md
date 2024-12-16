# rocksdb-blobs

Just a blob store on rocks. Aims to be API compatible with [Hyperblobs](https://github.com/holepunchto/hyperblobs)

```
npm install rocksdb-blobs
```

## Usage

``` js
const RocksBlobs = require('rocksdb-blobs')

const blobs = new RocksBlobs('/tmp/my-blobs')

const id = await blobs.put(Buffer.from('hello world'))
const blobs = await blobs.get(id)
```

## License

Apache-2.0
