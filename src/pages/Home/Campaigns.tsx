import React from 'react'
import { Link } from 'react-router-dom';
import { campaignsData } from '../Campaigns/data'
import Campaign from './Campaign';

const Fade = require('react-reveal/Fade');

export default function Campaigns() {
          return (
                    <section>

                              <div className="title text-center py-8">
                                        <Fade bottom distance="10px">
                                                  <h2 className="font-semibold uppercase text-error">Donate Now</h2>
                                                  <span className='text-xl md:text-3xl font-semibold'>Popular Campaigns</span>
                                        </Fade>
                                        <div className="flex justify-center gap-1 my-2">
                                                  <p className="w-20 h-1 bg-primary"></p>
                                                  <p className="w-5 h-1 bg-primary"></p>
                                                  <p className="w-3 h-1 bg-primary "></p>
                                        </div>
                              </div>
                              <div className="container mx-auto px-5 md:px-0 py-10 md:py-24">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full mb-8 md:mb-16 gap-8">
                                                  {campaignsData.slice(0, 5).map((campaign, index) => (
                                                            <Campaign key={index} {...campaign} />
                                                  ))}
                                        </div>
                              </div>

                              <button className='btn btn-primary text-white flex justify-center items-center mx-auto mb-20 md:-mt-20'>
                                        <Link to='/campaigns'>View All Campaigns</Link>
                              </button>
                    </section>
          )
}
