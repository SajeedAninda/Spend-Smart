import React from 'react'

const Testimonial = () => {
  return (
    <section className='pb-32'>
      <div className='w-[1000px] mx-auto'>
        <div className='mb-12 w-[80%] mx-auto'>
          <h2 className='mb-4 text-center text-3xl font-semibold lg:text-5xl'>
            Discover why People Loves Spend Smart
          </h2>
          <p className='text-center text-zinc-600 lg:text-2xl'>
            From saving for a rainy day to planning for big life milestones,
            Spend Smart has helped over 100,000 users achieve financial freedom.
          </p>
        </div>

        <div class='py-4 mx-auto'>
          <main class='relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12'>
            <div class='absolute w-full bg-[#30e4ba] -z-10 md:h-96 rounded-2xl'></div>

            <div class='w-full p-6 bg-[#30e4ba] md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly'>
              <img
                class='h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl'
                src='https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                alt='client photo'
              />

              <div class='mt-2 md:mx-6'>
                <div>
                  <p class='text-xl tracking-tight text-[#02101c] font-semibold '>
                    Ema Watson
                  </p>
                  <p class='text-blue-200 '>Marketing Manager at Stech</p>
                </div>

                <p class='mt-4 text-lg leading-relaxed text-[#02101c] font-semibold  md:text-xl'>
                  {' '}
                 text
                </p>

                <div class='flex items-center justify-between mt-6 md:justify-start'>
                  <button
                    title='left arrow'
                    class='p-2 text-white font-semibold  transition-colors duration-300 border rounded-full rtl:-scale-x-100 hover:bg-[#28b997]'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      class='w-6 h-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      stroke-width='2'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M15 19l-7-7 7-7'
                      />
                    </svg>
                  </button>

                  <button
                    title='right arrow'
                    class='p-2 text-white font-semibold  transition-colors duration-300 border rounded-full rtl:-scale-x-100 md:mx-6 hover:bg-[#28b997]'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      class='w-6 h-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      stroke-width='2'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
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
  )
}

export default Testimonial
