import React, { useState } from 'react'
import RequestForm from './RequestForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../auth/Firebase/Firebase.config';
import { Link } from 'react-router-dom';

type Props = {
          id: number,
          avatar: string,
          name: string,
          location: string,
          bloodType: string,
          contact: string,
          lastDonated: string,
          nextDonated: string,
          description: string,
};
export default function DonorsCard(props: Props) {
          const [user] = useAuthState(auth);
          const [showMore, setShowMore] = useState<Boolean>(false);
          const { id, avatar, name, bloodType, lastDonated, location, description, contact } = props;
          return (
                    <div className="max-w-md py-4 px-8 border-2 rounded-lg my-8 md:my-12" key={id}>
                              <div className="flex justify-center md:justify-end -mt-16">
                                        <div className="avatar">
                                                  <div className="w-24 mb-4 md:mb-0 rounded-full ring ring-error ring-offset-base-100 ring-offset-2">
                                                            <img src={avatar} alt='' />
                                                  </div>
                                        </div>
                              </div>

                              <div>
                                        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">{name}</h2>
                                        <p>{location}</p>
                                        <p className="font-semibold">Blood Group: <span className="badge badge-error text-white">{bloodType}</span></p>
                                        <p className="font-semibold">Last Donated: {lastDonated}</p>
                                        <p className="font-semibold">Next Donated: {lastDonated}</p>
                                        <p className="font-semibold">Contact: {
                                                  user?.uid ? <span className="badge badge-primary text-white">{contact}</span> :
                                                            <Link to='/login' className="badge badge-primary text-white">Login to see</Link>
                                        }</p>
                                        <p className="mt-2 font-semibold text-lg">Donor details: </p>
                                        <p>{
                                                  user?.uid ? <span>
                                                            {
                                                                      description?.length > 100 && !showMore
                                                                                ? description?.slice(0, 100) + "..."
                                                                                : description}{" "}
                                                            {description?.length > 100 && (
                                                                      <span
                                                                                onClick={() => setShowMore(!showMore)}
                                                                                className="text-primary cursor-pointer font-semibold"
                                                                      >
                                                                                {showMore ? "Show Less" : "Show More"}
                                                                      </span>
                                                            )
                                                            }
                                                  </span> :
                                                            <Link to='/login' className="badge badge-primary text-white">Login to see</Link>
                                        }
                                        </p>
                              </div>
                              <div className="flex justify-end mt-4">
                                        {
                                                  user?.uid ? <label htmlFor="bloodRequest" className='btn btn-primary text-white'>
                                                            Blood Request
                                                  </label> : <Link to='/login' className="btn btn-sm btn-primary text-white">Login to request blood</Link>
                                        }
                              </div>
                              <RequestForm />
                    </div>
          )
}
