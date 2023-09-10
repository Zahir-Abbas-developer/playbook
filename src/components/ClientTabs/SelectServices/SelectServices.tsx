import React, { useState } from 'react';
import { Button, Carousel } from 'antd';
import CricketGround from "../../../assets/images/ground.jpg"
import Footballground from "../../../assets/images/football.jpg"
import badminton from "../../../assets/images/badminton.jpg"
import hocketground from "../../../assets/images/hocketground.jpg"

import shoesImage1 from "../../../assets/images/MicrosoftTeams-image (8).png"
import shoesImage2 from "../../../assets/images/MicrosoftTeams-image (9).png"
import shoesImage3 from "../../../assets/images/MicrosoftTeams-image (10).png"
import { Link } from 'react-router-dom';
import './SelectServices.scss'
const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const SelectServices = () => {
  const [viewAllProductsBackground ,setViewAllProductsBackground]=useState("white")
  const [viewAllProductsText ,setViewAllProductsText]=useState("#FE5C36")
  return((
  <Carousel autoplay>
    <div style={{position:"relative"}}>

      <img src={CricketGround} className='img-carousel' style={{width:"100%",height:"90vh"}} />
      <div style={{position:"absolute",  top: "30%" ,marginLeft:"50px"}} className='custom-product-carousel'>
      <p style={{fontSize:"40px",fontWeight:"400",color:"white",marginBottom:"0px"}} className='ground-size-name'>CRICKET</p>
  <h1 style={{fontSize:"70px",fontWeight:"600",color:"white",marginBottom:"18px",marginTop:"0PX"}} className='ground-size'>GROUND</h1>
  <Link to="/select-grounds" style={{ background: viewAllProductsBackground, padding: "14px", color: viewAllProductsText ,border:"1px solid #FE5C36" }} onMouseLeave={()=>{setViewAllProductsBackground("white");setViewAllProductsText("#FE5C36")}} onMouseOver={()=>{setViewAllProductsBackground("#FE5C36");setViewAllProductsText("white")}} >LATEST OFFERS</Link>

      </div>
    
    </div>

    <div style={{position:"relative"}}>

<img src={Footballground} className='img-carousel' style={{width:"100%",height:"90vh"}} />
<div style={{position:"absolute",  top: "30%" ,marginLeft:"50px"}} className='custom-product-carousel'>
<p style={{fontSize:"40px",fontWeight:"400",color:"white",marginBottom:"0px"}} className='ground-size-name'>FOOTBALL</p>
  <h1 style={{fontSize:"70px",fontWeight:"600",color:"white",marginBottom:"18px",marginTop:"0PX"}} className='ground-size'>GROUND</h1>
  <Link to="/select-grounds" style={{ background: viewAllProductsBackground, padding: "14px", color: viewAllProductsText ,border:"1px solid #FE5C36" }} onMouseLeave={()=>{setViewAllProductsBackground("white");setViewAllProductsText("#FE5C36")}} onMouseOver={()=>{setViewAllProductsBackground("#FE5C36");setViewAllProductsText("white")}} >LATEST OFFERS</Link>

</div>

</div>
<div style={{position:"relative"}}>

<img src={hocketground} className='img-carousel' style={{width:"100%",height:"90vh"}} />
<div style={{position:"absolute",  top: "30%" ,marginLeft:"50px"}} className='custom-product-carousel'>
<p style={{fontSize:"40px",fontWeight:"400",color:"white",marginBottom:"0px"}} className='ground-size-name'>HOCKEY</p>
  <h1 style={{fontSize:"70px",fontWeight:"600",color:"white",marginBottom:"18px",marginTop:"0PX"}} className='ground-size'>GROUND</h1>
  <Link to="/select-grounds" style={{ background: viewAllProductsBackground, padding: "14px", color: viewAllProductsText ,border:"1px solid #FE5C36" }} onMouseLeave={()=>{setViewAllProductsBackground("white");setViewAllProductsText("#FE5C36")}} onMouseOver={()=>{setViewAllProductsBackground("#FE5C36");setViewAllProductsText("white")}} >LATEST OFFERS</Link>

</div>

</div>
<div style={{position:"relative"}}>

<img src={badminton} className='img-carousel' style={{width:"100%",height:"90vh"}} />
<div style={{position:"absolute",  top: "30%" ,marginLeft:"50px"}} className='custom-product-carousel'>
<p style={{fontSize:"40px",fontWeight:"400",color:"white",marginBottom:"0px"}} className='ground-size-name'>BADMINTON</p>
  <h1 style={{fontSize:"70px",fontWeight:"600",color:"white",marginBottom:"18px",marginTop:"0PX"}} className='ground-size'>GROUND</h1>
  <Link to="/select-grounds" style={{ background: viewAllProductsBackground, padding: "14px", color: viewAllProductsText ,border:"1px solid #FE5C36" }} onMouseLeave={()=>{setViewAllProductsBackground("white");setViewAllProductsText("#FE5C36")}} onMouseOver={()=>{setViewAllProductsBackground("#FE5C36");setViewAllProductsText("white")}} >LATEST OFFERS</Link>

</div>

</div>
  </Carousel>
))}

export default SelectServices;