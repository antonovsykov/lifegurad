import { ethers } from "ethers";

const rpcUrl = "https://rpc1.dbcwallet.io";
const provider = new ethers.JsonRpcProvider(rpcUrl);

// 查询指定账户的 DBC 余额
export async function getDbcBalance(address: string) {
  const balanceWei = await provider.getBalance(address);
  const balanceDBC = ethers.formatUnits(balanceWei, 18);
  console.log("DBC balance:",balanceWei, balanceDBC, ethers.formatEther(balanceWei), "DBC");
  return balanceDBC;
}