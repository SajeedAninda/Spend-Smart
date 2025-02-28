import React, { useState } from 'react'

const Testimonial = () => {
  const testimonials = [
    {
      name: 'Emma Watson',
      role: 'Marketing Manager at Stech',
      text: '“Spend Smart has completely transformed the way I manage my finances. I’ve saved over $5,000 in just six months!”',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      name: 'John Doe',
      role: 'Freelance Designer',
      text: '“I love how intuitive and easy-to-use Spend Smart is. It’s helped me stay on top of my expenses and save for my dream vacation.”',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      text: '“Thanks to Spend Smart, I’ve paid off my student loans faster than I ever thought possible. Highly recommend it!”',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      name: 'Michael Brown',
      role: 'Small Business Owner',
      text: '“Spend Smart has been a game-changer for my business finances. The insights and reports are incredibly helpful.”',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      name: 'Laura Smith',
      role: 'Graphic Designer',
      text: '“I’ve tried many budgeting apps, but Spend Smart is by far the best. It’s simple, effective, and truly life-changing!”',
      image:
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      name: 'David Wilson',
      role: 'Financial Analyst',
      text: '“Spend Smart’s analytics tools are top-notch. I’ve gained so much insight into my spending habits and saved a lot of money.”',
      image:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [transitionDirection, setTransitionDirection] = useState('')

  const nextTestimonial = () => {
    setTransitionDirection('slide-left')
    setTimeout(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length)
      setTransitionDirection('')
    }, 300)
  }

  const prevTestimonial = () => {
    setTransitionDirection('slide-right')
    setTimeout(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      )
      setTransitionDirection('')
    }, 300)
  }

  return (
    <div className='dark:bg-[#02101c]'>
      <section className='pb-32 w-[100%] lg:w-[1000px] px-8 lg:px-0 mx-auto'>
        <div className=''>
          <div className='mb-12 w-[80%] mx-auto' data-aos='fade-up'>
            <h2 className='mb-4 text-center text-3xl font-semibold lg:text-5xl dark:text-white'>
              Discover Why People Love Spend Smart
            </h2>
            <p className='text-center text-zinc-600 lg:text-2xl dark:text-white'>
              From saving for a rainy day to planning for big life milestones,
              Spend Smart has helped over 100,000 users achieve financial
              freedom.
            </p>
          </div>

          <div className='py-4 mx-auto'>
            <main
              className='relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12'
              data-aos='fade-up-right'
            >
              <div className='absolute w-full bg-[#30e4ba] dark:bg-[#175e4d] -z-10 md:h-96 rounded-2xl'></div>

              <div
                className={`w-full p-6 bg-[#30e4ba] md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly transition-transform duration-300 ${
                  transitionDirection === 'slide-left'
                    ? 'transform translate-x-full'
                    : transitionDirection === 'slide-right'
                    ? 'transform -translate-x-full'
                    : ''
                }`}
              >
                <img
                  className='h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl'
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                />

                <div className='mt-2 md:mx-6'>
                  <div>
                    <p className='text-xl tracking-tight text-[#02101c] font-semibold '>
                      {testimonials[currentIndex].name}
                    </p>
                    <p className='text-white font-semibold '>
                      {testimonials[currentIndex].role}
                    </p>
                  </div>

                  <p className='mt-4 text-lg leading-relaxed text-[#02101c] font-semibold  md:text-xl'>
                    {testimonials[currentIndex].text}
                  </p>

                  <div className='flex items-center justify-between mt-6 md:justify-start'>
                    <button
                      title='left arrow'
                      className='p-2 text-white font-semibold  transition-colors duration-300 border rounded-full rtl:-scale-x-100 hover:bg-[#28b997]'
                      onClick={prevTestimonial}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-6 h-6'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth='2'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M15 19l-7-7 7-7'
                        />
                      </svg>
                    </button>

                    <button
                      title='right arrow'
                      className='p-2 text-white font-semibold  transition-colors duration-300 border rounded-full rtl:-scale-x-100 md:mx-6 hover:bg-[#28b997]'
                      onClick={nextTestimonial}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-6 h-6'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth='2'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M9 5l7 7-7 7'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Testimonial
