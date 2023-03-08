import { useContractWrite } from '@thirdweb-dev/react'
import { useEffect } from 'react'

import Waiting from './Waiting'

interface TicketsPage { 
	contract: any,
	setTicketsPage: any,
	buyTickets_str: any,
	userTickets: any 
}

const TicketsPage = ({ contract, setTicketsPage, buyTickets_str, userTickets } : TicketsPage) => {
	// console.log('components/TicketsPage.tsx buyTickets_str =', buyTickets_str)
	
	// ** with this line I ask of thirdweb if transaction was done after calling function: WithdrawWinnings([{}] **) 
	// const { mutateAsync: isBuyingTickets, isLoading: ticketsPageLoading, error } = useContractRead(contract, "BuyTickets", buyTickets_str)

	// const { mutateAsync: BuyTickets, isLoading:buyLoading, error } = useContractWrite(contract, 'BuyTickets')

	// if (error) {
	// 	console.error("contract call failure", error)
	// }

	// // try {
	// BuyTickets([buyTickets_str])
		
	// } catch (err) {
	// 	console.error("contract call failed", err)
	// }

	useEffect(() => {
		if (!userTickets) {
			setTicketsPage(true)
		} else {
			setTicketsPage(false)
		}
	}, [userTickets])

	return (
		<>
			{!userTickets
				&& <Waiting size={"h-10 w-10"} />
			}
		</>
	)
}

export default TicketsPage
