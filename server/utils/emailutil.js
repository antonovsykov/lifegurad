import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465, // QQ邮箱SMTP端口，465用于SSL
  secure: true, // 使用SSL
  auth: {
    user: '2815206703@qq.com', // 你的QQ邮箱地址
    pass: 'whaerxqlfcrzdfgi' // 你的QQ邮箱授权码，不是登录密码
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