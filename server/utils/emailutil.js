import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  // service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.STMP_EMAIL, // 你的邮箱地址
    pass: process.env.STMP_PASSWORD // 你的邮箱授权码，不是登录密码
  }
});

export const sendEmail = async (toemail, html) => {

  // 邮件内容
  const mailOptions = {
    from: '"LifeGurad" <2815206703@qq.com>', // 发件人信息
    to: toemail, // 收件人邮箱，多个邮箱用逗号分隔
    subject: "LifeGurad Reminder", // 邮件主题
    text: "", // 纯文本内容
    html: html // HTML内容，如果提供则优先显示
  };
  try {
    // 发送邮件
    const info = await transporter.sendMail(mailOptions);
    console.log('邮件发送成功，消息ID:', info.messageId);
    return true;
  } catch (error) {
    console.error('邮件发送失败:', error);
    return false;
  }
}