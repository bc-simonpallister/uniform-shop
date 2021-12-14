import { createContext, useState, useEffect } from "react"
import useLocalStorage from "hooks/useLocalStorage.js"
import useSWR from 'swr'

export const CartContext = createContext()

const dataFetcher = async (url) => {
  console.log('fetching cart', url)
  const res = await fetch(url)
  const data = await res.json()
  console.log('data')
  console.log(data)
  return data
}

export const CartContextProvider = ({children}) => {

  const [cartId, setCartId] = useLocalStorage("cartId", null)
  const [datestamp, setDatestamp] = useState()

  let cart = null
  let itemCount = 0

  const calcCount = () => {
    if (!cart) return 0
    const countItem = (count, item) => count + item.quantity
    const countItems = (count, items) => items.reduce(countItem, count)
    return Object.values(cart?.line_items ?? {}).reduce(countItems, 0)
  }

  const { data, error } = useSWR(cartId ? `/api/cart/get-cart?cart_id=${cartId}&datestamp=${datestamp}` : null, dataFetcher)
  if (data) {
    cart = data
    itemCount = calcCount()
  }

  return (
    <CartContext.Provider value={{ cartId, setCartId, cart, itemCount, setDatestamp }}>
      {children}
    </CartContext.Provider>
  )
}

