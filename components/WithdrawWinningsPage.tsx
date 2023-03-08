import { useContractRead } from '@thirdweb-dev/react'
import { useEffect } from 'react'

import Loader from './Loader'
import Spinner from './Spinner'

interface WithdrawPage { 
	contract:any,
	setWinningsPage:any 
}

const WithdrawWinningsPage = ({ contract, setWinningsPage } : WithdrawPage) => {
	
	// ** with this line I ask of thirdweb if transaction was done after calling function: WithdrawWinnings([{}] **) 
	const { data: isWithdrawWinnings, isLoading:WithdrawWinningsLoading, error } = useContractRead(contract, "WithdrawWinnings")

	if ( error ) {
		console.error("contract call failure", error)
	}

	useEffect(() => {
		if (isWithdrawWinnings) {
			setWinningsPage(false)
		} else {
			setWinningsPage(true)
		}
	}, [isWithdrawWinnings])

	return (
		<>
			{!isWithdrawWinnings
				&& <Spinner size={"h-10 w-10"} />
			}
		</>
	)
}

export default WithdrawWinningsPage
