import NextImage from "../elements/image";
import Button from "../elements/button";

const CareerContentGroup = ({ data }) => {
  return (
    <>
      <div className="flex ">
        <div className="w-full h-2/4">
          <NextImage media={data.bannerImage} />
        </div>
      </div>
      <div className="container flex-col">
        <div className="flex justify-center mt-10 font-bold">
          <h1 className="">{data.mainTitle}</h1>
        </div>

        <div className="flex-col ">
          <h2 className="mb-2 font-bold mt-2 ">{data.secondaryTitle}</h2>
          <p className="italic mb-6 mt-5"> &quot;{data.aboutUs} &quot;</p>
        </div>

        <div className="flex flex-row overflow-hidden">
          {data.image.map((image) => {
            return (
              <div className="w-1/2 h-52 mr-2">
                <NextImage media={image.image} />
              </div>
            );
          })}
        </div>
        <div className="flex mt-10 justify-center">
          <h3 className="font-bold"> {data.lowerTitle} </h3>
        </div>
        <div>
          <div className="flex content-center mt-10">
            {data.lowerImg.map((lowerImg) => {
              return (
                <div className="w-1/2 h-52 mr-2  overflow-hidden">
                  <NextImage media={lowerImg.image} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center mb-5 font-bold">
          <h3>{data.vaccanciesTitle}</h3>
        </div>
        <div className="flex mb-5">
          <p>{data.vacanciesContent}</p>
        </div>

        <div className="flex justify-center mb-10">
          <Button
            button={{ text: data.applyNowButton.text }}
            key={data.applyNowButton.id}
            appearance="dark"
          />
        </div>
        <div></div>
      </div>
    </>
  );
};

export default CareerContentGroup;
