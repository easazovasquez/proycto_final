const nodemailer = require('nodemailer');

export const enviarMail = async () => {
  const config = {
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: 'sazovasquezedyalexander@gmail.com',
      pass: 'lmvsfvljtrskwsiz'
    }
  }

  const mensaje = {
    from: 'sazovasquezedyalexander@gmail.com',
    to: 'sazovasquezedyalexander@gmail.com',
    subject: 'Detalle Visita a Cliente',
    text: 'Envio de correo desde node'
  }

  const transport = nodemailer.createTransport(config);
  const info = await transport.sendMail(mensaje);
  console.log(info);
}
