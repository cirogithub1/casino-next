import { useContractRead } from '@thirdweb-dev/react'
import { useContext, useEffect } from 'react'
import { LoadingContext } from '../pages/Context'

// import Loader from './Loader'
import Spinner from './Spinner'

interface WinnerPage { 
	contract:any 
}

const DrawWinnerPage = ({ contract } : WinnerPage) => {

	const {setWinningsPage} = useContext(LoadingContext)
	
	// ** with this line I ask of thirdweb if transaction was done after calling function: RestartDraw([{}] **) 
	const { data: isDrawWinner, isLoading: drawWinnerLoading, error } = useContractRead(contract, "DrawWinnerTicket")

	if ( error ) {
		console.error("contract call failure", error)
		setWinningsPage(false)
	}

	useEffect(() => {
		if (isDrawWinner) {
			setWinningsPage(false)
		} else {
			setWinningsPage(true)
		}
	}, [isDrawWinner])

	return (
		<>
			{!isDrawWinner
				&& <Spinner size={"h-8 w-8"} />
			}
		</>
	)

}

export default DrawWinnerPage
