const express = require('express');
const Blockchain = require("./src/blockchain");
const Block = require("./src/block");

const app = express();
const PORT = process.env.PORT || 3000;

let blockchainData = '';

async function runBlockchain() {
  const blockchain = new Blockchain();
  
  const block1 = new Block({ data: 'Block #1' });
  await blockchain.addBlock(block1);
  
  const block2 = new Block({ data: 'Block #2' });
  await blockchain.addBlock(block2);
  
  const block3 = new Block({ data: 'Block #3' });
  await blockchain.addBlock(block3);
  
  blockchainData = blockchain.chain.map(block => ({
    hash: block.hash,
    height: block.height,
    body: block.body.toString(),
    time: block.time,
    previousBlockHash: block.previousBlockHash
  }));
}

app.get('/', (req, res) => {
  res.json({
    message: 'Blockchain running!',
    blocks: blockchainData
  });
});

runBlockchain().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});