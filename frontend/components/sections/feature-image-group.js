import NextImage from "../elements/image";

const FeatureImageGroup = ({ data }) => {
    // console.log("FeatureImageGroup", data);
    return (
        <>

            {data.content.map((content, i) => {

                let rowReverse =  "container flex flex-col md:flex-row items-center justify-between py-12"
                
                if (i === 1) {
                    rowReverse = "container flex flex-col md:flex-row-reverse items-center justify-between py-12"
                }

                return (
                    <section  className={rowReverse}>
                     
                            <div className="md:mr-12 ml-10 ">
                                <p className="">{content.content}</p>
                            </div>
                            {/* {console.log("content.image", content.image)} */}
                            <div className="flex-shrink-0 w-full md:w-6/12 mt-6 md:mt-0 ">
                                <NextImage media={content.image} />
                            </div>
                    
                    </section>
                );
            })}

        </>
    );
};

export default FeatureImageGroup;
