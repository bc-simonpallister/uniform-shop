import '../styles/globals.css'
//import { CommerceProvider } from '@bigcommerce/storefront-data-hooks'
import { CartContextProvider } from '../components/providers/cart-provider'
//import Navbar from 'components/navbar.js'
import Layout from 'components/layout.js'

const App = ({ Component, pageProps }) => {
  return (
    <CartContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartContextProvider>
  )
}

export default App
