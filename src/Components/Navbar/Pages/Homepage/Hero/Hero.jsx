import React from 'react'
import { SiKnowledgebase } from 'react-icons/si'
import { VscDebugStart } from 'react-icons/vsc'
import MainButton from '../../../../Shared/MainButton'
import heroImg from '../../../../../assets/hero.webp'

const Hero = () => {
  return (
    <section class='pt-24 pb-32'>
      <div class='overflow-hidden'>
        <div class='w-[1000px] mx-auto'>
          <div class=' flex-col items-center'>
            <div class='z-10 items-center text-center'>
              <h1 class='mb-8 text-[#02101c] text-pretty text-4xl font-semibold lg:text-8xl'>
                Track, Save, and Grow with SpendSmart
              </h1>
              <p class='mx-auto max-w-screen-md text-zinc-600 lg:text-xl'>
                Take control of your finances with an easy-to-use tracker that
                helps you monitor expenses, set budgets, and plan for a secure
                future—all in one powerful platform
              </p>
              <div class='mt-12 flex w-full flex-col justify-center gap-6 sm:flex-row'>
                <MainButton
                  text='Get Started'
                  icon={VscDebugStart}
                  onClick={() => console.log('Get Started Clicked')}
                />

                <div className='relative group'>
                  <button class='relative inline-block p-px font-semibold leading-6 text-[#02101c] bg-[#30e4ba]  shadow-lg cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95'>
                    <span class='absolute inset-0 rounded-xl bg-gradient-to-r from-[#02101c] via-[#023a6b] to-white p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100'></span>

                    <span class='relative z-10 block px-6 py-3 rounded-xl bg-[#30e4ba] '>
                      <div class='relative z-10 flex items-center space-x-2'>
                        <span class='transition-all duration-500 group-hover:translate-x-1'>
                          Learn More
                        </span>
                        <SiKnowledgebase className='w-6 h-6 transition-transform duration-500 group-hover:translate-x-1' />
                      </div>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <img
            src={heroImg}
            alt='Hero Image'
            class='mx-auto mt-24 max-h-[700px] w-full max-w-7xl rounded-t-lg object-cover shadow-lg'
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
