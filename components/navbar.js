import Link from 'next/link'
import Image from 'next/image'
import useCart from '../hooks/cart/useCart.js'

const Navbar = ({club}) => {

  const { cart, itemCount } = useCart()
  
  return (
    <nav className="bg-black w-full p-3">
      <div className="flex flex-row text-white items-center">
        <div className="flex-1">
          <Link href="/">
            <a className="text-4xl">Home</a>
          </Link>
        </div>
        <div className="p-3 uppercase text-xl">
          <Link href="/cart">
            <a>
              {itemCount}
            </a>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar