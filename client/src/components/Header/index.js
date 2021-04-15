import './index.css'

export default function Header(props) {
	
	return (
		<>
			<div id="barra-azul">
				{props.children}
			</div>
		</>
	)
}