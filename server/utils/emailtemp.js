export const insEmailTmp = (address, amount, insurance_name, start_date, end_date, date, lang) => {
  const html_json = {
    "en": `<html><head><meta charset="UTF-8"></head><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style = "max-width: 750px; margin: 0 auto; padding: 20px;" >
          <h3>Dear ${address}</h3>
          <p>Thank you for choosing our insurance service! We have successfully received your payment and completed the insurance purchase process. To ensure you fully understand the details of your insurance, please review the content of this email and the insurance policy document attached.</p>
          <p>Insurance Purchase Details:</p>
          <p>Purchase Amount: ${amount}</p>
          <p>Insurance Name: ${insurance_name}</p>
          <p>Coverage Period: ${start_date} to ${end_date}</p>
          <p>Shares:</p>
          <p>For specific terms, conditions, and exclusions, please refer to the attached document.</p>
          <p>To protect your rights and interests, please make sure to submit the required materials and file a claim within the coverage period. Claims submitted after the expiration date may not be accepted.</p>
          <p>If you have any questions or need assistance, please feel free to contact us.</p>
          <p>Thank you for your trust and support! Wishing you a pleasant day!</p>
          <p>Best regards,</p>
          <p>Victor Vivo</p>
          <p>LifeGuard Team</p>
          <p>LifeGuardin2030@gmail.com</p>
          <p>${date}</p>
        </div>
      </html>`,
    "zh": `<html><head><meta charset="UTF-8"></head><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style = "max-width: 750px; margin: 0 auto; padding: 20px;" >
          <h3>Dear ${address}</h3>
          <p>Thank you for choosing our insurance service! We have successfully received your payment and completed the insurance purchase process. To ensure you fully understand the details of your insurance, please review the content of this email and the insurance policy document attached.</p>
          <p>Insurance Purchase Details:</p>
          <p>Purchase Amount: ${amount}</p>
          <p>Insurance Name: ${insurance_name}</p>
          <p>Coverage Period: ${start_date} to ${end_date}</p>
          <p>Shares:</p>
          <p>For specific terms, conditions, and exclusions, please refer to the attached document.</p>
          <p>To protect your rights and interests, please make sure to submit the required materials and file a claim within the coverage period. Claims submitted after the expiration date may not be accepted.</p>
          <p>If you have any questions or need assistance, please feel free to contact us.</p>
          <p>Thank you for your trust and support! Wishing you a pleasant day!</p>
          <p>Best regards,</p>
          <p>Victor Vivo</p>
          <p>LifeGuard Team</p>
          <p>LifeGuardin2030@gmail.com</p>
          <p>${date}</p>
        </div>
      </html>`
  }
  return html_json[lang];
}
