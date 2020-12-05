import React, {useState, useEffect} from 'react';
import './MyShtraph.css';
import Auto from './Auto/Auto';
import Driver from './Driver/Driver';
import TypeShtraph from './TypeShtraph/TypeShtraph';
import Payment from './Payment/Payment';
import Status from './Status/Status';
import Items from './Items/Items';
import api from '../../api/index';
import Layout from '../../components/Layout/Layout';
import ImageShtraf from '../../components/ImageShtraf/ImageShtraf';

const MyShtraph = ({id}) => {
	const [filter, setFilter] = useState('all');
	const [payment, setPayment] = useState('all');
	const [status, setStatus] = useState('all');
	const [itemsArr, setItemsArr] = useState([]);
	const [DriverEl, setDriverEl] = useState({
		VehiclePlate: null,
		name: null,
		PhoneNo: null,
		userImage: null,
	});
	const [imageStye, setImageStye] = useState("d-none");
	const [IdImg, setIdImg] = useState(null);

	useEffect(() => {
		api.get(`/customer/${id}`)
			.then(res =>{
				let {violations,customer} = res.data;
				let yearApiVersion = customer.Birthday;
				let bearthDay = yearApiVersion.split("").slice(0,4).join("");
				let nowYear = new Date().getFullYear();
				let bearthDayParse = parseInt(nowYear) - parseInt(bearthDay);
				setItemsArr(violations)
				setDriverEl({
					VehiclePlate: customer.VehiclePlate,
					name: customer.Name,
					PhoneNo: customer.PhoneNo,
					Year: bearthDayParse,
					userImage: customer.Image,
				})
			})
	}, [])
	

	let ItemsEl = itemsArr.map(item =>{
		
		return(
			<Items onfoto={()=>setImageStye("")} idPer={()=> setIdImg(item.BId)} url={item.VId} nameShtraf={item.VDescription} paymentStatus={item.IsPaid} statuses={item.ProcessStatus} key={item.ID}/>	
		)
	})
	console.log(IdImg)
	return (
		<>
			<ImageShtraf idx={id} IDImage={IdImg} ImageShtrafClass={imageStye} onClose={()=>setImageStye("d-none")}/>
			<Layout component={()=>{
				return(
					<div id="MyShtraph" className="col-md-10 my-4">
						<div>
							<div className="row">
								<Auto numberAuto={DriverEl.VehiclePlate}/>
								<Driver name={DriverEl.name} userImage={DriverEl.userImage} year={DriverEl.Year} tel={DriverEl.PhoneNo}/>
								<div className="col-12">
									<div id="violetions" className="">
										<div className='row'>
											<div className=" col-12 ">
												<div>
													<h3 className=" mb-1">Тип нарушения</h3>
													<TypeShtraph filter={filter} onFilter={(filter)=>{setFilter(filter)}}/>
												</div>
											</div>
											<div className="mt-4 col-12 ">
												<div>
													<h3 className="mb-1">Оплата</h3>
													<Payment filter={payment} onFilter={(filter)=>{setPayment(filter)}}/>
												</div>
											</div>
											<div className=" mt-4 col-12 mt-4">
												<div>
													<h3 className="mb-1">Статус</h3>
													<Status filter={status} onFilter={(filter)=>{setStatus(filter)}}/>
												</div>
											</div>
										</div>
										<div className="t mt-3">		
											<table className="table w-100 mt-3 table-borderless ">
											  	<thead>
											    	<tr>
											    	  	<th scope="col">ТИП НАРУШЕНИЯ</th>
											    	  	<th scope="col">ОПЛАТА</th>
											    	  	<th scope="col">СТАТУС</th>
											    	  	<th scope="col">ФОТО</th>
											    	</tr>
											  	</thead>
											    <tbody>
											    	{ItemsEl}
											    </tbody>
											    <tfoot>
											    	<tr>
											    	  	<th scope="col">Тип нарушения</th>
											    	  	<th scope="col">Оплата</th>
											    	  	<th scope="col">СТАТУС</th>
											    	  	<th scope="col">ФОТО</th>
											    	</tr>
											    </tfoot>
											</table>
										</div>
										<div className="shown row d-flex justify-content-between">
											<div className="col-sm-6 col-12 col-lg-3 d-flex align-items-center">
												<p>Показано <span>10</span> из <span>86</span></p>
											</div>
											<div className="col-sm-6 mt-sm-0 mt-4 col-12 col-lg-3 d-flex align-items-center">
												<div id="pagination">
													<nav aria-label="...">
													  	<ul className="pagination">
													  	  	<li className="page-item ">
													  	  	  	<a className="page-link" href="#" tabIndex="-1" aria-disabled="false">Предыдущая</a>
													  	  	</li>
													  	  	<li className="page-item active" >
													  	  	  	<a className="page-link" href="#">1</a>
													  	  	</li>
													  	  	<li className="page-item">
													  	  		<a className="page-link" href="#">3</a>
													  	  	</li>
													  	  	<li className="page-item">
													  	  	  	<a className="page-link" href="#">Следыдущая</a>
													  	  	</li>
													  	</ul>
													</nav>
												</div>	
											</div>
										</div>	
									</div>
								</div>
							</div>
						</div>
					</div>
				)
			}}/>		
		</>
	)
}
export default MyShtraph;
// hello