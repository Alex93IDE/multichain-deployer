# Multichain Deployer

Deploy Solidity smart contracts to any EVM-compatible blockchain with a single, unified configuration. Stop duplicating deployment scripts — define your contract once and ship to Polygon, BSC, Avalanche, Fantom, and Cronos with one command.

## Why

Managing deployments across multiple chains means juggling different RPC endpoints, chain IDs, wallet providers, and explorer API keys for each network. This boilerplate centralizes all of that so you can focus on your contracts, not on wiring up infrastructure.

## Supported Networks

| Network   | Mainnet Chain ID | Testnet Chain ID |
|-----------|-----------------|-----------------|
| Polygon   | 137             | 80001 (Mumbai)  |
| BSC       | 56              | 97              |
| Avalanche | 43114           | 43113 (Fuji)    |
| Fantom    | 250             | 4002            |
| Cronos    | 25              | 338             |

## Requirements

- Node.js >= 14
- [Truffle](https://trufflesuite.com/) installed globally
- A funded wallet (mnemonic phrase)
- Block explorer API keys for contract verification (optional)

```bash
npm install -g truffle
```

## Installation

```bash
git clone https://github.com/Alex93IDE/multichain-deployer.git
cd multichain-deployer
npm install
```

## Configuration

Create a `.env` file at the root of the project:

```env
MNEMONICS=word1 word2 word3 ... word12
WALLET_ADDRESS=0xYourWalletAddress
ADDRESS_INDEX=0
```

| Variable        | Description                                                  |
|----------------|--------------------------------------------------------------|
| `MNEMONICS`     | BIP39 12 or 24-word mnemonic phrase of your deployment wallet |
| `WALLET_ADDRESS`| Public address derived from the mnemonic                     |
| `ADDRESS_INDEX` | Account index to use from the HD wallet (default: `0`)       |

> **Never commit your `.env` file.** It is already listed in `.gitignore`.

### Block Explorer API Keys (optional)

To verify contracts on block explorers after deployment, add your API keys in `chains/apikeys.js`:

```js
module.exports = {
  bscscan: 'YOUR_BSCSCAN_KEY',
  polygonscan: 'YOUR_POLYGONSCAN_KEY',
  snowtrace: 'YOUR_SNOWTRACE_KEY',
  ftmscan: 'YOUR_FTMSCAN_KEY',
  cronoscan: 'YOUR_CRONOSCAN_KEY',
}
```

## Project Structure

```
multichain-deployer/
├── chains/
│   ├── apikeys.js          # Block explorer API keys for verification
│   ├── get.js              # Aggregates all network configurations
│   ├── networkconfig.js    # Shared network config factory (gas, confirmations, provider)
│   └── networks/
│       ├── avalanche.js
│       ├── bsc.js
│       ├── cronos.js
│       ├── fantom.js
│       └── polygon.js
├── contracts/              # Your Solidity contracts go here (gitignored)
├── migrations/             # Truffle migration scripts (gitignored)
├── abis/                   # Compiled ABIs output directory
├── truffle-config.js       # Truffle entry point
└── .env                    # Your secrets (gitignored)
```

## Usage

### 1. Add your contracts

Place your `.sol` files inside `contracts/` and create the corresponding migration scripts in `migrations/`. Example:

```js
// migrations/1_deploy_token.js
const MyToken = artifacts.require("MyToken");

module.exports = function (deployer) {
  deployer.deploy(MyToken);
};
```

### 2. Deploy to a testnet first

Always validate on a testnet before mainnet:

```bash
truffle deploy --network polygon_testnet
truffle deploy --network bsc_testnet
truffle deploy --network avalanche_testnet
truffle deploy --network fantom_testnet
truffle deploy --network cronos_testnet
```

### 3. Deploy to mainnet

```bash
truffle deploy --network polygon
truffle deploy --network bsc
truffle deploy --network avalanche
truffle deploy --network fantom
truffle deploy --network cronos
```

### 4. Verify contracts on block explorers

```bash
truffle run verify MyToken --network polygon
truffle run verify MyToken --network bsc
```

Compiled ABIs are automatically saved to the `abis/` directory for use in your frontend or backend.

## Compiler Settings

The Solidity compiler is configured in `truffle-config.js`:

| Setting         | Value   |
|----------------|---------|
| Solidity version | `0.8.9` |
| Optimizer       | Enabled |
| Optimizer runs  | `200`   |

The 200-run optimizer setting is a standard trade-off — it optimizes for contracts that will be called frequently rather than one-time deployments.

## Deployment Parameters

These defaults apply to all networks and can be changed in `chains/networkconfig.js`:

| Parameter            | Value      | Description                                   |
|---------------------|------------|-----------------------------------------------|
| `gas`               | 5,000,000  | Gas limit per deployment transaction           |
| `confirmations`     | 4          | Blocks to wait before considering tx confirmed |
| `timeoutBlocks`     | 10,000     | Max blocks to wait before timing out           |
| `networkCheckTimeout` | 30,000 ms | Timeout for initial network connectivity check |

## Adding a New Chain

Adding support for a new EVM network takes three steps:

1. Create `chains/networks/mychain.js`:

```js
const Config = require('../networkconfig')

const rpc = {
  mainnet: { url: 'https://rpc.mychain.io', chainId: 9999 },
  testnet: { url: 'https://testnet-rpc.mychain.io', chainId: 9998 }
}

module.exports = {
  mainnet: Config(rpc.mainnet.chainId, rpc.mainnet.url),
  testnet: Config(rpc.testnet.chainId, rpc.testnet.url)
}
```

2. Register it in `chains/get.js`:

```js
const mychain = require('./networks/mychain')

module.exports = {
  // ...existing networks
  mychain: mychain.mainnet,
  mychain_testnet: mychain.testnet,
}
```

3. Deploy:

```bash
truffle deploy --network mychain_testnet
```

## Dependencies

| Package                    | Purpose                                              |
|---------------------------|------------------------------------------------------|
| `@truffle/hdwallet-provider` | Signs transactions with a BIP39 mnemonic wallet  |
| `@openzeppelin/contracts`    | Audited, reusable Solidity contract libraries     |
| `dotenv`                     | Loads `.env` variables into `process.env`         |
| `truffle-plugin-verify`      | Verifies contracts on block explorers             |

## Security Considerations

- Store your mnemonic phrase only in `.env`, which is gitignored
- Use a dedicated deployment wallet — do not reuse your personal or hot wallet
- Test every deployment on the corresponding testnet before going to mainnet
- Verify that your contract source matches the deployed bytecode using the verify plugin

## License

ISC — free to use, modify, and distribute.
