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


const initialState = {
	filter: "all",
	payment: "all",
	status: "all",
	itemsArr: [],
	DriverEl: {
		VehiclePlate: null,
		name: null,
		PhoneNo: null,
		userImage: null,
	},
	imageStye: 'd-none',
	IdImg: null,
	itemsArr2: [],
	loading: true,
	currentPage: 1,
	postsPerPage: 10
}

const MyShtraph = ({id}) => {
	const [state, setState] = useState(initialState);

	const { filter, payment, status, itemsArr, DriverEl, imageStye, IdImg, itemsArr2, loading, currentPage, postsPerPage } = state;

	useEffect(() => {
		function getItems(){
			api.get(`/customer/${id}?page=1&pagesize=500`)
				.then(res =>{
					let {violations,customer} = res.data,
						yearApiVersion = customer.Birthday,
						bearthDay = yearApiVersion.split("").slice(0,4).join(""),
						nowYear = new Date().getFullYear(),
						bearthDayParse = parseInt(nowYear) - parseInt(bearthDay);

					setState({
						...state, 
						itemsArr: violations, 
						itemsArr2: violations,
						DriverEl:{
							VehiclePlate: customer.VehiclePlate,
							name: customer.Name,
							PhoneNo: customer.PhoneNo,
							Year: bearthDayParse,
							userImage: customer.Image,
						},
						loading: false
					});
					
				});
		};
		getItems();
		return()=>{ setState(state) }
	}, []);
	
	useEffect(() => {
		let s = null;
		if(filter === "stopLine"){
			s = itemsArr2.filter(item => item.VId === "1345" || item.VId === "1625");
		}else if( filter === 'redColor'  ){
			s = itemsArr2.filter(item => item.VId === "1302");
		}else if(filter === 'line'){
			s = itemsArr2.filter(item => item.VId === "1230");
		}else if(filter === 'againts'){
			s = itemsArr2.filter(item => item.VId === "1301");
		}else{
			s = itemsArr2
		}
		setState( prevState => ({...prevState, itemsArr: s}) )
	}, [filter]);

	useEffect(() => {
		let s = null;
		if(payment === 'yes'){
			s = itemsArr2.filter(item => item.IsPaid === 1);
		}else if(payment === 'no'){
			s = itemsArr2.filter(item => item.IsPaid === 0);
		}else{
			s = itemsArr2
		}
		setState(prevState => ({...prevState, itemsArr:s }) )
		
	}, [payment]);

	useEffect(() => {
		let s = null;
		if(status === 'ver'){
			s = itemsArr2.filter(item => item.ProcessStatus == 1);
		}else if(status === 'notVer'){
			s = itemsArr2.filter(item => item.ProcessStatus > 1);
		}else{
			s = itemsArr2;
		}
		setState(prevState => ({...prevState, itemsArr: s}) )

	}, [status])

	
	//auto elements
	const verSh = itemsArr2.filter(item => item.ProcessStatus === 1).length;
	const onVetSh = itemsArr2.filter(item => item.ProcessStatus > 1).length;
	const onPaydSH = itemsArr2.filter(item => item.IsPaid === 1).length;

	//paination
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage; 
	const currentPosts = itemsArr.slice(indexOfFirstPost, indexOfLastPost);
	const pageN = Math.ceil(itemsArr.length/postsPerPage);
	
	// arr user shtraf
	let ItemsEl = currentPosts.map(item =>{
		return(
			<Items onfoto={()=>setState({...state, imageStye:" ",})} idPer={()=> setState({...state, IdImg: item.BId})} violation={item} noData={false} key={item.ID}/>
		)
	})
	if(currentPosts.length <= 0){
		ItemsEl = <Items noData={true}/>
	}

	return (
		<> 
			{
				loading ? (
					<Loader/>
				) : (  
					<>
						<ImageShtraf idx={id} IDImage={Number(IdImg)} ImageShtrafClass={imageStye} onClose={() => setState({...state, imageStye: "d-none",}) }/>
						<Layout component={()=>{
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
																<TypeShtraph filter={filter} onFilter={(filter)=>{setState({...state, filter: filter})}}/>
															</div>
														</div>
														<div className="mt-4 col-12 ">
															<div>
																<h3 className="mb-1">Оплата</h3>
																<Payment filter={payment} onFilter={(filter)=>{setState({...state, payment:filter})}}/>
															</div>
														</div>
														<div className=" mt-4 col-12 mt-4">
															<div>
																<h3 className="mb-1">Статус</h3>
																<Status filter={status} onFilter={(filter)=>{setState({...state,status:filter})}}/>
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
																  	  	  	<button onClick={()=> currentPage > 1 ? setState({...state,currentPage: currentPage-1}): setState({...state,currentPage:1})} className="page-link" >◄</button>
																  	  	</li>
																  	  	<Pagination cp={currentPage} paginate={ items => setState({...state,currentPage:items})} postsPerPage={postsPerPage} totalPosts={itemsArr.length}/>
																  	  	<li className="page-item">
																  	  	  	<button onClick={()=> currentPage < pageN ? setState({...state,currentPage:currentPage+1}): setState({...state,currentPage: pageN})} className="page-link">►</button>
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
		</>
	)
}

export default MyShtraph;

