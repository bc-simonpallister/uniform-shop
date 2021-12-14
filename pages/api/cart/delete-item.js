
const handler = async (req, res) => {

  const { cart_id, line_item_id } = req.query

  const headers = {
    "X-Auth-Token": process.env.BIGCOMMERCE_STORE_API_TOKEN,
    "Accept": "application/json",
    "Content-type": "application/json"
  }

  const response = await fetch( `${process.env.BIGCOMMERCE_STORE_API_URL}/v3/carts/${cart_id}/items/${line_item_id}`, {
    method: "DELETE",
    headers
  })
  const data = await response.json()
  console.log(data)
  res.status(200).json(data)

}

export default handler