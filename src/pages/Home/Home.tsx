import React from 'react'
import useTitle from '../../hooks/useTitle'
import Footer from '../../shared/Footer/Footer'
import Banner from './Banner'
import BecomeDonor from './BecomeDonor'
import CallToAction from './CallToAction'
import Campaigns from './Campaigns'
import Card from './Card'
import Volunteers from './Volunteers'

export default function Home() {
  useTitle('Home')
  return (
    <section>
      <Banner />
      <Card />
      <Campaigns />
      <Volunteers />
      <CallToAction />
      <BecomeDonor />
      <Footer />
    </section>
  )
}
