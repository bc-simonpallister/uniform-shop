import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import ProductListing from 'components/listing.js'

export default function Home({category, products}) {

  // console.log("category",category)
  // console.log("products",products)

  return (
    <>
      <Head>
        <title>{category.page_title}</title>
        <meta name="description" content={category.meta_description}/>
      </Head>
      <div className="m-5">
        <div className="flex flex-row">
          <div className="w-1/2 mr-10">
            <div className="flex">
              <div className="mr-5">
                <Image alt={category.name} src={category.image_url} width="100" height="142"/>
              </div>
              <div className="text-7xl">
                <h1>{category.name}</h1>
              </div>
            </div>
            <div>
              <div dangerouslySetInnerHTML={{__html: category.description}}/>
            </div>
          </div>    
        </div>
        <ProductListing products={products}/>
      </div>
    </>
  )



}

export const getStaticProps = async (ctx) => {

  const headers = {
    "X-Auth-Token": process.env.BIGCOMMERCE_STORE_API_TOKEN,
    "Accept": "application/json",
    "Content-type": "application/json"
  }

  const catUrl = `${process.env.BIGCOMMERCE_STORE_API_URL}/v3/catalog/categories/${process.env.HOME_CATEGORY_ID}`
  const productsUrl = `${process.env.BIGCOMMERCE_STORE_API_URL}/v3/catalog/products?categories:in=${process.env.HOME_CATEGORY_ID}&include=primary_image`

  const catResp = await fetch(catUrl, {headers})
  const { data: category } = await catResp.json()


  const productsResp = await fetch(productsUrl, {headers})
  const { data: products } = await productsResp.json()

  return {
    props:{
      category,
      products
    }
  }
}
