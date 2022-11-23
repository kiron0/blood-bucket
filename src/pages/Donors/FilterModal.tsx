import React from 'react'
import { BsSearch } from 'react-icons/bs'

export default function FilterModal() {
          return (
                    <section>
                              <input type="checkbox" id="filterModal" className="modal-toggle" />
                              <div className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">
                                                  <h3 className="font-bold text-lg">Advanced Filters</h3>
                                                  <p className="py-4">
                                                            Filter donors by blood group, location, and more.
                                                  </p>
                                                  <div className='filters'>
                                                            <div className="filter-by-name border  rounded p-3 relative mt-10">
                                                                      <div className="filter-by-name-title absolute -top-4 bg-white border rounded p-1">
                                                                                <h3 className="text-xs font-poppins">Filter by Address</h3>
                                                                      </div>
                                                                      <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2">
                                                                                <div className="icon">
                                                                                          <BsSearch />
                                                                                </div>
                                                                                <input
                                                                                          type="text"
                                                                                          className="form-control outline-none pl-4 w-full"
                                                                                          placeholder="Search by Address"
                                                                                />
                                                                      </div>
                                                            </div>
                                                            <div className="filter-by-name border  rounded p-3 relative mt-10">
                                                                      <div className="filter-by-name-title absolute -top-4 bg-white border rounded p-1">
                                                                                <h3 className="text-xs font-poppins">Filter by Blood Type</h3>
                                                                      </div>
                                                                      <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2">
                                                                                <div className="icon">
                                                                                          <BsSearch />
                                                                                </div>
                                                                                <select className="w-full p-4 focus:outline-none rounded-none">
                                                                                          <option disabled selected>Select blood type</option>
                                                                                          <option>A+</option>
                                                                                          <option>A-</option>
                                                                                          <option>B+</option>
                                                                                          <option>B-</option>
                                                                                          <option>O+</option>
                                                                                          <option>O-</option>
                                                                                          <option>AB+</option>
                                                                                          <option>AB-</option>
                                                                                </select>
                                                                      </div>
                                                            </div>
                                                  </div>
                                                  <div className="modal-action">
                                                            <label htmlFor="filterModal" className="btn btn-warning">
                                                                      Cancel
                                                            </label>
                                                            <label htmlFor="filterModal" className="btn btn-primary">
                                                                      Reset Filter
                                                            </label>
                                                  </div>
                                        </div>
                              </div>
                    </section>
          )
}
