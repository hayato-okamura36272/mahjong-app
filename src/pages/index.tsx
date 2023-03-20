import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import { useState } from 'react'
import calcurate from './calcurate'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [handArray, setHandArray] = useState([]);
  const [efficiency, setEfficiency] = useState([]);
  const handleSubmit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();

    const inputHand = e.target.hand.value; 
  }

  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <form action="">
          <label htmlFor="">
            手牌:
            <input type="text" name="hand" />
          </label>
          <input type="submit" value="計算" />
        </form>
      </main>
    </>
  )
}
