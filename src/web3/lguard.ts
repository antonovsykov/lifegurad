import { ethers } from "ethers";
import ABI from "./abi.json";

const rpcUrl = "https://rpc1.dbcwallet.io"; 

const LGUARD_TOKEN_CONTRACT_ADDRESS = '0x0BB579513DeAB87a247FB0CA8Eff32AeAcA2Bd40';

// 创建 provider
const provider = new ethers.JsonRpcProvider(rpcUrl);

// 创建 DGC 合约实例
export const lguardContract = new ethers.Contract(LGUARD_TOKEN_CONTRACT_ADDRESS, ABI?.abi, provider);

// 查询 LGUARD 余额
export async function getLaugrdBalance(address: string) {

  const balanceWei = await lguardContract.balanceOf(address);

  const balanceDGC = ethers.formatUnits(balanceWei, 18);

  console.log("DGC balance:",balanceWei, balanceDGC, ethers.formatEther(balanceWei), "DGC");

  return balanceDGC;
}