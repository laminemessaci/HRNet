/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

/**
 * * Profile Page
 * @returns {JSX.Element}
 */
const Profile: React.FC = (): JSX.Element => {
  return (
    <main className='w-full h-screen flex flex-col justify-center gap-12 items-center my-16'>
      {' '}
      <div className='w-full p-6 mx-auto'>
        <div className='flex flex-wrap -mx-3'>
          <div className='w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-0'>
            <div className='relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border'>
              <div className='border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0'>
                <div className='flex items-center'>
                  <p className='mb-0 dark:text-white/80'>Edit Profile</p>
                  <button
                    type='button'
                    className='inline-block px-8 py-2 mb-4 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-blue-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85'
                  >
                    Settings
                  </button>
                </div>
              </div>
              <div className='flex-auto p-6'>
                <p className='leading-normal uppercase dark:text-white dark:opacity-60 text-sm'>User Information</p>
                <div className='flex flex-wrap -mx-3'>
                  <div className='w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0'>
                    <div className='mb-4'>
                      <label
                        htmlFor='username'
                        className='inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80'
                      >
                        Username
                      </label>
                      <input
                        type='text'
                        name='username'
                        value='lucky.jesse'
                        className='focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none'
                      />
                    </div>
                  </div>
                  <div className='w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0'>
                    <div className='mb-4'>
                      <label
                        htmlFor='email'
                        className='inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80'
                      >
                        Email address
                      </label>
                      <input
                        type='email'
                        name='email'
                        value='jesse@example.com'
                        className='focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none'
                      />
                    </div>
                  </div>
                  <div className='w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0'>
                    <div className='mb-4'>
                      <label
                        htmlFor='first name'
                        className='inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80'
                      >
                        First name
                      </label>
                      <input
                        type='text'
                        name='first name'
                        value='Jesse'
                        className='focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none'
                      />
                    </div>
                  </div>
                  <div className='w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0'>
                    <div className='mb-4'>
                      <label
                        htmlFor='last name'
                        className='inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80'
                      >
                        Last name
                      </label>
                      <input
                        type='text'
                        name='last name'
                        value='Lucky'
                        className='focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none'
                      />
                    </div>
                  </div>
                </div>
                <hr className='h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent ' />

                <p className='leading-normal uppercase dark:text-white dark:opacity-60 text-sm'>Contact Information</p>
                <div className='flex flex-wrap -mx-3'>
                  <div className='w-full max-w-full px-3 shrink-0 md:w-full md:flex-0'>
                    <div className='mb-4'>
                      <label
                        htmlFor='address'
                        className='inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80'
                      >
                        Address
                      </label>
                      <input
                        type='text'
                        name='address'
                        value='Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09'
                        className='focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none'
                      />
                    </div>
                  </div>
                  <div className='w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0'>
                    <div className='mb-4'>
                      <label
                        htmlFor='city'
                        className='inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80'
                      >
                        City
                      </label>
                      <input
                        type='text'
                        name='city'
                        value='New York'
                        className='focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none'
                      />
                    </div>
                  </div>
                  <div className='w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0'>
                    <div className='mb-4'>
                      <label
                        htmlFor='country'
                        className='inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80'
                      >
                        Country
                      </label>
                      <input
                        type='text'
                        name='country'
                        value='United States'
                        className='focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none'
                      />
                    </div>
                  </div>
                  <div className='w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0'>
                    <div className='mb-4'>
                      <label
                        htmlFor='postal code'
                        className='inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80'
                      >
                        Postal code
                      </label>
                      <input
                        type='text'
                        name='postal code'
                        value='437300'
                        className='focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none'
                      />
                    </div>
                  </div>
                </div>
                <hr className='h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent ' />

                <p className='leading-normal uppercase dark:text-white dark:opacity-60 text-sm'>About me</p>
                <div className='flex flex-wrap -mx-3'>
                  <div className='w-full max-w-full px-3 shrink-0 md:w-full md:flex-0'>
                    <div className='mb-4'>
                      <label
                        htmlFor='about me'
                        className='inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80'
                      >
                        About me
                      </label>
                      <input
                        type='text'
                        name='about me'
                        value='A beautiful Dashboard for Bootstrap 5. It is Free and Open Source.'
                        className='focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full max-w-full px-3 mt-6 shrink-0 md:w-4/12 md:flex-0 md:mt-0'>
            <div className='relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border'>
              <img className='w-full rounded-t-2xl' src='../assets/img/bg-profile.jpg' alt='profile cover image' />
              <div className='flex flex-wrap justify-center -mx-3'>
                <div className='w-4/12 max-w-full px-3 flex-0 '>
                  <div className='mb-6 -mt-6 lg:mb-0 lg:-mt-16'>
                    <a href='javascript:;'>
                      <img
                        className='h-auto max-w-full border-2 border-white border-solid rounded-circle'
                        src='../assets/img/team-2.jpg'
                        alt='profile image'
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className='border-black/12.5 rounded-t-2xl p-6 text-center pt-0 pb-6 lg:pt-2 lg:pb-4'>
                <div className='flex justify-between'>
                  <button
                    type='button'
                    className='hidden px-8 py-2 font-bold leading-normal text-center text-white align-middle transition-all ease-in border-0 rounded-lg shadow-md cursor-pointer text-xs bg-cyan-500 lg:block tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85'
                  >
                    Connect
                  </button>
                  <button
                    type='button'
                    className='block px-8 py-2 font-bold leading-normal text-center text-white align-middle transition-all ease-in border-0 rounded-lg shadow-md cursor-pointer text-xs bg-cyan-500 lg:hidden tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85'
                  >
                    <i className='ni ni-collection text-2.8'></i>
                  </button>
                  <button
                    type='button'
                    className='hidden px-8 py-2 font-bold leading-normal text-center text-white align-middle transition-all ease-in border-0 rounded-lg shadow-md cursor-pointer text-xs bg-slate-700 lg:block tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85'
                  >
                    Message
                  </button>
                  <button
                    type='button'
                    className='block px-8 py-2 font-bold leading-normal text-center text-white align-middle transition-all ease-in border-0 rounded-lg shadow-md cursor-pointer text-xs bg-slate-700 lg:hidden tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85'
                  >
                    <i className='ni ni-email-83 text-2.8'></i>
                  </button>
                </div>
              </div>

              <div className='flex-auto p-6 pt-0'>
                <div className='flex flex-wrap -mx-3'>
                  <div className='w-full max-w-full px-3 flex-1-0'>
                    <div className='flex justify-center'>
                      <div className='grid text-center'>
                        <span className='font-bold dark:text-white text-lg'>22</span>
                        <span className='leading-normal dark:text-white text-sm opacity-80'>Friends</span>
                      </div>
                      <div className='grid mx-6 text-center'>
                        <span className='font-bold dark:text-white text-lg'>10</span>
                        <span className='leading-normal dark:text-white text-sm opacity-80'>Photos</span>
                      </div>
                      <div className='grid text-center'>
                        <span className='font-bold dark:text-white text-lg'>89</span>
                        <span className='leading-normal dark:text-white text-sm opacity-80'>Comments</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-6 text-center'>
                  <h5 className='dark:text-white '>
                    Mark Davis
                    <span className='font-light'>, 35</span>
                  </h5>
                  <div className='mb-2 font-semibold leading-relaxed text-base dark:text-white/80 text-slate-700'>
                    <i className='mr-2 dark:text-white ni ni-pin-3'></i>
                    Bucharest, Romania
                  </div>
                  <div className='mt-6 mb-2 font-semibold leading-relaxed text-base dark:text-white/80 text-slate-700'>
                    <i className='mr-2 dark:text-white ni ni-briefcase-24'></i>
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div className='dark:text-white/80'>
                    <i className='mr-2 dark:text-white ni ni-hat-3'></i>
                    University of Computer Science
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className='pt-4'>
          <div className='w-full px-6 mx-auto'>
            <div className='flex flex-wrap items-center -mx-3 lg:justify-between'>
              <div className='w-full max-w-full px-3 mt-0 mb-6 shrink-0 lg:mb-0 lg:w-1/2 lg:flex-none'>
                <div className='leading-normal text-center text-sm text-slate-500 lg:text-left'>
                  ©<script>document.write(new Date().getFullYear() + ",");</script>
                  made with <i className='fa fa-heart'></i> by
                  <a
                    href='https://www.creative-tim.com'
                    className='font-semibold dark:text-white text-slate-700'
                    target='_blank'
                    rel='noreferrer'
                  >
                    Creative Tim
                  </a>
                  for a better web.
                </div>
              </div>
              <div className='w-full max-w-full px-3 mt-0 shrink-0 lg:w-1/2 lg:flex-none'>
                <ul className='flex flex-wrap justify-center pl-0 mb-0 list-none lg:justify-end'>
                  <li className='nav-item'>
                    <a
                      href='https://www.creative-tim.com'
                      className='block px-4 pt-0 pb-1 font-normal transition-colors ease-in-out text-sm text-slate-500'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Creative Tim
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a
                      href='https://www.creative-tim.com/presentation'
                      className='block px-4 pt-0 pb-1 font-normal transition-colors ease-in-out text-sm text-slate-500'
                      target='_blank'
                      rel='noreferrer'
                    >
                      About Us
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a
                      href='https://creative-tim.com/blog'
                      className='block px-4 pt-0 pb-1 font-normal transition-colors ease-in-out text-sm text-slate-500'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Blog
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a
                      href='https://www.creative-tim.com/license'
                      className='block px-4 pt-0 pb-1 pr-0 font-normal transition-colors ease-in-out text-sm text-slate-500'
                      target='_blank'
                      rel='noreferrer'
                    >
                      License
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}

export default Profile
