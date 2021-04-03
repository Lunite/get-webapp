const sgMail = require("@sendgrid/mail")
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports.handler = async (req, res) => {
  // const formValues = await req.body
  // console.log(formValues);
  //  


  res.set("Access-Control-Allow-Origin", "*")
        if (req.method === "OPTIONS") {
          // for preflight req
          // Send response to OPTIONS requests
          console.log("Doing Preflight Checks")
          res.set("Access-Control-Allow-Methods", "POST")
          res.set("Access-Control-Allow-Headers", "Content-Type")
          res.set("Access-Control-Max-Age", "3600")
          res.status(204).send("")
        } else {
          // for 2nd req
          const {displayName, rating, comments} = await req.body
              const today = new Date()
              const msg = {
                to: "bensinclair@lunite.co.uk", // Change to your recipient
                from: "jordanandrews@lunite.co.uk", // Change to your verified sender
                templateId: 'd-e8d733dfba764c80a56ee3ffb238ca61',
                dynamicTemplateData: {
                  displayName,
                  rating,
                  comments, 
                  date: today.toLocaleDateString()              
                },
              };
              return sgMail
                .send(msg)
                .then(() => {
                  res.status(200).json({displayName, rating, comments})
                })
                .catch(error => {
                  console.error(error)
                  res.status(400).send("something went wrong")
                })
          
          
        }
}