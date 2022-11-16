import React from 'react'
import { Link } from 'react-router-dom'
import useScrollToTop from '../../hooks/useScrollToTop';
import useTitle from '../../hooks/useTitle'
import Campaign from './Campaign';
import { campaignsData } from './data'

export default function Campaigns() {
          useTitle('Campaigns');
          useScrollToTop();
          return (
                    <section>
                              <div className="breadcrumb text-center py-32" style={{
                                        backgroundImage: `url(${require("../../assets/campaigns.jpg")})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat",
                                        height: "400px",
                                        opacity: "0.8"
                              }}>
                                        <div className="container mx-auto px-3 lg:px-0">
                                                  <h2 className="text-3xl text-white font-semibold">Campaigns</h2>
                                                  <div className="text-md breadcrumbs">
                                                            <ul className="justify-center text-white">
                                                                      <li>
                                                                                <Link to="/">Home</Link>
                                                                      </li>
                                                                      <li>Campaigns</li>
                                                            </ul>
                                                  </div>
                                        </div>
                              </div>

                              <div className="container mx-auto px-3 lg:px-0 py-16 md:py-24">
                                        <div className="flex flex-wrap -mx-3">
                                                  {campaignsData.map((campaign, index) => (
                                                            <Campaign key={index} {...campaign} />
                                                  ))}
                                        </div>
                              </div>


                    </section>
          )
}
