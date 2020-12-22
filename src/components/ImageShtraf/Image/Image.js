import React from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import './Image.css';
import InfoShtraf from '../InfoShtraf/InfoShtraf';

export default function Image(props) {
	const { clz, src, wheel, violation } = props;
    let s = ` h-100  carousel-item ${clz}`;
    return (
        <div className={s} >
			<div className=" h-100 " id="imgWrapperShtraf">
				<div className="imgWrapperShtraf h-100 px-sm-5 px-0 d-flex justify-content-center" onWheel={wheel}>
					<TransformWrapper defaultPositionX={0} defaultPositionY={0}>
					{({ zoomIn, zoomOut, resetTransform, ...rest }) => (
						<React.Fragment>
							<div className="tools d-sm-block d-none">
				              	<button className="btn" onClick={zoomIn}>
					          	    	<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
			                  	          <path d="M16.5 28.5C23.1274 28.5 28.5 23.1274 28.5 16.5C28.5 9.87258 23.1274 4.5 16.5 4.5C9.87258 4.5 4.5 9.87258 4.5 16.5C4.5 23.1274 9.87258 28.5 16.5 28.5Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
			                  	          <path d="M31.5001 31.5L24.9751 24.975" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
			                  	          <path d="M16.5771 11.2648V21.7648" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
			                  	          <path d="M11.3271 16.5148H21.8271" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
			                  	      </svg>
				              	</button>
				              	<button className="btn" onClick={zoomOut}>
					          	    	<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
			                  	          <path d="M16.5 28.5C23.1274 28.5 28.5 23.1274 28.5 16.5C28.5 9.87258 23.1274 4.5 16.5 4.5C9.87258 4.5 4.5 9.87258 4.5 16.5C4.5 23.1274 9.87258 28.5 16.5 28.5Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
			                  	          <path d="M31.5001 31.5L24.9751 24.975" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
			                  	          <path d="M11.3271 16.5148H21.8271" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
			                  	      </svg>
				              	</button>
				            </div>
			        		<TransformComponent>
		          				<img src={src} className=" img-fluid h-100" alt=""/>
			          		</TransformComponent>
			          		<InfoShtraf violation={violation} />
		          		</React.Fragment>
		          		)}
	      			</TransformWrapper>
	          	</div>
          	</div>	
        </div>
    )
}