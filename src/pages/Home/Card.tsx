import React from 'react'
import useScrollToTop from '../../hooks/useScrollToTop'
// import css modules
import styles from './Card.module.css'

export default function Card() {
  useScrollToTop();
  return (
          <div className="mt-[-18rem] lg:mt-[-10rem] mb-[7rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto px-4 lg:px-32">
            <div className={styles.banner_item}>
              <div className={styles.banner_item__img}>
                <img
                  src="https://media.istockphoto.com/photos/blood-donation-beautiful-girl-in-the-clinic-picture-id471394055?k=20&m=471394055&s=170667a&w=0&h=Ek2-a2Riu3jmvBMzotJpBA7Wmji4Kj8oy-Z7ll_dS2g="
                  alt=""
                />
              </div>
            </div>
            <div className={styles.banner_item}>
              <div className={styles.banner_item__img}>
                <img
                  src="https://cdn2.hubspot.net/hubfs/2027031/Lanermc_January2018/Images/D53297C6-155D-D235-07048C3BAF7898A0.jpeg"
                  alt=""
                />
              </div>
            </div>
            <div className={styles.banner_item}>
              <div className={styles.banner_item__img}>
                <img
                  src="https://media.istockphoto.com/id/1266746907/photo/patient-donating-blood-at-hospital.jpg?b=1&s=170667a&w=0&k=20&c=8JoYctGYkQqWJZhABAziNEiqUh5J-aYU4Acye3lnqIc="
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
  )
}
