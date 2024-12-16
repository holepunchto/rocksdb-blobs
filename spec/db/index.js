// This file is autogenerated by the hyperdb compiler
/* eslint-disable camelcase */

const { IndexEncoder, c } = require('hyperdb/runtime')

const { version, resolveStruct } = require('./messages.js')

// '@blobs/digest' collection key
const collection0_key = new IndexEncoder([
], { prefix: 0 })

function collection0_indexify (record) {
  return []
}

// '@blobs/digest' reconstruction function
function collection0_reconstruct (version, keyBuf, valueBuf) {
  const value = c.decode(resolveStruct('@blobs/digest/value', version), valueBuf)
  return value
}
// '@blobs/digest' key reconstruction function
function collection0_reconstruct_key (keyBuf) {
  return {}
}

// '@blobs/digest'
const collection0 = {
  name: '@blobs/digest',
  id: 0,
  encodeKey (record) {
    const key = []
    return collection0_key.encode(key)
  },
  encodeKeyRange ({ gt, lt, gte, lte } = {}) {
    return collection0_key.encodeRange({
      gt: gt ? collection0_indexify(gt) : null,
      lt: lt ? collection0_indexify(lt) : null,
      gte: gte ? collection0_indexify(gte) : null,
      lte: lte ? collection0_indexify(lte) : null
    })
  },
  encodeValue (version, record) {
    return c.encode(resolveStruct('@blobs/digest/value', version), record)
  },
  trigger: null,
  reconstruct: collection0_reconstruct,
  reconstructKey: collection0_reconstruct_key,
  indexes: []
}

// '@blobs/blocks' collection key
const collection1_key = new IndexEncoder([
  IndexEncoder.UINT
], { prefix: 1 })

function collection1_indexify (record) {
  const a = record.index
  return a === undefined ? [] : [a]
}

// '@blobs/blocks' reconstruction function
function collection1_reconstruct (version, keyBuf, valueBuf) {
  const key = collection1_key.decode(keyBuf)
  const value = c.decode(resolveStruct('@blobs/blocks/value', version), valueBuf)
  // TODO: This should be fully code generated
  return {
    index: key[0],
    ...value
  }
}
// '@blobs/blocks' key reconstruction function
function collection1_reconstruct_key (keyBuf) {
  const key = collection1_key.decode(keyBuf)
  return {
    index: key[0]
  }
}

// '@blobs/blocks'
const collection1 = {
  name: '@blobs/blocks',
  id: 1,
  encodeKey (record) {
    const key = [record.index]
    return collection1_key.encode(key)
  },
  encodeKeyRange ({ gt, lt, gte, lte } = {}) {
    return collection1_key.encodeRange({
      gt: gt ? collection1_indexify(gt) : null,
      lt: lt ? collection1_indexify(lt) : null,
      gte: gte ? collection1_indexify(gte) : null,
      lte: lte ? collection1_indexify(lte) : null
    })
  },
  encodeValue (version, record) {
    return c.encode(resolveStruct('@blobs/blocks/value', version), record)
  },
  trigger: null,
  reconstruct: collection1_reconstruct,
  reconstructKey: collection1_reconstruct_key,
  indexes: []
}

module.exports = {
  version,
  collections: [
    collection0,
    collection1
  ],
  indexes: [
  ],
  resolveCollection,
  resolveIndex
}

function resolveCollection (name) {
  switch (name) {
    case '@blobs/digest': return collection0
    case '@blobs/blocks': return collection1
    default: return null
  }
}

function resolveIndex (name) {
  switch (name) {
    default: return null
  }
}