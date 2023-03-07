import { useContractRead } from '@thirdweb-dev/react'
import { useContext, useEffect } from 'react'
import { LoadingContext } from '../pages/Context'

// import Loader from './Loader'
import Spinner from './Spinner'

interface WinnerPage { 
	contract:any 
}

const RefundPage = ({ contract } : WinnerPage) => {

	const { setRefundPage } = useContext(LoadingContext)
	
	// ** with this line I ask of thirdweb if transaction was done after calling function: RestartDraw([{}] **) 
	const { data: isRefund, isLoading: refundLoading, error } = useContractRead(contract, "RefundAll")

	if ( error ) {
		console.error("contract call failure", error)
	}

	useEffect(() => {
		if (isRefund) {
			setRefundPage(false)
		} else {
			setRefundPage(true)
		}
	}, [isRefund])

	return (
		<>
			{!isRefund
				? <Spinner size={"h-8 w-8"} />
				: setRefundPage(false)
			}
		</>
	)

}

export default RefundPage
