//function for add products
import {v2 as cloudinary} from  'cloudinary'
import productModel from './../models/productModel.js';


const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;
    const image1 =  req.files.image1 && req.files.image1[0];
    const image2 =  req.files.image2 && req.files.image2[0];
    const image3 =  req.files.image3 && req.files.image3[0];
    const image4 =  req.files.image4 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );
    let ImagesUrl=await Promise.all(
        images.map(async (item) => {
            let result =await cloudinary.uploader.upload(item.path,{resource_type:'image'
            })
            return result.secure_url
        })
    )
    const productData={
      name,
      description,
      price:Number(price),
      image:ImagesUrl,
      category,
      subCategory,
      sizes:JSON.parse(sizes),
      bestseller:bestseller ==="true" ?true :false,
      date:Date.now()
    }

    console.log(productData);
    const product =new productModel(productData)
    
    await product.save()
    res.json({
        success: true, message: "product done"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
//function for listproducts

const ListProduct = async (req, res) => {
  try {

    const product = await productModel.find({})
    res.json({success:true,product})
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//function for remove products

const removeProduct = async (req, res) => {
  try {

    await productModel.findByIdAndDelete(req.body.id)
    res.json({
        success:true,message:'remove'
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
//function for single products

const SingleProduct = async (req, res) => {
  try {

     const  {productId} =req.body
     const product =await productModel.findById(productId)
     res.json({
        success:true,
        product
     })
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, ListProduct, removeProduct, SingleProduct };
