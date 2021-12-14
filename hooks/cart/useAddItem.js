import { useContext } from "react"
import { CartContext } from "components/providers/cart-provider.js"

const useAddItem = () => {

  const { cartId, setCartId, setDatestamp }  = useContext(CartContext)

  const addCartItem = async (productId, variantId, quantity) => {

    const res = await fetch(`/api/cart/add-item?cart_id=${cartId}&product_id=${productId}&variant_id=${variantId}&quantity=${quantity}`)
    const cart = await res.json()

    console.log(cart)

    console.log("added",cart.id)
    setCartId(cart.id)
    setDatestamp(cart.updated_time)

  }
  return { addCartItem }

}

export default useAddItem