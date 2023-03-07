import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import {Toaster} from "react-hot-toast"

import { LoadingContext } from './Context'
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [restartPage, setRestartPage] = useState(false)
  const [comissionsPage, setComissionsPage] = useState(false)
  const [winningsPage, setWinningsPage] = useState(false)
  const [refundPage, setRefundPage] = useState(false)
  
  
  return (
    <ThirdwebProvider activeChain="mumbai">
      <LoadingContext.Provider value={
        { 
          restartPage, setRestartPage,
          comissionsPage, setComissionsPage, 
          winningsPage, setWinningsPage,
          refundPage, setRefundPage }
      }>

        <Component {...pageProps} />
        <Toaster />
      </LoadingContext.Provider>
    </ThirdwebProvider>
  )
}

export default MyApp
