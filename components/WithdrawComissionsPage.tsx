import { useContractRead } from '@thirdweb-dev/react'
import { useContext, useEffect } from 'react'
import { LoadingContext } from '../pages/Context'

import Spinner from './Spinner'

interface WithdrawPage { 
	contract:any 
}

const WithdrawComissionsPage = ({ contract } : WithdrawPage) => {

	const {setComissionsPage} = useContext(LoadingContext)
	
	// ** with this line I ask of thirdweb if transaction was done after calling function: WithdrawWinnings([{}] **) 
	const { data: isWithdrawComissions, isLoading:WithdrawComissionsLoading, error } = useContractRead(contract, "WithdrawCommission")

	if ( error ) {
		console.error("contract call failure", error)
	}

	useEffect(() => {
		if (isWithdrawComissions) {
			setComissionsPage(false)
		} else {
			setComissionsPage(true)
		}
	}, [isWithdrawComissions])

	return (
		<>
			{!isWithdrawComissions 
				? <Spinner size={"h-8 w-8"} />
				: setComissionsPage(false)
			}
		</>
	)
}

export default WithdrawComissionsPage
