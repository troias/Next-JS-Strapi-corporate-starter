import NextImage from "../elements/image";
import Button from "../elements/button";

const CareerContentGroup = ({ data }) => {
  console.log("data", data);
  return (
    <>
      <div>
        <NextImage media={data.bannerImage} />
      </div>
      <div className="container flex-col">
        <div className="flex justify-center">
          <h1 className="">{data.mainTitle}</h1>
        </div>

        <div className="flex-col ">
          <h2 className="mb-2">{data.secondaryTitle}</h2>
          <p className="italic mb-6"> &quot;{data.aboutUs} &quot;</p>
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
          <h3> {data.lowerTitle} </h3>
        </div>
        <div>
          <div className="flex content-center mt-10">
    
            {data.lowerImg.map((lowerImg) => {
              return (
                <div className="w-1/2 h-52 mr-2 justify-self-center">
                  <NextImage media={lowerImg.image} />
                </div>
              );
            })}
          </div>
        </div>
        <div>{data.vaccanciesTitle}</div>
        <div>{data.vacanciesContent}</div>
        <div>
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
