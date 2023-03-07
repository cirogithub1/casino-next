import Marquee from "react-fast-marquee"
import { currency } from '../currency'

const FastMarkee = ({ lastWinner_Str, lastWinnerAmount_Str }: {lastWinner_Str:string, lastWinnerAmount_Str:string} ) => {
	return (
		<Marquee 
			className="flex blue-glassmorphism-noBorder p-4 mb-3"
			gradient={false}
			speed={104} >
			<div className="markee text-emerald-500 font-semibold italic">
					<h4>
						{"    "}Last Winner= {lastWinner_Str.substring(0, 5)}...{lastWinner_Str.substring(lastWinner_Str.length - 5)}{"        ***        "}
						Previous winnings= {lastWinnerAmount_Str} {currency}
					</h4>
				</div>
		</Marquee>
	)
}

export default FastMarkee
