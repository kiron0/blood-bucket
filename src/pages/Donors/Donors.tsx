import React from 'react'
import { RiEqualizerLine } from 'react-icons/ri';
import { Link } from 'react-router-dom'
import useScrollToTop from '../../hooks/useScrollToTop'
import useTitle from '../../hooks/useTitle';
import FilterModal from './FilterModal';
import { donorsData } from './Data';
import DonorsCard from './DonorsCard';

export default function Donors() {
          useScrollToTop();
          useTitle("Find a Donor");
          return (
                    <section>
                              <div className="breadcrumb text-center py-32 flex flex-col items-center justify-center mx-auto" style={{
                                        backgroundImage: `url(${require("../../assets/campaigns.jpg")})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat",
                                        height: "400px",
                                        opacity: "0.8"
                              }}>
                                        <div className="container mx-auto px-3 lg:px-0">
                                                  <h2 className="text-3xl text-white font-semibold">Find a donor</h2>
                                                  <div className="text-md breadcrumbs">
                                                            <ul className="justify-center text-white">
                                                                      <li>
                                                                                <Link to="/">Home</Link>
                                                                      </li>
                                                                      <li>Find a donor</li>
                                                            </ul>
                                                  </div>
                                        </div>

                                        <div className='mt-10 flex justify-center items-center gap-2 md:gap-4'>
                                                  <div className="form-control">
                                                            <div className="input-group">
                                                                      <input type="text" placeholder="Find a donor…" className="input input-bordered" />
                                                                      <button className="btn btn-square text-white">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                                                      </button>
                                                            </div>
                                                  </div>

                                                  <div className='btn'>
                                                            <span className='tooltip' data-tip="Advanced filters">
                                                                      <label htmlFor="filterModal">
                                                                                <RiEqualizerLine className='text-white cursor-pointer text-lg' />
                                                                      </label>
                                                            </span>
                                                  </div>
                                        </div>
                              </div>

                              <div className="container mx-auto px-5 md:px-0 py-10 md:py-24">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full mb-8 md:mb-16 gap-8">
                                                  {donorsData.map((donor) => (
                                                            <DonorsCard {...donor} />
                                                  ))}
                                        </div>
                              </div>

                              <FilterModal />
                    </section>
          )
}
