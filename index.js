const { Connection, Keypair, PublicKey, sendAndConfirmTransaction, Transaction, TransactionInstruction } = require("@solana/web3.js");
const bs58 = require("bs58");


var secret = "59wnKHovYATqykhnkjRb9uTKEjaaQYU6WRvQZ5C5WuHN7Ho2YajRXEzxckUzQpZNGgu4hiKAnv4HpjvxKiVGu9jV"
const keypair = Keypair.fromSecretKey(
  bs58.decode(secret)
);

const QUICKNODE_RPC = 'https://api.mainnet-beta.solana.com';
const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);


async function logMemo(message) {
  let tx = new Transaction();
  await tx.add(
    new TransactionInstruction({
      keys: [{ pubkey: keypair.publicKey, isSigner: true, isWritable: true }],
      data: Buffer.from(message, "utf-8"),
      programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
    })
  )
  let result = await sendAndConfirmTransaction(SOLANA_CONNECTION, tx, [keypair]);
  console.log("complete: ", `https://solscan.io/tx/${result}`);
  return result;
}

var data = `{"p":"src-20","op":"mint","tick":"lamp","amt":"1000"}`
var mintCount = 5
for (i = 0; i < mintCount; i++) {
  logMemo(data)
}

