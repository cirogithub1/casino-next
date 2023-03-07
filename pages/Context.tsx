import React from "react"

export const LoadingContext = React.createContext({
	restartPage: false, 
	setRestartPage: (prev:boolean) => {},

	comissionsPage: false,
	setComissionsPage: (prev:boolean) => {},

	winningsPage: false,
	setWinningsPage: (prev:boolean) => {},

	refundPage: false,
	setRefundPage: (prev:boolean) => {}
	
})


