import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import useScrollToTop from '../../hooks/useScrollToTop';
import useTitle from '../../hooks/useTitle';

export default function ContactUs() {
          useTitle("Contact");
          useScrollToTop();

          const handleContactForm = (e: any) => {
                    e.preventDefault();
                    const name = e.target.name.value;
                    const email = e.target.email.value;

                    Swal.fire(
                              "Thanks for contacting us!!",
                              ` We received your email! ${name}. We knock you soon on your ${email}`,
                              "success"
                    );
                    e.target.reset();
          };
          return (
                    <section>
                              <div className="breadcrumb text-center py-32" style={{
                                        backgroundImage: `url(${require("../../assets/campaigns.jpg")})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat",
                                        height: "400px",
                                        opacity: "0.8"
                              }}>
                                        <div className="container mx-auto px-3 lg:px-0">
                                                  <h2 className="text-3xl text-white font-semibold">Contact Us</h2>
                                                  <div className="text-md breadcrumbs">
                                                            <ul className="justify-center text-white">
                                                                      <li>
                                                                                <Link to="/">Home</Link>
                                                                      </li>
                                                                      <li>Contact Us</li>
                                                            </ul>
                                                  </div>
                                        </div>
                              </div>


                              <div className='container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 my-12 bg-base-100 shadow-xl rounded-xl px-8 py-12 md:p-20'>
                                        <div className="w-full px-2 md:px-8 bg-base-100 mx-auto py-4 order-1 lg:order-0">
                                                  <h1 className='text-center text-3xl'>Leave a message</h1>
                                                  <form
                                                            onSubmit={handleContactForm}
                                                            className="bg-base-100 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0"
                                                  >
                                                            <div className="relative mb-4">
                                                                      <label htmlFor="name" className="leading-7 text-sm">
                                                                                Name
                                                                      </label>
                                                                      <input
                                                                                type="text"
                                                                                id="name"
                                                                                name="name"
                                                                                className="w-full input input-bordered"
                                                                                required
                                                                      />
                                                            </div>
                                                            <div className="relative mb-4">
                                                                      <label htmlFor="email" className="leading-7 text-sm">
                                                                                Email
                                                                      </label>
                                                                      <input
                                                                                type="email"
                                                                                id="email"
                                                                                name="email"
                                                                                className="w-full input input-bordered"
                                                                                required
                                                                      />
                                                            </div>
                                                            <div className="relative mb-4">
                                                                      <label htmlFor="message" className="leading-7 text-sm">
                                                                                Message
                                                                      </label>
                                                                      <textarea
                                                                                id="message"
                                                                                name="message"
                                                                                className="w-full input input-bordered"
                                                                                required
                                                                                style={{ height: "200px", resize: "none" }}
                                                                      ></textarea>
                                                            </div>
                                                            <button className="text-white md:w-1/3 btn btn-primary border-0 py-2 focus:outline-none rounded-full text-lg">
                                                                      Send Message
                                                            </button>
                                                  </form>
                                        </div>
                                        <div className='w-full px-2 md:w-2/3 md:px-8 mx-auto py-4 text-center rounded-none bg-secondary order-0 lg:order-1'>
                                                  <div className='flex flex-col justify-center items-center text-white'>
                                                            <h2 className='text-3xl py-12'>Contact Us</h2>
                                                            <p className='text-lg border-b py-6 w-full'>Sadar, Bogura, Bangladesh</p>

                                                            <p className='text-lg border-b py-6 w-full'>support@oneliferesources.com</p>

                                                            <p className='text-lg border-b py-6 w-full'>+1 234 567 8900</p>
                                                            <span className='flex justify-center items-center mx-auto gap-4 py-4'>
                                                                      <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                                                                      <i className='bx bxl-facebook-circle text-3xl'></i>
                                                                      </a>
                                                                      <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                                                                      <i className='bx bxl-instagram text-3xl' ></i>
                                                                      </a>
                                                                      <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
                                                                      <i className='bx bxl-twitter text-3xl'></i>
                                                                      </a>
                                                            </span>
                                                            <button className='btn btn-primary my-6 text-white'>Get a free quote</button>
                                                  </div>
                                        </div>
                              </div>
                    </section>
          )
}
