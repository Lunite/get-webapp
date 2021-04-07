exports.handler = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*")

  if (req.method === "OPTIONS") {
    console.log("Doing Preflight Checks")
    res.set("Access-Control-Allow-Methods", "POST")
    res.set("Access-Control-Allow-Headers", "Content-Type")
    res.set("Access-Control-Max-Age", "3600")
    res.status(204).send("")
  } else {
    const formValues = await req.body
    console.log("Calling Function With", formValues)
    // Here we should generate all the values by doing any look ups we need, e.g. estimated annual consumption. 

    // then we should tun the generate cost for system that i have started writing, 

    // then we should work out the usage and savings

    // then we should send of the email

  }
}
