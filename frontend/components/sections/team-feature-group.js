import NextImage from '../elements/image'

const TeamFeatureGroup = ({ data }) => {
    console.log("TeamFeatureGroup", data)

    return (
        <div className="container flex-col ">



            <div className="mb-5 mt-5 flex justify-center">
                <h3 className="font-bold mb-2 ">{data.mainTitle}</h3>
            </div>

            <div className="flex justify-center   ">
                {data.teamMemberCard.map(member => {
                    return (
                        <div key={member.id} className="flex flex-col  sm:flex-row sm:w-full bg-gray-100  mb-10 w-64 shadow rounded-md overflow-hidden ">

                            <div className="w-64 h-52 mr-5">
                                <NextImage media={member.image} />
                            </div>

                            <div className="">
                                <div className="flex">
                                    <div className="flex-col mr-5 mt-20 sm:m-5" >
                                        <h3 className="font-bold mb-2 ">
                                            {member.positionTitle}
                                        </h3>
                                        <h3 className="font-bold mb-2">
                                            {member.hobbiesTitlte}
                                        </h3>
                                        <h3 className="font-bold mb-2 ">
                                            {member.nameTitle}
                                        </h3>
                                    </div>
                                    <div className="flex-col  mt-5 mt-20 sm:m-5">
                                        <p className="mb-2"> {member.position} </p>
                                        <p className="mb-2"> {member.hobbies} </p>
                                        <p className="mb-2"> {member.name} </p>
                                    </div>
                              

                                </div>



                            </div>
                        </div>
                    )
                }

                )}
            </div>






        </div>
    )
}

export default TeamFeatureGroup