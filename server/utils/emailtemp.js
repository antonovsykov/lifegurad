export const insEmailTmp = (id, address, amount, insurance_name, start_date, end_date, share, date, lang) => {
  const html_json = {
    "en": `<html><head><meta charset="UTF-8"></head><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="background-image: url(https://www.deeplink.cloud/public-sale/email_bg.jpg); background-size: cover; padding: 10px; box-sizing: border-box;">
          <div style="display: flex; flex-direction: column; max-width: 750px; margin: 0 auto; padding: 20px;" >
            <h3>Dear ${address}</h3>
            <span>Thank you for choosing our insurance service! We have successfully received your payment and completed the insurance purchase process. To ensure you fully understand the details of your insurance, please review the content of this email and the insurance policy document attached.</span>
            <span style="margin-top: 10px;">Insurance Purchase Details:</span>
            <span>Purchase Amount: ${amount}</span>
            <span>Insurance Name: ${insurance_name}</span>
            <span>Coverage Period: ${start_date} to ${end_date}</span>
            <span>Shares: ${share}</span>
            <span style="margin-top: 10px;">For specific terms, conditions, and exclusions, please refer to <a href="https://www.lifeguard.chat/details?id=${id}" target="_blank">the attached document</a>.</span>
            <span>To protect your rights and interests, please make sure to submit the required materials and file a claim within the coverage period. Claims submitted after the expiration date may not be accepted.</span>
            <span>If you have any questions or need assistance, please feel free to contact us.</span>
            <span>Thank you for your trust and support! Wishing you a pleasant day!</span>
            <span style="margin-top: 10px;">Best regards,</span>
            <span>Victor Vivo</span>
            <span>LifeGuard Team</span>
            <span>lifeguardin2030@gmail.com</span>
            <span>${date}</span>
          </div>
        </div>
      </html>`,
    "zh": `<html><head><meta charset="UTF-8"></head><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="background-image: url(https://www.deeplink.cloud/public-sale/email_bg.jpg); background-size: cover; padding: 10px; box-sizing: border-box;">
          <div style="display: flex; flex-direction: column; max-width: 750px; margin: 0 auto; padding: 20px;">
            <h3>尊敬的 ${address}</h3>
            <span>感谢您选择我们的保险服务！我们已成功收到您的付款并完成保险购买流程。为确保您充分了解保险详情，请仔细查阅本邮件内容及附件中的保险单文件。</span>
            <span style="margin-top: 10px;">保险购买详情：</span>
            <span>购买金额：${amount}</span>
            <span>保险名称：${insurance_name}</span>
            <span>保障期限：${start_date} 至 ${end_date}</span>
            <span>份额：${share}</span>
            <span style="margin-top: 10px;">具体条款、条件及免责内容请详见<a href="https://www.lifeguard.chat/details?id=${id}" target="_blank">附件文档</a>。</span>
            <span>为保障您的权益，请务必在保障期内提交所需材料并申请理赔。逾期提交的索赔申请可能无法受理。</span>
            <span>如有任何疑问或需要协助，请随时联系我们。</span>
            <span>感谢您的信任与支持！祝您生活愉快！</span>
            <span style="margin-top: 10px;">此致</span>
            <span>Victor Vivo</span>
            <span>LifeGuard 团队</span>
            <span>lifeguardin2030@gmail.com</span>
            <span>${date}</span>
          </div>
        </div>
      </html>`
  }
  return html_json[lang];
}
