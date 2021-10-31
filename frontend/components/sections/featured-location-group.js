

const FeaturedLocationGroup = ({data}) => {

    console.log("FeaturedLocationData", data)

    return (
        <div className="flex-col ">
            <div className="flex justify-center mt-10 font-bold text-lg">
                <h1>{data.mainTitle}</h1>
            </div>
        </div>
    )
}

export default FeaturedLocationGroup
