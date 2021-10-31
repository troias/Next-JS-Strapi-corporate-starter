

 const FeaturedSocialMediaGroup = ({data}) => {
    console.log("FeaturedSocialMediaGroup", data)
    return (
        <div className="container flex-col">
            <div className="flex justify-center mt-10 font-bold text-lg">
                <h1>{data.mainTitle}</h1>
            </div>
        </div>
    )
}

export default FeaturedSocialMediaGroup
