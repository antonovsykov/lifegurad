import { readContract, writeContract, waitForTransactionReceipt } from '@wagmi/core'
import { formatUnits, parseEther } from 'viem'
import { config } from "../web3/index"
import ABI from "./abi.json";

export const LGUARD_TOKEN_CONTRACT_ADDRESS = '0x0BB579513DeAB87a247FB0CA8Eff32AeAcA2Bd40';

export const RECIPIENT = '0xde8784011e1C864E37697faE28a6E19ae4E6DD9d';
// export const RECIPIENT = '0x8b0b8c7f984dd3f2b580149ade3cdab504d3af1f';



// 查询 LGUARD 余额
export async function getLaugrdBalance(address: string) {

  const balanceWei = await readContract(config, {
    address: LGUARD_TOKEN_CONTRACT_ADDRESS,
    abi: ABI.abi,
    functionName: 'balanceOf',
    args: [address]
  }) as bigint;

  // 格式化单位
  const balanceLGUARD = formatUnits(balanceWei, 18)

  return balanceLGUARD
}

// 触发代币转账
export async function handleTransfer(address: string, amount: number) {
  try {
    const amountStr = String(amount); 
    const result = await writeContract(config, {
      address: LGUARD_TOKEN_CONTRACT_ADDRESS,
      abi: ABI.abi,
      functionName: 'transfer',
      args: [
        address, // 接收地址
        parseEther(amountStr), // 转账金额（1 DAI → 转成 wei 单位）
      ],
    })
    return result
  } catch (err) {
    return null;
  }
}

// 校验交易是否成功
export async function checkTransfer(hash: string) {
  try {
    const transactionHash = hash as `0x${string}`;
    // 等待交易被确认并获取收据
    const receipt = await waitForTransactionReceipt(config, {
      hash: transactionHash,
      timeout: 600000
    });
    // 验证交易是否成功
    if (receipt.status === "success") {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}