import Countdown from "react-countdown"

type Props = {
	hours:number,
	minutes:number,
	seconds:number,
	completed:boolean
}

const CountdownTimer = ({ expiration }:{ expiration: any }) => {

	function renderer({hours, minutes, seconds,	completed }: Props) {
		
		return(
			<div>
				{completed 
				? <h2 className="text-red-500 text-xl text-center 
						font-bold animate-bounce">
						Ticket Sales CLOSED
					</h2>
				: <h2 className="text-white text-center text-xl mb-2 
						font-bold italic">
						Time Remaining
					</h2>}
				
				<div className="flex space-x-6">
					<div className="flex-1">
						<div className="countdown">
							<h1 className="animate-pulse">
								{minutes}
							</h1>
						</div>
						<div className="countdown-label">minutes</div>
					</div>
					
					<div className="flex-1">
						<div className="countdown">
							<h1 className="animate-pulse">
								{seconds}
							</h1>
						</div>
						<div className="countdown-label">seconds</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="mt">
			<Countdown date={new Date(expiration * 1000)} renderer={renderer}/>
		</div>
	)
}

export default CountdownTimer
