import React from 'react'

function CrouselSlide({title,description,image,slide,totalSlide}) {
  return (
    <>  
            <div id={`slide${slide}`} className="carousel-item relative w-full flex items-center justify-center mt-5">
                <div className='felx flex-col justify-center items-center gap-4 px-[15%]'>
                    <div className='flex flex-col justify-center items-center'>
                    <img src={`${image}`} className="w-40 rounded-full border-2 border-gray-400" />
                    <p className='text-xl text-gray-200'>{description}</p>
                    <h3 className='text-2xl font-semibold'>{title}</h3>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href={`#slide${slide==1?totalSlide:(slide-1)}`} className="btn btn-circle">❮</a> 
                        <a href={`#slide${(slide) % totalSlide+1}`} className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div> 
    </>
  )
}

export default CrouselSlide