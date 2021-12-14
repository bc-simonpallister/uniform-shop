import { useContext } from "react"
import { CartContext } from "components/providers/cart-provider.js"

const useDeleteItem = () => {

  const { cartId, setCartId, setDatestamp }  = useContext(CartContext)

  const deleteCartItem = async (line_item_id) => {

    const res = await fetch(`/api/cart/delete-item?cart_id=${cartId}&line_item_id=${line_item_id}`)
    const cart = await res.json()

    console.log("deleted",cart.id)
    setDatestamp(cart.updated_time)

  }
  return { deleteCartItem }

}

export default useDeleteItem