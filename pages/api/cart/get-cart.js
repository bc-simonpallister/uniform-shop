
const handler = async (req, res) => {

  const { cart_id } = req.query

  if (!cart_id){
    return res.status(404)
  }
 
  const headers = {
    "X-Auth-Token": process.env.BIGCOMMERCE_STORE_API_TOKEN,
    "Accept": "application/json",
    "Content-type": "application/json"
  }

  const response = await fetch( `${process.env.BIGCOMMERCE_STORE_API_URL}/v3/carts/${cart_id}?include=redirect_urls`, {headers})
  const { data } = await response.json()

  res.status(200).json(data)

}

export default handler