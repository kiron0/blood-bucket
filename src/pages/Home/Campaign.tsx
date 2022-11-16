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
                    <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4 md:px-10 mb-8 md:mb-16">
                              <div className="bg-base-100 rounded-lg shadow-lg overflow-hidden">
                                        <div className="relative">
                                                  <img src={image} alt="" className="w-full h-64 object-cover" />
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
                                                  <button className='btn bg-base-300 hover:bg-error border-gray-50 hover:border-error hover:text-white px-8 rounded-full mt-8'>Donate Now</button>
                                        </div>
                              </div>
                    </div>
          )
}
