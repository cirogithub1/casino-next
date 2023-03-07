import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import { 
  useAddress, 
  useContract, 
  useContractRead, 
  useContractWrite } from '@thirdweb-dev/react'

import { useState } from 'react'
import { ethers } from 'ethers'

import { toast } from 'react-hot-toast'

import Login from '../components/Login'
import Loader from '../components/Loader'
import { currency } from '../currency'
import CountdownTimer from '../components/CountdownTimer'
import Footer from '../components/Footer'
import FastMarkee from '../components/FastMarkee'
import AdminControls from '../components/AdminControls'
import WithdrawWinningsPage from '../components/WithdrawWinningsPage'

const Home: NextPage = () => {
  const [winningsPage, setWinningsPage] = useState(false)
  
  const address = useAddress()

  const [ticketsQty, setTicketsQty] = useState(1)

  // from https://portal.thirdweb.com/react :
  const { data: contract, isLoading: contractLoading, error } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS)
  // console.log("pages/index.tsx contract= ", contract)

  if (error) {
    toast.error("Contract not Found..!")
    console.error("contract call failed", error)
  }

  const { data: remainingTickets, isLoading:remainLoading } = useContractRead(contract, "RemainingTickets")
  // console.log("pages/index.tsx isLoading= ", isLoading, "remainingTickets =", remainingTickets)

  const { data: currentReward_hex, isLoading:rewardLoading } = useContractRead(contract, "CurrentWinningReward")

  const { data: ticketPrice_hex, isLoading:priceLoading } = useContractRead(contract, "ticketPrice")
  // console.log("pages/index.tsx ticketPrice= ", ticketPrice._hex)

  const { data: ticketCommission_hex, isLoading:commissionLoading } = useContractRead(contract, "ticketCommission")

  const { data: expiration, isLoading:expirationLoading } = useContractRead(contract, "expiration")

  const {data: lastWinner, isLoading:lastWinnerLoading} = useContractRead(contract, "lastWinner")

  const {data: lastWinnerAmount, isLoading:lastAmountLoading} = useContractRead(contract, "lastWinnerAmount")

  const { data: ticketsArray, isLoading:userTicketsLoading } = useContractRead(contract, "getTickets")
  // console.log("userTickets =", userTickets)
  
  const { data: winnings_hex, isLoading:winningsLoading } = useContractRead(contract, "getWinningsForAddress", address)

  const { data: lotteryOperator, isLoading:operatorLoading } = useContractRead(contract, "lotteryOperator")

  // BuyTickets is a function
  const { mutate: BuyTickets, isLoading:buyLoading } = useContractWrite(contract, 'BuyTickets')

  // WithdrawWinnings is a function
  const { mutate: WithdrawWinnings, isLoading:wdwLoading } = useContractWrite(contract, 'WithdrawWinnings')
  
  if (contractLoading || remainLoading || rewardLoading || priceLoading || commissionLoading || expirationLoading || winningsLoading || lastWinnerLoading || lastAmountLoading || operatorLoading) return (
    
    <Loader screen={"h-screen"} size={"h-32 w-32"} title={"Loading Casino ..."}/>
    
  )

  const currentReward = ethers.utils.formatUnits(currentReward_hex)
  // console.log("currentReward =",currentReward, "currentReward_hex", currentReward_hex)

  const ticketPrice = ethers.utils.formatUnits(ticketPrice_hex)
  
  const ticketCommission = ethers.utils.formatUnits(ticketCommission_hex)
  
  // when the BigNumber is '0x00' formatUnits shows an error
  let winnings_hex_Checked = ethers.utils.parseUnits("0.0", 18)
  if (winnings_hex) {
    // console.log("winnings_hex = ", winnings_hex)
    winnings_hex_Checked = winnings_hex
  }
  const winnings = ethers.utils.formatUnits(winnings_hex_Checked)

  const lastWinner_Str = lastWinner.toString()

  const lastWinnerAmount_Str = ethers.utils.formatUnits(lastWinnerAmount)

  let userTickets = 0
  if (ticketsArray.length !== 0) {
    const totalUserTickets = ticketsArray.reduce(
      (total:number, ticketAddress:string) => (
        ticketAddress === address ? total + 1 : total
      ), 0
    )

    userTickets = totalUserTickets
  }
  
  if (!address) return <Login />

  const handlerClick = async () => {
    const toastMessage = toast.loading("Buying your Tickets")

    // console.log("ticketPrice =", typeof Number(ticketPrice), "value =", ticketPrice)
    // console.log("BigNumber =", ethers.utils.parseEther((Number(ticketPrice) * ticketsQty).toString()))

    try {
      BuyTickets([
        { 
          value: ethers.utils.parseEther(
            (Number(ticketPrice) * ticketsQty).toString())
        }
      ])

      toast.success("Tickets purchased succesfully", {id: toastMessage})
      
    } catch (err) {
      toast.error("Something was wrong!")
      console.error("contract call failed", err)
    }
  }

  const onWithdrawWinnings = async () => {
    setWinningsPage(true)
  }

  return (
    <div className="gradient-bg-main min-h-screen flex flex-col">
      <div className='min-h-[90vh]'>

      <Head>
        <title>WinBingo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header address={address} isLoading={remainLoading}/>

      <FastMarkee lastWinner_Str={lastWinner_Str} lastWinnerAmount_Str={lastWinnerAmount_Str}/>
      
      {Number(winnings) !== 0
        ? (
            <div 
              className='w-[40rem} md:max-w-2xl lg:max-w-4xl
              mx-auto mt-5'>
              
                <button 
                  className='eth-card p-4 rounded-md w-full px-10'
                  onClick={onWithdrawWinnings}>
                    {winningsPage
                    ? 
                      <WithdrawWinningsPage contract={contract} setWinningsPage={setWinningsPage} />
                    : <>
                        <p className='font-bold animate-ping'>
                            Winner Winner
                        </p> 
                      
                        <p className='pt-4'>
                          Total Winnings: {winnings}{" "}{currency}
                        </p>
                      
                        <br />
                      
                        <p className="font-semibold">
                          Click to Withdraw
                        </p>
                      </>
                    }
                </button>
              
            </div>
          )
        : ""
      }

      {lotteryOperator === address 
      ? <AdminControls contract={contract} expiration={expiration}/>
      : ""
      }

      {/* Statics box */}
      <div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row
        items-start justify-center md:space-x-5 ">
        {/* Next draw */}
        <div className="stats-container md:w-[26rem] sm:w-full">
          <h1 className="text-5xl text-white font-semibold 
            text-center text-gradient">
            Next Draw
          </h1>
        
          <div className="flex justify-between p-2 space-x-2">
            <div className="stats text-white">
              <h2 className='text-sm'>Total Pool</h2>
              <p className='text-xl'>{currentReward} {currency}</p> 
            </div>

            <div className="stats text-white">
              <h2 className='text-sm'>Tickets remaining</h2>
              <p className='text-xl'>{remainingTickets.toNumber()}</p> 
            </div>
          </div>
          
          <div className='mt-5 mb-3'>
            <CountdownTimer expiration={expiration}/>
          </div>
        </div>

        {/* Buy Tickets box */}
        <div className="stats-container space-y-2">
          <div className="stats-container min-w-[20rem] sm:w-full">
            <div className='flex justify-between items-center
             text-white pb-2'>
              <h2 className='text-sm'>Ticket price</h2>
              <p className='text-md'>{ticketPrice} {currency}</p>
            </div>

            {/* Input box */}
            <div className="flex text-white items-center 
              space-x-2 blue-glassmorphism-noBorder border px-4">
              <p>Tickets</p>
              <input 
                className='text-md my-2 w-full rounded-sm p-2 
                  bg-transparent text-white text-right
                  border-none outline-none' 
                type="number" 
                min={1}
                max={100}
                value={ticketsQty}
                onChange={(e) => {
                  if (((Number(e.target.value) % 13) === 0) 
                    || ((Number(e.target.value) % 9) === 0) 
                    || ((Number(e.target.value) % 18) === 0)) {
                      if (Number(e.target.value) > ticketsQty) {
                        setTicketsQty(Number(e.target.value) + 1)
                      } else {
                        setTicketsQty(Number(e.target.value) - 1)
                      }
                      } else {
                        setTicketsQty(Number(e.target.value)) 
                      }
                }}
                />
            </div>
            {/* Total cost */}
            <div className="space-y-2 mt-4">
              <div className="flex items-center justify-between
              text-emerald-500 text-sm italic font-extrabold">
                <p>Total cost</p>
                <p>{(+ticketPrice) * ticketsQty} {currency}</p>
              </div>
            </div>
            {/* Services fees */}
            <div className="flex items-center justify-between
              text-emerald-500 text-xs italic">
              <p>Services fees</p>
              <p>{ticketCommission} {currency}</p>
            </div>
            {/* Blockchain fees */}
            <div className="flex items-center justify-between
              text-emerald-500 text-xs italic">
              <p>Blockchain fees</p>
              <p>TBC</p>
            </div>
            {/* Buy Tickets button */}
            <button 
              className={`${(expiration.toString() > Date.now().toString() && remainingTickets.toNumber() !== 0) ? "eth-card" : "eth-card-disabled cursor-not-allowed"} 
              w-full px-10 py-4 rounded-md mt-5 font-semibold
              text-white shadow-xl`}
              onClick={handlerClick}>
              Buy {ticketsQty} Ticket{ticketsQty > 1 && "s"}
            </button>
          </div>
          
          {userTickets 
            ? (
              <div className="stats">
                <p className='text-lg mb-2'>
                  You have {userTickets} ticket{userTickets > 0 ? "s" : ""}
                </p>

                <div className='flex max-w-sm flex-wrap gap-2'>
                  {Array(userTickets)
                    .fill("")
                    .map((_, index) => (
                      <p 
                        key={index}
                        className='text-emerald-500 h-20 w-12 bg-emerald-500/30 
                        rounded-lg flex flex-shrink-0 items-center justify-center
                        text-xs italic'>
                          {index + 1}
                      </p>
                    ))
                  }
                </div>
              </div>
              )
            : ""
          }
        </div>

      </div>
      </div>

      <Footer /> 
    </div>
  )
}

export default Home
