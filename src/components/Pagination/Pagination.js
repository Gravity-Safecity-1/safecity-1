import React from 'react';

const Pagination =(props)=> {
	const {postsPerPage, totalPosts, paginate, cp} = props;
	const pageNum = [];
	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNum.push(i)
	}
	return(
		<>
			{pageNum.map((items,indx) =>(
				<li onClick={()=> paginate(items)} className={items === cp ? "page-item active": "page-item"}>
					<button className="page-link" key={indx}>
				  		{items}
				  	</button>			
				</li>
			))}
		</>
	)
}
export default Pagination;