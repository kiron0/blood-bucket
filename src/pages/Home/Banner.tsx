import React from 'react'
import { Link } from "react-router-dom";
import bannerImg from "../../assets/banner.jpg";

type Props = {};

const Fade = require("react-reveal/Fade");
export default function Banner(props: Props) {
          return (
                    <section
                              className="bg-base-100 body-font py-6 md:py-20"
                              style={{ clipPath: `ellipse(300% 100% at 210.5% 0%)` }}
                    >
                              <div className="hero pb-80 md:pb-40 bg-base-100">
                                        <div className="hero-content flex-col justify-between lg:flex-row-reverse">
                                                  <Fade right distance="20px">
                                                            <div className="w-full lg:w-1/2 rounded overflow-hidden lg:ml-6">
                                                                      <div className="outline-none h-full">
                                                                                <img
                                                                                          src={bannerImg}
                                                                                          className=" md:rounded-lg h-full w-full"
                                                                                          alt=""
                                                                                />
                                                                      </div>
                                                            </div>
                                                  </Fade>
                                                  <Fade left distance="30px">
                                                            <div className="lg:w-1/2 pt-11 lg:pt-0 leading-loose">
                                                                      <span className="text-lg">
                                                                                <strong className="text-primary">Change their life.</strong>
                                                                      </span>
                                                                      <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                                                                                Donate <span className='text-error'>blood</span> to save lives.
                                                                      </h1>
                                                                      <p className="py-6">
                                                                                We found that donors desire to help a family member or a friend in need of blood was the most cited motivator for blood donation in this study followed by a positive attitude of staff at the donor clinic, the desire to help other people, and a reminder to donate when there is a shortage of blood.
                                                                      </p>
                                                                      <Link to="/register" className="btn btn-error text-white">
                                                                                Get Started
                                                                      </Link>
                                                            </div>
                                                  </Fade>
                                        </div>
                              </div>
                    </section>
          )
}
