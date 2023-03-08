
function Spinner({ size }:{ size:string }) {
	return(
		<div className="flex justify-center items-center py-3">
			<div className={`animate-spin rounded-full ${size} border-t-2 border-red-700`}/>
		</div>
	)
}

export default Spinner
