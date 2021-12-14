import Image from 'next/image'
import Head from 'next/head'
import { useState } from 'react'
import useAddItem from '../../hooks/cart/useAddItem.js'

const headers = {
  "X-Auth-Token": process.env.BIGCOMMERCE_STORE_API_TOKEN,
  "Accept": "application/json",
  "Content-type": "application/json"
  }

export default function Product({product}) {

  const [ cart, setCart ] = useState()
  const [ variant, setVariant] = useState()
  const [ selectedVariant, setSelectedVariant ] = useState()
  const { addCartItem } = useAddItem()

  async function addToCart(){
    if (!selectedVariant)
      return

    await addCartItem(product.id, selectedVariant, 1)

  }

  const variantHandler = (id) => {
    setVariant(id)
    setSelectedVariant(id)
  }

  return (
    <div>
      <Head>
        <title>{product.name}</title>
      </Head>

      <div className="text-3xl">
      <h1>{product.name}</h1>
      <h2>{product.id}</h2>
      </div>
      <div className="flex my-5">
        <div className="mr-5 ">
          <Image src={product.primary_image.url_standard} width="400" height="400"/>
        </div>
        <div>
          <div className="text-4xl">
            ${product.calculated_price.toFixed(2)}
          </div>
          <div className="my-3">
            Size:
            <div className="flex flex-row gap-3">
              {product.variants.map(variant=>(
                <div key={variant.id} className={"p-3 border-2 cursor-pointer " + (variant.id == selectedVariant ? "bg-gray-400" : "bg-white")} onClick={()=>variantHandler(variant.id)}>
                  {variant.option_values[0].label}
                </div>
              ))}
            </div>
          </div>
          <div className="my-3">
            <button className="bg-black text-white p-4" onClick={addToCart}>Add to Cart</button>
          </div>
          {cart && 
            <a href={cart.logged_in_checkout_url}>Checkout</a>
          }
        </div>
      </div>
    </div>    
  );
}

export async function getStaticProps({params}){

  const { id } = params

  const url = `${process.env.BIGCOMMERCE_STORE_API_URL}/v3/catalog/products/${id}?include=primary_image,variants`

  const resp = await fetch(url, {headers})
  const { data } = await resp.json()

  // const optionsUrl = `${process.env.BIGCOMMERCE_STORE_API_URL}/v3/catalog/products/${id}/options`

  // const optionsResp = await fetch(optionsUrl, {headers})
  // const { data : options } = await optionsResp.json()

  return {
    props:{
      product: data
    }
  }
}

export const getStaticPaths = async () => {

  const url = `${process.env.BIGCOMMERCE_STORE_API_URL}/v3/catalog/products?categories:in=${process.env.HOME_CATEGORY_ID}&include_fields=id`
  
  const resp = await fetch(url, {headers})
  const { data } = await resp.json()

  const paths = data.map((product) => ({
    params: { id: product.id.toString() },
  }))

  return {
    paths,
    fallback:false
  }
}
