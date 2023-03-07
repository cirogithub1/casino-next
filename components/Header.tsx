import NavButton from "./NavButton"
import { GiHamburgerMenu } from "react-icons/gi"
import { useAddress, useDisconnect } from "@thirdweb-dev/react"
useAddress

function Header({ address, isLoading }:{ address : any, isLoading : boolean }) {
	// const address = useAddress()
	const disconnect = useDisconnect()

	return (
		<header className="gradient-bg-header grid grid-cols-2 md:grid-cols-5
			justify-between items-center p-5">
			{/* logo */}
			<div className="flex items-center space-x-2">
				<img 
					className="rounded-full h-28 w-28"
					src="./Big-Win.png" 
					alt="" />

					<div>
						<h1 className="text-lg text-white font-bold">
							Lottery
						</h1>

						<p className={`text-xs 
							${address 
							? "text-emerald-500" 
							: "text-red-400"}  truncate`
							}>
								User: {address?.substring(0,5)}...{address?.substring(address?.length - 5)
						}
						</p>
					</div>
			</div>

			{/* Buttont */}
			<div className="hidden md:flex md:col-span-3 items-center 
				justify-center">
				<div className="blue-glassmorphism p-2 space-x-2">
					<NavButton isButtonActive title="Let's Buy tickets"/>

					<NavButton title="Logout" onClick={disconnect}/>
				</div>
			</div>

			{/* burger menu */}
			<div className="flex flex-col ml-auto text-right">
				<GiHamburgerMenu className="h-8 w-8 mx-auto text-white"/>
	
				<span className="text-white md:hidden">
					<NavButton title="Logout" onClick={disconnect} />
				</span>
			</div>

		</header>
	)
}

export default Header
