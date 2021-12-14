import CartItem from 'components/cart-item.js'
import useCart from '../hooks/cart/useCart.js'
import Link from 'next/link'

const Cart = () => {

  const { cart, itemCount } = useCart()

  return (
    <>
      <h1>Cart</h1>
      <div>
        {!cart && 
          <div>Cart is currently empty</div>
        } 
        {cart && 
          <div className='flex flex-col'>
            {cart.line_items.physical_items.map(item=>(
              <CartItem key={item.id} item={item}/>
            ))}
            <div className='flex flex-row text-3xl gap-5 items-center border-t my-2 py-5'>
              <div>{itemCount}</div>
              <div className='flex-1 text-right'>Total ${Number(cart.cart_amount).toFixed(2)}</div>
            </div>
            <Link href={cart.redirect_urls.checkout_url}>
              <a className="bg-gray-800 text-white text-3xl py-2 text-center">Checkout</a>
            </Link>
          </div>
        }
      </div>
    </>
  )
}

export default Cart