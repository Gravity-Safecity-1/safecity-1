import React from 'react';
import './Items.css';
import {Link} from 'react-router-dom';

export default function Items({ids,sendsName,sends,sendsSms,url,name,soName,tel,numberAuto,threeDay,week,month,threeMonth,allTime,ops}) {
	return (
		<tr id="Items" className="py-2 ">
		    <td>
		    	<div className="d-flex align-items-center">
		    		<div>
		    			<img src={url} alt=""/>
		    		</div>
		    		<div className="ml-3">
		    			<h6>{name} {soName}</h6>
		    			<p>+992 {tel}</p>
		    		</div>
		    	</div>
		    </td>
		    <td>
		    	<p>{numberAuto}</p>
		    </td>
		    <td>
		    	<p>{threeDay}</p>
		    </td>
		    <td>
		    	<p>{week}</p>
		    </td>
		    <td>
		    	<p>{month}</p>
		    </td>
		    <td>
		    	<p>{threeMonth}</p>
		    </td>
		    <td>
		    	<p>{allTime}</p>
		    </td>
		    <td>
		    	<div className="d-flex mt-0 justify-content-center">
			    	<p className="custom-control custom-switch">
						<input name={sendsName} onChange={sendsSms} checked={sends} type="checkbox" className="custom-control-input" id={ops} />
						<label className="custom-control-label" htmlFor={ops}></label>
					</p>
				</div>
		    </td>
		    <td>
		    	<Link to={`/my-shtraf/${ids}`}>
			    	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#005395" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M17.5 17.5L13.875 13.875" stroke="#005395" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</Link>
		    </td>
		</tr>
	)
}