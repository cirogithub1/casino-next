import Spinner from "./Spinner"

export default function Loader({ screen, size, title }:{ screen:string, size:string, title:string }) {
	return(
		<div className={`gradient-bg-header ${screen} flex flex-col
      items-center justify-center`}>
      <Spinner size={size} />
      {title 
      ?
        <h1 className="text-gradient text-white font-bold mt-2 text-lg">
          {title}
        </h1>
      : 
        ""
      }
    </div>
	)
}
