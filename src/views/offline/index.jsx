import React from 'react'

import Lottie from '_components/lottie'
import LostConnectionLottie from '_assets/lotties/lost-connection-lottie.json'

import styles from './styles.css'

const Offline = () => (
  <main className={styles['offline-container']}>
    <div className={styles['offline-card']}>
      <h1 className={styles.title}>Oh no, something has gone wrong. You are offline!</h1>
      <p>Don&apos;t worry!</p>
      <p>Once your internet connection back, you will be redirect to the page you were at</p>
      <Lottie lottieFile={LostConnectionLottie} height={300} width={300} />
    </div>
  </main>
)

export default Offline
