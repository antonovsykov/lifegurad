import { createPublicClient, http, parseEther } from 'viem';

// 配置 RPC 节点
const dbcChain = {
  id: 19880818, // DBC链的chainId
  name: 'LifeGurad',
  nativeCurrency: {
    name: 'DBC',
    symbol: 'DBC',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['https://rpc1.dbcwallet.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'DBCScan',
      url: 'https://www.dbcscan.io',
    },
  },
}
const dbcPublicClient = createPublicClient({
  chain: dbcChain,
  transport: http(
    dbcChain.rpcUrls.default.http[0],
  )
});

// export const checkAddress = "0xde8784011e1C864E37697faE28a6E19ae4E6DD9d";
export const checkAddress = "0x8b0b8c7f984dd3f2b580149ade3cdab504d3af1f";

export async function verifyWeb3Payment(txHash, fromAddress, toAddress, payAmount) {
  try {
    // 规则：以 0x 开头，共 66 位字符（64 位十六进制 + 0x）
    const txHashRegex = /^0x[a-fA-F0-9]{64}$/;
    if (!txHashRegex.test(txHash)) {
      return false;
    }

    // 调用 RPC 节点查询交易，若交易不存在会抛出错误
    let txReceipt;
    try {
      txReceipt = await dbcPublicClient.getTransactionReceipt({ hash: txHash });
    } catch (err) {
      console.log("==================err================", err);
      return false;
    }

    // Ethereum 中，status: 1 表示交易成功，0 表示失败（Out of Gas 或合约执行错误）
    if (txReceipt.status !== 'success') {
      return false;
    }

    // 校验转账地址和转账金额
    if (txReceipt && txReceipt.logs) {
      const log = txReceipt.logs[0];
      // topics[2]是转账接收地址
      const checkFromAddress = '0x' + log.topics[1].slice(26);
      // topics[2]是转账接收地址
      const checkToAddress = '0x' + log.topics[2].slice(26);
      if ((checkFromAddress.toLowerCase() != fromAddress.toLowerCase()) 
        || (checkToAddress.toLowerCase() != toAddress.toLowerCase())) {
        return false;
      }

      // data字段是转账金额(十六进制)
      const amountHex = log.data;
      // 转换为十进制数字
      const amount = BigInt(amountHex);
      const payEther = parseEther(String(payAmount));
      if (amount != payEther) {
        return false;
      }
    }

    return true;
  } catch (err) {
    console.log("=================", err);
    return false;
  }

}

