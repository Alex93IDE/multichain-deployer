# Despliega contratos inteligentes en cualquier blockchain compatible con EVM y solidity

## Install the dependencies
```bash
yarn
# or
npm install
```

## Create .env

```bash
MNEMONICS=
WALLET_ADDRESS=
ADDRESS_INDEX=0
```

## Running the app

```bash
# deployer contracts
$ truffle deploy --network (name blockchain network)

# check contracts
$ truffle run verify (name of contracts) --network (name blockchain network)

```