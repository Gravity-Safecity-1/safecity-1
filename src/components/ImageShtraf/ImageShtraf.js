import React , {useState, useEffect } from 'react';
import './ImageShtraf.css';
import Image from './Image/Image';
import Indicators from './Indicators/Indicators';
import api from '../../api/index';

const ImageShtraf =(props)=>{
    const {ImageShtrafClass, onClose, IDImage} = props;
    const [violation, setViolations] = useState([])
    const [strafInfo, setStrafInfo] = useState({
        time: null,
        location:null,
        status: null,
        paymount: null
    })
    const [infoobj, setInfoobj] = useState([])

    useEffect(() => {
        api.get(`/customer/${props.idx}`)
            .then(res=>{
                const {violations} = res.data;
                setViolations(violations.filter(item => item.BId === props.IDImage ));
            })
    }, [])
    console.log(violation)
    const image = violation.map(item=>{
        return(
            <Image data={item.VTime} key={item.BId} place={item.VLocation} status={item.ProcessStatus} paymount={item.IsPaid} clz="active" src="images/Shtraf/Shtraf-1.png" />
        )
    })
    const image2 = violation.map(item=>{
        return(
            <Image data={item.VTime} key={item.BId} place={item.VLocation} status={item.ProcessStatus} paymount={item.IsPaid} src="images/Shtraf/Shtraf-1.png" />
        )
    })
    return (
        <div className={ImageShtrafClass} id="ImageShtraf">
            <div className="ImageClose">
                <div className="c-p " onClick={onClose}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M27 9L9 27" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 9L27 27" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
            <div id="carouselExampleIndicators" className="carousel h-100 slide" data-ride="carousel">
                <ol className="carousel-indicators">
                </ol>
                <div className="carousel-inner d-inline-block h-100 py-5 px-sm-5 px-0">
                    {image}
                    {image2}
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="text-dark">
                        <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-chevron-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    </span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="text-dark">
                        <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-chevron-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </span>
                    <span className="sr-only"></span>
                </a>
            </div>
        </div>
    )
}
export default ImageShtraf