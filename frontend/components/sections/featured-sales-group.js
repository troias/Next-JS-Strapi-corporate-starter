import NextImage from "../elements/image";

const FeaturedSalesGroup = ({ data }) => {
  return (
    <div className="container flex-col">
      <div className="flex justify-center mb-10 mt-10">
        <h1 className="font-bold text-lg">{data.mainTitle}</h1>
      </div>
      <div className=" self-center mb-10">
        <NextImage media={data.mainImage} />
      </div>
    </div>
  );
};

export default FeaturedSalesGroup;
