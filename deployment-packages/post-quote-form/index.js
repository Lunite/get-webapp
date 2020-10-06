const { calculateQuote } = require("./quote")
const { PubSub } = require("@google-cloud/pubsub")

const publishEmailMessage = async (inputs, results) => {
  const psClient = new PubSub()
  const topicName = "send-email"
  const messageId = await psClient
    .topic(topicName)
    .publishJSON({ inputs, results })
  return messageId
}

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.handler = async (req, res) => {
  let time = new Date().getTime()

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
    const formValues = await req.body
    console.log("Calling Function With", formValues)
    const [result, inputs] = await calculateQuote(formValues)
    console.log("Got Result", result)
    time = new Date().getTime() - time
    // publish results to email function to continue quoting process
    await publishEmailMessage(inputs, result)
    console.log("Function Execution Time:", time / 1000, "seconds")
    res.json(result)
  }
}
