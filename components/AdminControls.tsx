import {
	useContractRead,
  useContractWrite } from '@thirdweb-dev/react'

import { ethers } from 'ethers'

import { useState, useContext } from 'react'
import { BiStar } from "react-icons/bi"
import { FaEthereum } from "react-icons/fa"
import { HiArrowPath } from "react-icons/hi2"
import { HiArrowUturnDown } from "react-icons/hi2"
import { toast } from 'react-hot-toast'

import { currency } from '../currency'

import Loader from './Loader'

import WithdrawComissionsPage from './WithdrawComissionsPage'
import RestartDrawPage from './RestartDrawPage'
import DrawWinnerPage from './DrawWinnerPage'
import RefundPage from './RefundPage'

import { LoadingContext } from '../pages/Context'

const AdminControls = ({ contract, expiration }:{ expiration: any, contract: any }) => {

	// const [comissionsPage, setComissionsPage] = useState(false)
	const {
		restartPage, setRestartPage,
		comissionsPage, setComissionsPage,
		winningsPage,	setWinningsPage,
		refundPage, setRefundPage } = useContext(LoadingContext)

	// totalCommission is a value
	const { data: totalCommission_hex, isLoading: commissionLoading } = useContractRead(contract, "operatorTotalCommission")

	// when the BigNumber is '0x00' formatUnits shows an error
	let totalCommission_hex_Checked = ethers.utils.parseUnits("0.0", 18)
	if (totalCommission_hex) {
		// console.log("totalCommission_hex = ", totalCommission_hex)
		totalCommission_hex_Checked = totalCommission_hex
	}
	const totalCommission = ethers.utils.formatUnits(totalCommission_hex_Checked)

	// DrawWinnerTicket is a function
	const { mutate: DrawWinnerTicket, isLoading: drawWinnerLoading } = useContractWrite(contract, 'DrawWinnerTicket')
	
	// WithdrawCommission is a function
	const { mutate: WithdrawCommission, isLoading: drawCommissionLoading } = useContractWrite(contract, 'WithdrawCommission')

	// RefunAll is a function
	// const { mutate: RestartDraw, isLoading:restartLoading } = useContractWrite(contract, 'restartDraw')

	// RefunAll is a function
	const { mutate: RefundAll, isLoading:efundLoading } = useContractWrite(contract, 'RefundAll')

	const onDrawWinner = async () => {
		
		setWinningsPage(true)
	}

	const onWithdrawCommission= async () => {

		setComissionsPage(true)
	}

	const onRestart= async () => {

		setRestartPage(true)
	}

	const onRefundAll= async () => {
		setRefundPage(true)
	}

	return (
			<div className='admin-controls flex justify-center'>
				<div className='white-glassmorphism-noBorder text-white text-center px-5 py-3'>
					<h2 className='font-bold'>Admin Controls</h2>
					<div>
						Total Commision:{" "} 
						{commissionLoading 
						? <> 
								<Loader screen={"h-max"} size={"h-8 w-8"} title={""}/>
							</> 
						: <>
								{totalCommission 
								? <>
										{Number(totalCommission)}{" "}{currency}
									</>
								: ""
								}
							</>
						}
					</div>

					<div className='flex flex-col space-y-2
						md:flex-row md:space-y-0 md:space-x-2'>

						<button 
							className='admin-button'
							onClick={onDrawWinner}>
								{winningsPage
								? <DrawWinnerPage contract={contract}/>
								: <>
										<BiStar 
											className='h-6 mx-auto mb-2'
											size={24}/>
										Draw Winner
									</>
								}
						</button>

						<button 
							className='admin-button'
							onClick={onWithdrawCommission}>
								{comissionsPage
									? <WithdrawComissionsPage contract={contract}/>
									: <>
											<FaEthereum 
												className='h-6 mx-auto mb-2'
												size={24}/>
												Withdraw Comission
										</>
								}
						</button>

						<button 
							className='admin-button'
							onClick={onRestart}>
								{restartPage
									? <RestartDrawPage contract={contract} />
									: <>
											<HiArrowPath 
												className='h-6 mx-auto mb-2'
												size={24}/>
												Restart Draw 	
										</>							
								}
						</button>
					
						<button 
							className='admin-button'
							onClick={onRefundAll}>
								{refundPage
									? <RefundPage contract={contract}/>
									: <>
											<HiArrowUturnDown 
												className='h-6 mx-auto mb-2'
												size={24}/>
											Return Founds
										</>
								}
						</button>
					</div>

				</div>
			</div>
	)
}

export default AdminControls
