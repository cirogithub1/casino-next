import { useMetamask } from '@thirdweb-dev/react'

import Footer from './Footer'

const Login = () => {
	const connectMetaMask = useMetamask()

	return (
		<div className="gradient-bg-header min-h-screen 
			flex flex-col items-center justify-center">
			<div className="flex flex-col items-center mb-10 min-h-[85vh]">
				<img 
					className="rounded-full h-56 w-56 mb-10" 
					src="./Big-Win.png"
					alt="Big-Win.png"/>
				
				<h1 className="text-gradient text-white text-6xl font-bold
					mb-2 pb-3">
					Big Win Bingo
				</h1>

				<h2 className="text-white">
					Get started with MetaMask
				</h2>

				<button 
					className="text-white white-glassmorphism font-bold
					mt-2 pt-1 pb-2 px-4 
					hover:bg-[#2952e2]"
					onClick={connectMetaMask}>
					Let's do it...!
				</button>

			</div>

			<Footer />
		</div>
	)
}

export default Login
