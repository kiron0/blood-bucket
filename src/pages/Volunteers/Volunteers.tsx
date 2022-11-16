import React from 'react'
import { Link } from 'react-router-dom'
import useScrollToTop from '../../hooks/useScrollToTop'
import useTitle from '../../hooks/useTitle'
import { volunteersData } from './data'

export default function Volunteers() {
  useTitle('Volunteers')
  useScrollToTop();
  return (
    <section>
      <div className="breadcrumb text-center py-32" style={{
                                        backgroundImage: `url(${require("../../assets/campaigns.jpg")})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat",
                                        height: "400px",
                                        opacity: "0.8"
                              }}>
                                        <div className="container mx-auto px-3 lg:px-0">
                                                  <h2 className="text-3xl text-white font-semibold">Volunteers</h2>
                                                  <div className="text-md breadcrumbs">
                                                            <ul className="justify-center text-white">
                                                                      <li>
                                                                                <Link to="/">Home</Link>
                                                                      </li>
                                                                      <li>Volunteers</li>
                                                            </ul>
                                                  </div>
                                        </div>
                              </div>

                              <div className="container mx-auto px-3 lg:px-0 py-16 md:py-24">
                                        <div className="flex flex-wrap -mx-3">
                                                  {volunteersData.map((volunteer, index) => (
                                                            <div key={index} className="w-full md:w-1/2 lg:w-1/4 px-4 md:px-10 mb-8 md:mb-16">
                                                                      <div className="bg-base-100 rounded-lg shadow-lg overflow-hidden">
                                                                                <div className="relative">
                                                                                          <img src={volunteer.image} alt="" className="w-full h-64 object-cover" />
                                                                                </div>
                                                                                <div className="p-6 text-center">
                                                                                          <h3 className="text-xl font-semibold mb-2">{volunteer.name}</h3>
                                                                                          <p className="text-sm text-error">{volunteer.designation}</p>                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  ))}
                                        </div>
                              </div>
    </section>
  )
}
