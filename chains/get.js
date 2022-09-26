const polygon = require('./networks/polygon')
const bsc = require('./networks/bsc')

module.exports = {
    polygon: polygon.mainnet,
    polygon_testnet: polygon.testnet,
    bsc: bsc.mainnet,
    bsc_testnet: bsc.testnet
}