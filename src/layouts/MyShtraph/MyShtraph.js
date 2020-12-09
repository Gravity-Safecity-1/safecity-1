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
import Loader from '../../components/Loader/Loader';
import ImageShtraf from '../../components/ImageShtraf/ImageShtraf';
import Pagination from '../../components/Pagination/Pagination';

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
	const [state, setState] = useState([]);

	const [load, setLoad] = useState('d-none');
	const [isLoaded, setIsLoaded] = useState('');
	const [currentPage, setCurrentPage] = useState(1)
	const [postsPerPage] = useState(4)

	useEffect(() => {
		api.get(`/customer/${id}?page=1&pagesize=500`)
			.then(res =>{
				let {violations,customer} = res.data,
					yearApiVersion = customer.Birthday,
					bearthDay = yearApiVersion.split("").slice(0,4).join(""),
					nowYear = new Date().getFullYear(),
					bearthDayParse = parseInt(nowYear) - parseInt(bearthDay);

				setItemsArr(violations)
				setState(violations)
				setDriverEl({
					VehiclePlate: customer.VehiclePlate,
					name: customer.Name,
					PhoneNo: customer.PhoneNo,
					Year: bearthDayParse,
					userImage: customer.Image,
				})
				setLoad('');
				setIsLoaded('d-none')
			})
	}, [])
	
	useEffect(() => {
		if(filter === "stopLine"){
			const s = state.filter(item => item.VId === "1345" || item.VId === "1625");
			setItemsArr(s)
		}else if( filter === 'redColor'  ){
			const s = state.filter(item => item.VId === "1302");
			setItemsArr(s)
		}else if(filter === 'line'){
			const s = state.filter(item => item.VId === "1230");
			setItemsArr(s)
		}else if(filter === 'againts'){
			const s = state.filter(item => item.VId === "1301");
			setItemsArr(s)
		}else{
			setItemsArr(state)
		}

		
	}, [filter])

	useEffect(() => {
		if(payment === 'yes'){
			const s = state.filter(item => item.IsPaid === 1);
			setItemsArr(s)
		}else if(payment === 'no'){
			const s = state.filter(item => item.IsPaid === 0);
			setItemsArr(s)
		}else{
			setItemsArr(state)
		}
		
	}, [payment])

	useEffect(() => {
		if(status === 'ver'){
			const s = state.filter(item => item.ProcessStatus == 1);
			setItemsArr(s)
		}else if(status === 'notVer'){
			const s = state.filter(item => item.ProcessStatus > 1);
			setItemsArr(s)
		}else{
			setItemsArr(state)
		}
		console.log(status)
	}, [status])

	
	//auto elements
	const verSh = state.filter(item => item.ProcessStatus === 1).length;
	const onVetSh = state.filter(item => item.ProcessStatus > 1).length;
	const onPaydSH = state.filter(item => item.IsPaid === 1).length;

	//paination
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage; 
	const currentPosts = itemsArr.slice(indexOfFirstPost, indexOfLastPost);
	const pageN = Math.ceil(itemsArr.length/postsPerPage)
	
	// arr user shtraf
	let ItemsEl = currentPosts.map(item =>{
		return(
			<Items onfoto={()=>setImageStye("")} idPer={()=> setIdImg(item.BId)} url={item.VId} nameShtraf={item.VDescription} paymentStatus={item.IsPaid} statuses={item.ProcessStatus} key={item.ID}/>	
		)
	})

	return (
		<>
			<Loader className={isLoaded}/>
			<ImageShtraf idx={id} IDImage={IdImg} ImageShtrafClass={imageStye} onClose={() => setImageStye("d-none")}/>
			<Layout className={load} component={()=>{
				return(
					<div id="MyShtraph" className="col-md-10 my-4">
						<div>
							<div className="row">
								<Auto numberAuto={DriverEl.VehiclePlate} paydStraf={onPaydSH} verShtraf={verSh} onVerShtraf={onVetSh}/>
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
											<table className="table w-100 table-bordered table-striped mt-3 ">
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
											</table>
										</div>
										<div className="shown row d-flex justify-content-between">
											<div className="col-sm-6 col-12 col-lg-3 d-flex align-items-center">
												<p>Показано <span>{ItemsEl.length}</span> из <span>{itemsArr.length}</span></p>
											</div>
											<div className="col-sm-6 mt-sm-0 mt-4 col-12 col-lg-3 justify-content-end d-flex align-items-center">
												<div id="pagination">
													<nav aria-label="...">
													  	<ul className="pagination">
													  	  	<li className="page-item ">
													  	  	  	<button onClick={()=> currentPage > 1 ? setCurrentPage(currentPage-1): setCurrentPage(1)} className="page-link" >◄</button>
													  	  	</li>
													  	  	<Pagination cp={currentPage} paginate={ items => setCurrentPage(items)} postsPerPage={postsPerPage} totalPosts={itemsArr.length}/>
													  	  	<li className="page-item">
													  	  	  	<button onClick={()=> currentPage < pageN ? setCurrentPage(currentPage+1): setCurrentPage(pageN)} className="page-link">►</button>
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

