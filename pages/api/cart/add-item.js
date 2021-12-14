
const handler = async (req, res) => {

  const { cart_id, product_id, variant_id, quantity } = req.query

  const headers = {
    "X-Auth-Token": process.env.BIGCOMMERCE_STORE_API_TOKEN,
    "Accept": "application/json",
    "Content-type": "application/json"
  }

  const payload = {
    line_items: [
      {
        quantity: Number(quantity),
        product_id: Number(product_id),
        variant_id: Number(variant_id)
      }
    ]
  }

  console.log(cart_id)
  console.log(typeof(cart_id))
  console.log(cart_id == "null")

  if (cart_id || cart_id !== 'null'){
    console.log('adding to existing cart')
    const response = await fetch( `${process.env.BIGCOMMERCE_STORE_API_URL}/v3/carts/${cart_id}/items`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    })
    const { data } = await response.json()
    res.status(200).json(data)
  } else {
    console.log('creating new cart')
    const response = await fetch( `${process.env.BIGCOMMERCE_STORE_API_URL}/v3/carts`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers
    })
    const { data } = await response.json()
    res.status(200).json(data)
  }


}

export default handler