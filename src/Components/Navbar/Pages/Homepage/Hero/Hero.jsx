import React from 'react'
import { SiKnowledgebase } from 'react-icons/si'
import { VscDebugStart } from 'react-icons/vsc'
import MainButton from '../../../../Shared/MainButton'
import heroImg from '../../../../../assets/hero.webp'
import { Link } from 'react-router-dom'
import useAuth from '../../../../Hooks/useAuth'

const Hero = ({ scrollToBenefits }) => {
  const { loggedInUser } = useAuth()

  return (
    <section className='pt-24 pb-32 dark:bg-[#02101c]'>
      <div className='overflow-hidden'>
        <div className='w-[100%] lg:w-[1000px] px-8 lg:px-0 mx-auto'>
          <div className='flex-col items-center'>
            <div className='z-10 items-center text-center'>
              <h1
                className='mb-8 text-[#02101c] dark:text-white text-pretty text-4xl font-semibold lg:text-7xl'
                data-aos='fade-right'
              >
                Track, Save, and Grow with SpendSmart
              </h1>
              <p
                className='mx-auto max-w-screen-md text-zinc-600 dark:text-white lg:text-xl'
                data-aos='fade-left'
              >
                Take control of your finances with an easy-to-use tracker that
                helps you monitor expenses, set budgets, and plan for a secure
                future—all in one powerful platform
              </p>
              <div className='mt-12 flex w-full flex-col justify-center gap-6 sm:flex-row'>
                {loggedInUser ? (
                  <Link to={'/transactions'}>
                    <MainButton text='Get Started' icon={VscDebugStart} />
                  </Link>
                ) : (
                  <Link to={'/login'}>
                    <MainButton text='Get Started' icon={VscDebugStart} />
                  </Link>
                )}

                <div className='relative group'>
                  <button
                    onClick={scrollToBenefits}
                    className='relative inline-block p-px font-semibold leading-6 text-[#02101c] bg-[#30e4ba] shadow-lg cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95'
                  >
                    <span className='absolute inset-0 rounded-xl bg-gradient-to-r from-[#02101c] via-[#023a6b] to-white p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100'></span>
                    <span className='relative z-10 block px-6 py-3 rounded-xl bg-[#30e4ba] '>
                      <div className='relative z-10 flex items-center space-x-2'>
                        <span className='transition-all duration-500 group-hover:translate-x-1'>
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
            data-aos='fade-up'
            src={heroImg}
            alt='Hero Image'
            className='mx-auto mt-24 max-h-[700px] w-full max-w-7xl rounded-t-lg object-cover shadow-lg'
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
