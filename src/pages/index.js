import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/issues');
  const data = await res.json();

  return {
    props: {
      data,
    },
  }
}

export default function Home({ data}) {
  console.log(JSON.stringify(data))
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Daily Issues
        </h1>
         <p>{data.name }</p>
        <p>{data.author}</p>
        <p>{data.label.join(', ')}</p>
        <p> <a> {data.url} </a></p>
        {/* <p>{data.state.join(', ')}</p> */}


      </main>
    </>
  )
}
