
interface Props {
	title: string,
	isButtonActive?: boolean,
	onClick?: () => void
}
function NavButton({ title, isButtonActive, onClick }:Props) {
	
	return (
		<button 
			className={`text-white ${isButtonActive ? "button-glassmorphism" : "white-glassmorphism"}
			hover:bg-[#2952e2] pt-2 pb-3 px-4 font-bold`}
			onClick={onClick}>
				{title}
		</button>
	)
}

export default NavButton
