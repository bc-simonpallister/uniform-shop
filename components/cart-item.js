import Link from 'next/link'
import useDeleteItem from 'hooks/cart/useDeleteItem.js'

const CartItem = ({item}) => {

  const { deleteCartItem } = useDeleteItem()

  const handleDelete = async (e) => {
    e.preventDefault()
    await deleteCartItem(item.id)
  }

  return (
    <div className="flex gap-6 my-2 items-center">
      <div className="w-10">{item.quantity}</div>
      <div className="flex-1">
        <Link href={`/products/${item.product_id}`}>
          <a>{item.name}</a>
        </Link>
      </div>
      <div className="w-30 text-right">{item.sku}</div>
      <div className="w-10 text-right" >${Number(item.sale_price).toFixed(2)}</div>
      <div className="w-10 text-right">${Number(item.extended_sale_price).toFixed(2)}</div>
      <div className="w-10 text-right"><button onClick={handleDelete} className="border p-2">X</button></div>
    </div>
  )
}

export default CartItem