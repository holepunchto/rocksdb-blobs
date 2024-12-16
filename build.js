const Hyperschema = require('hyperschema')
const HyperDB = require('hyperdb/builder')

const schema = Hyperschema.from('./spec/schema')

const ns = schema.namespace('blobs')

ns.register({
  name: 'digest',
  fields: [{
    name: 'blocks',
    type: 'uint',
    required: true
  }, {
    name: 'bytes',
    type: 'uint',
    required: true
  }, {
    name: 'blockSize',
    type: 'uint',
    required: true
  }]
})

ns.register({
  name: 'block',
  compact: true,
  fields: [{
    name: 'index',
    type: 'uint',
    required: true
  }, {
    name: 'value',
    type: 'raw',
    required: true
  }]
})

Hyperschema.toDisk(schema)

const db = HyperDB.from('./spec/schema', './spec/db')
const blobs = db.namespace('blobs')

blobs.collections.register({
  name: 'digest',
  schema: '@blobs/digest',
  key: []
})

blobs.collections.register({
  name: 'blocks',
  schema: '@blobs/block',
  key: ['index']
})

HyperDB.toDisk(db)
