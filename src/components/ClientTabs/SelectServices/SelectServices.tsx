import  { useState } from 'react';
import {  Carousel } from 'antd';
import CricketGround from "../../../assets/images/faysalhills/cricketfaysalhills.jpg"
import Footballground from "../../../assets/images/faysalhills/footballfaysalhills.jpg"
import badminton from "../../../assets/images/faysalhills/parksfaysal.jpg"
import hocketground from "../../../assets/images/faysalhills/HOCKEYFAISALHILLS.jpeg"

import { Link } from 'react-router-dom';
import './SelectServices.scss'

const SelectServices = () => {
  const [viewAllProductsBackground ,setViewAllProductsBackground]=useState("white")
  const [viewAllProductsText ,setViewAllProductsText]=useState("#3c3b91")
  return((
  <Carousel autoplay>
    <div style={{position:"relative"}}>

      <img src={CricketGround} className='img-carousel' style={{width:"100%",height:"90vh"}} />
      <div style={{position:"absolute",  top: "30%" ,marginLeft:"50px"}} className='custom-product-carousel'>
      <p style={{fontSize:"40px",fontWeight:"400",color:"white",marginBottom:"0px"}} className='ground-size-name'>CRICKET</p>
  <h1 style={{fontSize:"70px",fontWeight:"600",color:"white",marginBottom:"18px",marginTop:"0PX"}} className='ground-size'>GROUND</h1>
  <Link to="/select-grounds" style={{ background: viewAllProductsBackground, padding: "14px", color: viewAllProductsText ,border:"1px solid #3c3b91" }} onMouseLeave={()=>{setViewAllProductsBackground("white");setViewAllProductsText("#3c3b91")}} onMouseOver={()=>{setViewAllProductsBackground("#3c3b91");setViewAllProductsText("white")}} >LATEST OFFERS</Link>

      </div>
    
    </div>

    <div style={{position:"relative"}}>

<img src={Footballground} className='img-carousel' style={{width:"100%",height:"90vh"}} />
<div style={{position:"absolute",  top: "30%" ,marginLeft:"50px"}} className='custom-product-carousel'>
<p style={{fontSize:"40px",fontWeight:"400",color:"white",marginBottom:"0px"}} className='ground-size-name'>FOOTBALL</p>
  <h1 style={{fontSize:"70px",fontWeight:"600",color:"white",marginBottom:"18px",marginTop:"0PX"}} className='ground-size'>GROUND</h1>
  <Link to="/select-grounds" style={{ background: viewAllProductsBackground, padding: "14px", color: viewAllProductsText ,border:"1px solid #3c3b91" }} onMouseLeave={()=>{setViewAllProductsBackground("white");setViewAllProductsText("#3c3b91")}} onMouseOver={()=>{setViewAllProductsBackground("#3c3b91");setViewAllProductsText("white")}} >LATEST OFFERS</Link>

</div>

</div>
<div style={{position:"relative"}}>

<img src={hocketground} className='img-carousel' style={{width:"100%",height:"90vh"}} />
<div style={{position:"absolute",  top: "30%" ,marginLeft:"50px"}} className='custom-product-carousel'>
<p style={{fontSize:"40px",fontWeight:"400",color:"white",marginBottom:"0px"}} className='ground-size-name'>HOCKEY</p>
  <h1 style={{fontSize:"70px",fontWeight:"600",color:"white",marginBottom:"18px",marginTop:"0PX"}} className='ground-size'>GROUND</h1>
  <Link to="/select-grounds" style={{ background: viewAllProductsBackground, padding: "14px", color: viewAllProductsText ,border:"1px solid #3c3b91" }} onMouseLeave={()=>{setViewAllProductsBackground("white");setViewAllProductsText("#3c3b91")}} onMouseOver={()=>{setViewAllProductsBackground("#3c3b91");setViewAllProductsText("white")}} >LATEST OFFERS</Link>

</div>

</div>
<div style={{position:"relative"}}>

<img src={badminton} className='img-carousel' style={{width:"100%",height:"90vh"}} />
<div style={{position:"absolute",  top: "30%" ,marginLeft:"50px"}} className='custom-product-carousel'>
<p style={{fontSize:"40px",fontWeight:"400",color:"white",marginBottom:"0px"}} className='ground-size-name'>PARK</p>
  <h1 style={{fontSize:"70px",fontWeight:"600",color:"white",marginBottom:"18px",marginTop:"0PX"}} className='ground-size'>VENUE</h1>
  <Link to="/select-grounds" style={{ background: viewAllProductsBackground, padding: "14px", color: viewAllProductsText ,border:"1px solid #3c3b91" }} onMouseLeave={()=>{setViewAllProductsBackground("white");setViewAllProductsText("#3c3b91")}} onMouseOver={()=>{setViewAllProductsBackground("#3c3b91");setViewAllProductsText("white")}} >LATEST OFFERS</Link>

</div>

</div>
  </Carousel>
))}

export default SelectServices;