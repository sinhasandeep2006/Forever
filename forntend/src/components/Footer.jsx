import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 test-sm">
        <div>
          <img src={assets.logo} alt="" className="mb-5w-32 " />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            velit numquam. Officia assumenda qui maxime autem, fugit repellat
            perspiciatis molestias adipisci, saepe sunt consequuntur rem,
            debitis necessitatibus at accusamus.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About US</li>
            <li>DELIVERY</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
            <p className="test-xl font-medium mb-5">GET In TOUCH</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li >+91-9871586457</li>
                <li>1233sandeepsinha@gmail.com</li>
            </ul>
        </div>
      </div>

      <div>
            <hr />
            <p className="py-5 text-center">Copyright 2025@ forever.com -All Right Reserved.</p>

      </div>
    </div>
  );
};

export default Footer;
