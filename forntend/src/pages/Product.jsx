import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import ReleatedProduct from "../components/ReleatedProduct";

const Product = () => {
  const { productId } = useParams();
  const { products,currency } = useContext(ShopContext);
  const [ProductData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, SetSize] = useState("");
  const fetchproduct = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };
  useEffect(() => {
    fetchproduct();
  }, [productId, products]);

  return ProductData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Prduct Imaeges*/}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {ProductData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full h-auto" />
          </div>
        </div>
        {/* -------------ProductInfo------ */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{ProductData.name}</h1>
          <div className="flex itme-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5"/>
            <img src={assets.star_icon} alt="" className="w-3 5"/>
            <img src={assets.star_dull_icon} alt="" className="w-3 5"/>
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency}{ProductData.price}</p>
          <p className="mt-5 text-gray-500 md-w-4/5">{ProductData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {
                ProductData.sizes.map((item,index)=>(
                  <button onClick={()=>{SetSize(item)}} className={`border py-2 px-4 bg-gray-100  ${item===size?'border-orange-500':''}`} key={index}>{item}</button>
                ))
              }
            </div>
          </div>
          <button className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"> ADD to Cart</button>
        <hr className="mt-8 sm:w-4/5"/>
        <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
          <p>100% Original Product.</p>
          <p>Cash on delivery is available on this product.</p>
          <p>Easy return and exchange policy withi 7 days</p> 
          </div>
        </div>
      </div>
      {/*  ------------------Description and Review Section-----------*/}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews(122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p className="">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur nisi dolorem eius animi hic consectetur ratione molestiae doloribus accusamus tempora earum impedit cum delectus, deserunt ut consequuntur est similique perspiciatis suscipit corporis nemo facilis non eum sit!</p>
          <p className="">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi quae voluptas mollitia inventore officia ad necessitatibus reiciendis, soluta autem suscipit ipsum magnam voluptatibus. Qui porro quod itaque dolorem officia voluptas.</p>
          </div> 
      </div>
      {/* ----- Dispaly related products */}
      <ReleatedProduct 
      category={ProductData.category}
      subCategory={ProductData.subCategory}/>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
