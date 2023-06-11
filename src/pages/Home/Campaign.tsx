import React, { useState } from 'react'

type Props = {
          id: number;
          image: string;
          title: string;
          description: string;
};
export default function Campaign(props: Props, index: number) {
          const [showMore, setShowMore] = useState<Boolean>(false);
          const { image, title, description } = props;
          return (
                    <div className="glass rounded-lg" key={index}>
                              <div className="relative">
                                        <img src={image} alt="" className="w-full rounded-t-lg h-64 object-cover" />
                              </div>
                              <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-4">{title}</h3>
                                        <p className="text-sm">{description?.length > 100 && !showMore
                                                  ? description?.slice(0, 100) + "..."
                                                  : description}{" "}
                                                  {description?.length > 100 && (
                                                            <span
                                                                      onClick={() => setShowMore(!showMore)}
                                                                      className="text-primary cursor-pointer font-semibold"
                                                            >
                                                                      {showMore ? "Show Less" : "Show More"}
                                                            </span>
                                                  )}</p>
                                        <button className='btn text-gray-600 bg-base-300 hover:bg-error border-gray-50 hover:border-error hover:text-white px-8 rounded-full mt-8 duration-500'>Donate Now</button>
                              </div>
                    </div>
          )
}
