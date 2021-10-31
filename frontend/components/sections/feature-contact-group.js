
import NextImage from "../elements/image"
import Markdown from "react-markdown"

const FeatureContactGroup = ({ data }) => {
    // console.log("featureContactGroup", data)

    return (

        <div className="container flex flex-col">

            <h1 className="self-center mb-10 mt-10 font-bold" >{data.mainTitle}</h1>

            <div className="container flex flex-col sm:flex-row">
                {data.contactCard.map(card => {
                    return (

                        <div className="container flex  sm:flex-col mb-10  m-5 shadow  ">

                            <div className="w-10 h-10 mb-10 mr-2 self-center" >
                                <NextImage media={card.cardIcon} />
                            </div>

                            <div className=" ml-10 mr-2  mb-2 sm:ml-0" >
                                <Markdown className="mb-2">{card.cardContent}</Markdown>
                            </div>

                        </div>
                    )
                })}

            </div>
            <div className="mb-10">
                {data.socialCard.map((socialCard, i) => {

                    let socialBgColor
                    if (i === 0) {
                        socialBgColor = "#7C1111"
                    } 
                    if (i === 1) {
                        socialBgColor = "#255ACA"
                    }
                    if (i === 2) {
                        socialBgColor = "#EE7979"
                    }
                   

                    return (
                        <div className="container flex mb-1">
                            <div className="w-10 h-10 mr-2 ">
                                <NextImage media={socialCard.socialIcon} />
                            </div>
                            <div style={{
                                backgroundColor: socialBgColor
                            }} className="container flex w-full mb-1  items-center justify-center rounded shadow opacity-90">
                                <Markdown className="mb-2 text-white">{socialCard.socialContent}</Markdown>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default FeatureContactGroup
