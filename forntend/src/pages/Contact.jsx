import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewLetter from './../components/NewLetter';

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={' US'}/>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img src={assets.contact_img} alt="" className="w-full md:max-w-[480px]" />
          <div className="flex flex-col justify-center items-start gap-6">
            <p className="font-semibold text-xl text-gray-500">Our Store</p>
            <p className="text0text-gray-500">34233 willms station <br /> suit 345 , was,Uk</p>
            <p className="text-gray-500">tel:(33) 3939 399 <br />email:1233sadndeee@gmail.com</p>
            <p className="font-semibold text-gray-600">careers at forever</p>
            <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            <button className='border border-black text-black text-sm px-8 py-2 mt-4 hover:bg-black hover:text-white transition-all duration-500' > explor Jobs</button>
          </div>
        
      </div>
      <NewLetter/>
    </div>
  )
}

export default Contact
