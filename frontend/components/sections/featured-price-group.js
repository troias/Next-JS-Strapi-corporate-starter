

import NextImage from "../elements/image"
import Markdown from "react-markdown"

const FeaturedPriceGroup = ({ data }) => {
    console.log("FeaturedPriceGroup", data)
    return (
        <div className="container flex flex-col" >
            <div className="mt-10 mb-10 self-center font-bold">
                <h1 className="">{data.mainTitle}</h1>
            </div>

            <div className="flex flex-col py-4 sm:flex-row gap-4 flex-wrap m-auto">

                {data.productCard.map((product) => {
                    console.log("product.productImage", product.productImage)
                    return (
                        <div className="container flex flex-col justify-center  sm:flex-row ">
                            <div className="w-56  self-center">
                                <NextImage media={product.productImage} />
                            </div>


                            <div className="flex flex-col ">
                                <div className="font-bold ml-3 mb-3 self-center ">
                                    <h3>{product.productTitle}</h3>
                                </div>

                                <Markdown className="w-6/12 mb-2 ml-0 self-center">{product.productContent}</Markdown>


                            </div>
                            <div className="">
                                <h2 className="font-bold mb-2">  {product.priceTitle}</h2>
                                {product.productSize.map((productSize) => {
                                    return (
                                        <div className="flex flex ">

                                            <div className="  mb-3 self-center ">

                                                <h3 >
                                                    {productSize.sizeOption}
                                                </h3>

                                            </div>
                                            <strong className="w-6/12 mb-2 ml-2 self-center">${productSize.pirce}</strong>
                                        </div>
                                    )
                                })} 
                            </div>
                        </div>

                    )
                })}

            </div>
        </div>
    )
}


export default FeaturedPriceGroup
