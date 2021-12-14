import { useContext } from "react"
import { CartContext } from "components/providers/cart-provider.js"

const useCart = () => {
  const { cart, itemCount }  = useContext(CartContext)
  return { cart, itemCount }
}

export default useCart