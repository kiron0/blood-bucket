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
    </section>
  )
}
