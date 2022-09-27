const polygon = require('./networks/polygon')
const bsc = require('./networks/bsc')
const fantom = require('./networks/fantom')
const avalanche = require('./networks/avalanche')
const cronos = require('./networks/cronos')

module.exports = {
    polygon: polygon.mainnet,
    polygon_testnet: polygon.testnet,
    bsc: bsc.mainnet,
    bsc_testnet: bsc.testnet,
    avalanche: avalanche.mainnet,
    avalanche_testnet: avalanche.testnet,
    fantom: fantom.mainnet,
    fantom_testnet: fantom.testnet,
    cronos: cronos.mainnet,
    cronos_testnet: cronos.testnet,
}