import React from 'react'
import Title from './../components/Title';
import { assets } from './../assets/frontend_assets/assets';
import NewLetter from './../components/NewLetter';
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={' US'}/>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} alt="" className="w-full md:max-w-[450px]" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor rerum nam eveniet pariatur quis quo nihil iste quod aut repudiandae velit, nesciunt ducimus voluptatem amet nemo magni, ut molestiae sunt quibusdam possimus mollitia, quam aliquid dicta. Ad sunt debitis a, at, doloribus, totam quos architecto blanditiis minima voluptates consectetur impedit.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure reprehenderit accusamus tenetur minima labore eum ex, magnam aperiam velit et facilis. At necessitatibus ducimus provident dolores hic! Fuga laboriosam minus, corrupti voluptatibus asperiores minima nobis eius doloremque saepe ducimus nulla, suscipit praesentium at delectus vel provident quidem quisquam adipisci quis.</p>
          <b className="text-gray-800">Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste minima animi eius expedita quo porro accusamus qui eligendi eos architecto?</p>
        </div>
        </div>
        <div className="text-4xl py-4">
          <Title text1={"why"} text2={"Chosose Us"}/>
        </div>
        <div className="flex flex-col md:flex-row text-sm mb-20">
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis fuga placeat quaerat minus exercitationem ex qui facilis commodi quidem asperiores!</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convienve</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis fuga placeat quaerat minus exercitationem ex qui facilis commodi quidem asperiores!</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exception customer service </b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis fuga placeat quaerat minus exercitationem ex qui facilis commodi quidem asperiores!</p>
          </div>
        </div>
        <NewLetter/>
    </div>
  )
}

export default About
