import React, { useState, useContext } from "react";
import Title from "../components/Title";
import CardTotal from "../components/CardTotal";

import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    products,
    delivery_fee,
    cartItems,
    setcartItems,
    getCartAmount,
    backendUrl,
    token,
  } = useContext(ShopContext);
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setformData((data) => ({ ...data, [name]: value }));
  };
  const intipay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_Key_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try{
            const {data} =await axios.post(backendUrl+'/api/order/verifyRazorpay',response,{ headers: { Authorization: `Bearer ${token}`
           } })
           if(data.success){
            navigate('/orders')
            setcartItems({})
           }
           }catch(error){
          toast.error(error.message)
        }
      },
    };
    const rzp =new window.Razorpay(options)
    rzp.open()
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemsInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemsInfo) {
              itemsInfo.size = item;
              itemsInfo.quantity = cartItems[items][item];
              orderItems.push(itemsInfo);
            }
          }
        }
      }
      let orderdata = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      switch (method) {
        // api call for cod
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderdata,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (response.data.success) {
            setcartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        case "stripe":
          const responseStrip = await axios.post(
            backendUrl + "/api/order/stripe",
            orderdata,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (responseStrip.data.success) {
            const { session_url } = responseStrip.data;
            window.location.replace(session_url);
          } else {
            toast.error(response.data.message);
          }
          break;
        case "razorpay":
          const responseRazorpay = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderdata,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (responseRazorpay.data.success) {
            intipay(responseRazorpay.data.order)
          } else {
            toast.error(response.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col  sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* ---------left side---------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={" INFOMATION"} />
        </div>
        <div className="flex gap-3 ">
          <input
            required
            onChange={onchangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            placeholder="First name"
            className="border border-gray-300 rounderd py-1.5 px-3.5 w-full"
          />
          <input
            required
            onChange={onchangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            placeholder="Last name"
            className="border border-gray-300 rounderd py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          onChange={onchangeHandler}
          name="email"
          value={formData.email}
          type="email"
          placeholder="Email address"
          className="border border-gray-300 rounderd py-1.5 px-3.5 w-full"
        />
        <input
          required
          onChange={onchangeHandler}
          name="street"
          value={formData.street}
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounderd py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3 ">
          <input
            required
            onChange={onchangeHandler}
            name="city"
            value={formData.city}
            type="text"
            placeholder="City"
            className="border border-gray-300 rounderd py-1.5 px-3.5 w-full"
          />
          <input
            required
            onChange={onchangeHandler}
            name="state"
            value={formData.state}
            type="text"
            placeholder="State"
            className="border border-gray-300 rounderd py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3 ">
          <input
            required
            onChange={onchangeHandler}
            name="zipCode"
            value={formData.zipCode}
            type="number"
            placeholder="ZipCode"
            className="border border-gray-300 rounderd py-1.5 px-3.5 w-full"
          />
          <input
            required
            onChange={onchangeHandler}
            name="country"
            value={formData.country}
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounderd py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          onChange={onchangeHandler}
          name="phone"
          value={formData.phone}
          type="number"
          placeholder="phone"
          className="border border-gray-300 rounderd py-1.5 px-3.5 w-full"
        />
      </div>

      {/*  ---------------right side-------------*/}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CardTotal />
        </div>
        <div className="mt-12">
          <Title text1={"Payment"} text2={"Method"} />
          {/* ------payment method selection ---------*/}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white text-sm px-16 py-3 hover:cursor-pointer hover:bg-white hover:text-black"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
