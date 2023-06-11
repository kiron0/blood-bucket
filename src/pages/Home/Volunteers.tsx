import React from 'react'
import { Link } from 'react-router-dom'
import { volunteersData } from '../Volunteers/data'

const Fade = require('react-reveal/Fade');

export default function Volunteers() {
          return (
                    <section>
                              <div className="title text-center py-8">
                                        <Fade bottom distance="10px">
                                                  <h2 className="font-semibold uppercase text-error">Volunteers</h2>
                                                  <span className='text-xl md:text-3xl font-semibold'>Most Talented Volunteers</span>
                                        </Fade>
                                        <div className="flex justify-center gap-1 my-2">
                                                  <p className="w-20 h-1 bg-primary"></p>
                                                  <p className="w-5 h-1 bg-primary"></p>
                                                  <p className="w-3 h-1 bg-primary "></p>
                                        </div>
                              </div>

                              <div className="container mx-auto px-3 lg:px-0 py-16 md:py-24 w-full">
                                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                  {volunteersData.slice(0, 5).map((volunteer, index) => (
                                                            <div key={index} className="glass rounded-lg">
                                                                      <div className="relative">
                                                                                <img src={volunteer.image} alt={volunteer.name} className="w-full rounded-t-lg h-64 object-cover" />
                                                                      </div>
                                                                      <div className="p-6 text-center">
                                                                                <h3 className="text-xl font-semibold mb-2">{volunteer.name}</h3>
                                                                                <p className="text-sm text-error">{volunteer.designation}</p>                                                                                </div>
                                                            </div>
                                                  ))}
                                        </div>
                              </div>

                              <Link to='/volunteers'>
                                        <button className='btn btn-primary text-white flex justify-center items-center mx-auto mb-20 md:-mt-10'>
                                                  View All Volunteers
                                        </button>
                              </Link>
                    </section>
          )
}
