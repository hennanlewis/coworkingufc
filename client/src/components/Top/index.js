import React from 'react'
import './index.css'
import Brasao from '../../assets/brasao.png'
import SeloContraDengue from '../../assets/selo-ufc-contra-mosquito.gif'

export default function Top() {

	return (
		<div className="top">
			<img src={Brasao} alt=""/>
			<img src={SeloContraDengue} className="seloContraDengue" alt=""/>
		</div>
	)

}