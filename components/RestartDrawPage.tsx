import { useContractRead } from '@thirdweb-dev/react'
import { useContext, useEffect } from 'react'
import { LoadingContext } from '../pages/Context'

// import Loader from './Loader'
import Spinner from './Spinner'

interface RestartPage { 
	contract:any 
}

const RestartDrawPage = ({ contract } : RestartPage) => {

	const {setRestartPage} = useContext(LoadingContext)
	
	// ** with this line I ask of thirdweb if transaction was done after calling function: RestartDraw([{}] **) 
	const { data: isRestartDraw, isLoading: restartDrawLoading, error } = useContractRead(contract, "restartDraw")

	if ( error ) {
		console.error("contract call failure", error)
	}
	
	useEffect(() => {
		if (isRestartDraw) {
			setRestartPage(false)
		} else {
			setRestartPage(true)
		}
	}, [isRestartDraw])
	
	return (
		<>
			{!isRestartDraw
				&& <Spinner size={"h-8 w-8"} /> 
			}
		</>
	)

}

export default RestartDrawPage
