const nodemailer = require('nodemailer');
const ejs = require('ejs');
const util = require('util');
const emailConfig = require('../config/email');

let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.pass
    }
});

exports.sendContactEmail = async (options) => {
    html = `
            <h2> Mensaje de: <b>${options.name}</b></h2>    <br>
            <h3> Info: </h3>                                   
            <h3> Ip: ${options.ip} </h3>                        
            <h3> Correo: ${options.email} </h3>                 
            <h3> Fecha: ${options.date} </h3>                   
            <h3> País: ${options.country} </h3>                 
            <h3> Mensaje: </h3>                                 
            <p> ${options.message} </p>
        `;

    let info = {
        from: options.email, // sender address
        to: "jorgelandaeta334@gmail.com, programacion2ais@dispostable.com", // list of receivers
        subject: `Message from ${options.name}`, // Subject line
        text: options.message, // plain text body
        html: html, // html body
    };

    const sendEmail = util.promisify(transport.sendMail, transport);
    return sendEmail.call(transport, info)
}