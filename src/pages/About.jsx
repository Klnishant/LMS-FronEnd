import React from 'react'
import aboutImage from "../assets/images/aboutMainImage.png";
import { clebrityData } from '../constants/celebrity';
import CrouselSlide from '../Components/Crousel/CrouselSlide';

function About() {
  return (
    <>
        <div className='md:pl-20 pt-20 flex flex-col text-white'>
            <div className='flex flex-col md:flex-row flex-item-center gap-5 mx-5 md:mx-10'>
                <section className='md:w-1/2 space-y-5 md:space-y-10 flex flex-col justify-center items-center'>
                    <h1 className='text-3xl md:text-5xl text-yellow-500 font-semibold'>
                        Affordable And Quality Education
                    </h1>
                    <p className='text-lg md:text-xl text-gray-200'>
                        Our goal is to provide the afoordable and quality education to the world. 
                        We are providing the platform for the aspiring teachers and students to share
                        their skills, creativity and knowledge to each other to empower and contribute
                        in the growth and wellness of mankind.  
                    </p>
                </section>
                <div className='md:w-1/2'>
                    <img
                     id='test1'
                     style={{
                        filter:"drop-shadow(0px 10px 10px rgb(0,0,0))"
                     }}
                     className='drop-shadow-2xl'
                     src={aboutImage} 
                     alt="about image" />
                </div>
            </div>
            <div className="carousel w-2/3 md:w-1/3 m-auto mb-5">
                {
                    clebrityData && clebrityData.map((celebrity)=>(
                        <CrouselSlide
                            key={celebrity.slide}
                            {...celebrity}
                            totalSlide={clebrityData.length}
                        />
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default About