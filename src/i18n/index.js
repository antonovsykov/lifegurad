import { createI18n } from 'vue-i18n'

// 准备语言包
const messages = {
  en: {
    title: 'A blockchain-based tokenized smart insurance platform',
    connect_wallet: 'Connect Wallet',
    disconnect: 'Disconnect',
    walletbalance: 'Wallet Balance',
    home: 'Home',
    claim: 'Claim',
    blog: 'Blog',
    featurecardtitle0: 'Decentralized Instant Claim Network',
    featurecarddesc0: 'Powered by blockchain smart contracts, this network enables 24/7 automatic triggering of claims, completely eliminating manual reviews, intermediary delays, and ensuring instant response for all users worldwide with zero downtime.',
    featurecardtitle1: 'AI Lightning-Fast Invoice Verification',
    featurecarddesc1: 'Utilizing large-scale AI models for millisecond-level identification of invoice authenticity, amounts, and scenarios, with full automatic compliance checking and an ultra-low error rate of less than 0.1%, making verification seamless and reliable.',
    featurecardtitle2: 'Smart Contract Seamless Instant Payout',
    featurecarddesc2: 'Upon approval, on-chain automatic transfers occur with zero forms, zero additional reviews, and zero waiting time, delivering payouts in under 1 second, providing a frictionless experience for all claim processes.',
    featurecardtitle3: 'Full On-Chain Instant Settlement',
    featurecarddesc3: 'Supporting multi-chain tokens and stablecoins for payouts, enabling global fund arrivals in seconds, with seamless integration across various blockchains for efficient and borderless financial transactions.',
    insurance_products: '10 Insurance Products',
    myaccount: 'My Account',
    mypplicy: 'My Policy',
    claimapplication: 'Claim Application'
  },
  zh: {
    title: '基于区块链的代币化智能保险平台',
    connect_wallet: '连接钱包',
    disconnect: '断开连接',
    walletbalance: '钱包余额',
    home: '首页',
    claim: '去理赔',
    blog: '博客',
    featurecardtitle0: '去中心化秒级理赔网络',
    featurecarddesc0: '基于区块链智能合约驱动的网络，实现7×24小时自动触发理赔，彻底消除人工审核、中介延迟，确保全球用户即时响应，无任何停机时间。',
    featurecardtitle1: 'AI极速发票核验',
    featurecarddesc1: '采用大规模AI模型进行毫秒级发票真伪、金额、场景识别，全自动合规校验，超低误差率<0.1%，确保验证过程无缝可靠。',
    featurecardtitle2: '智能合约无感秒赔',
    featurecarddesc2: '审核通过后链上自动转账，0表单、0复核、0等待，赔付速度<1秒，为所有理赔过程提供无摩擦体验。',
    featurecardtitle3: '全链支付即时结算',
    featurecarddesc3: '支持多链代币和稳定币赔付，实现全球资金秒级到账，与各种区块链无缝集成，提供高效无国界金融交易。',
    insurance_products: '十大保险产品',
    myaccount: '我的账户',
    mypplicy: '我的保单',
    claimapplication: '理赔申请'
  }
}

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false, // 使用 Composition API
  locale: 'en', // 默认语言
  fallbackLocale: 'en', // 回退语言
  globalInjection: true, // 全局注入 $t 方法
  messages
})

export default i18n