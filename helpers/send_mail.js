/*
 +-------------------------------------------------------------------------------------------+
 | Module Name: Send E-mails	                         									 |
 | Module Purpose: Global service to send emails accross the application			         |
 | Author: Dinesh Kumar                                      								 |
 | Date : 25 Jan 2018																		 |
 +-------------------------------------------------------------------------------------------+
*/
'user strict'

var EmailTemplates = require('swig-email-templates');
const nodemailer = require('nodemailer');
var templates = new EmailTemplates();

module.exports = {
	/*
		params = {to:"receiver email id" ,subject:"email subject", text:"" , html:"" ,template:"file path" }
	*/

	sendEMail : function(params , next)
	{
		var smtpConfig = 
		{
			host: 'smtp.gmail.com',
			port: 465,
			secure: true, // use SSL, 
			// you can try with TLS, but port is then 587
			auth: {
				user: 'aks25php@gmail.com', // Your email id
				pass: 'chiya@123' // Your password
			}
		};

		var transporter = nodemailer.createTransport(smtpConfig);

		var mailOptions = {
			from: 'noreply@gmail.com', // sender address
			to: params.to, // list of receivers
			subject: params.subject, // Subject line
			text : (params.text)?params.text:'',
			html : (params.html)?params.html:''
		}

		if(params.template)
		{
			var context = (params.data)?params.data:'';
			
			try
			{
				templates.render(params.template, context, function(err, html, text, subject) 
				{
					if(err)
					{
						return next("Error template "+err , null);	
					}

				if(params.text)
				{
					mailOptions.text = text;
				}
				if(params.template)
				{
					mailOptions.html = html;
				}
				transporter.sendMail(mailOptions, function(error, info)
				{
					if(error)
					{
						next("Error in email Sending"+error , null);
					}
					else
					{
						next(null , "Email sent successfully.");	      
					};
				});			
			});

			}
			catch(e)
			{
				return next("Error template "+params.template+e , null);
			}
			

		}
		else
		{
			transporter.sendMail(mailOptions, function(error, info)
			{
				if(error)
				{
					next("Error in email Sending"+error , null);
				}
				else
				{
					next(null , "Email sent successfully.");	      
				};
			});
		}	
		
	}

}