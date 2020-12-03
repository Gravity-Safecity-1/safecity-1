import React from 'react';
import './ImageShtraf.css';
import Image from './Image/Image';

export default class ImageShtraf extends React.Component {
    state ={
        close: false,
        zoom: false
    }
    onClose=()=>{
        this.setState({
            close: true,
        })
    }
    render() {
        const {close, zoom} = this.state;
        let ImageShtrafClass = "";
        if(close){
            ImageShtrafClass = "d-none"
        }
        return (
            <div className={ImageShtrafClass} id="ImageShtraf">
                <div className="ImageClose">
                    <div className="c-p " onClick={this.onClose}>
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27 9L9 27" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 9L27 27" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div id="carouselExampleIndicators" className="carousel h-100 slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner d-inline-block h-100 py-5 px-sm-5 px-0">
                        <Image clz="active" src="images/Shtraf/Shtraf-1.png" />
                        <Image src="images/Shtraf/Shtraf-1.png"/>
                        <Image src="images/Shtraf/Shtraf-1.png"/>
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
}