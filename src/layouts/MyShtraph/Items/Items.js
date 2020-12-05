import React from 'react';
import './Items.css';
import {Link} from "react-router-dom"

export default function Items({url,nameShtraf,paymentStatus,statuses, onfoto,idPer}) {
	let r = (s)=>{
		switch(s){ 
				case "1625": return "images/type-shtraf/straf-2.png";
				case "1302": return "images/type-shtraf/straf-2.png";
				case "1230": return "images/type-shtraf/straf-3.png";
				case "1301": return "images/type-shtraf/straf-4.png";
				case "1345": return "images/type-shtraf/straf-1.png";
				default: return null
			}
		}
	return (
		<tr id="ItemsShtaf">
			<td>
				<div className="d-flex align-items-center">
					<div className="mr-2">
						<img 
							src={r(url)} 
						alt=""/>
					</div>
					<span>{nameShtraf}</span>
				</div>
			</td>
			<td>
				<p>{paymentStatus === 0? 'Нет': "Да"}</p>
			</td>
			<td>
				<p>{statuses === 0? "В процессе": "Поддтверждён"}</p>
			</td>
			<td>
				<button onClick={idPer}  className="btn m-auto d-block text-center">
					<svg onClick={onfoto} width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="9.891" cy="9.00692" r="3.13636" stroke="#005395"/>
						<path d="M0.5 4.36364C0.5 3.83645 0.927364 3.40909 1.45455 3.40909H4.23323C4.80912 3.40909 5.3557 3.15512 5.72708 2.71498L7.30994 0.838987C7.49131 0.624031 7.75824 0.5 8.03949 0.5H9.81818H11.5969C11.8781 0.5 12.1451 0.624031 12.3264 0.838987L13.9093 2.71498C14.2807 3.15512 14.8272 3.40909 15.4031 3.40909H18.1818C18.709 3.40909 19.1364 3.83646 19.1364 4.36364V14.5455C19.1364 15.0726 18.709 15.5 18.1818 15.5H1.45455C0.927365 15.5 0.5 15.0726 0.5 14.5455V4.36364Z" stroke="#005395"/>
					</svg>
				</button>
			</td>
		</tr>
	)
}