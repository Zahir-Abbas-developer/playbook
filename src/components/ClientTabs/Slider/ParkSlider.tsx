import React, { useState, useEffect } from "react";
import { Typography, Box, Button, TextField, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { firestore } from "../../../utils/firebase";
import { setGrounds } from "../../../store/Slices/Playbook";
import { useAppSelector } from "../../../store";
import "./SliderCard.scss"
import { CollectionReference, collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { Card, Col, Rate } from "antd";
import { Link } from "react-router-dom";
import '../../../sass/common.scss'



const ParkSlider = (props:any) => {
  const { setPostTitle, setPostId, setPreview, setBroadCast, setPostType } =
    props;
    const [viewAllProductsBackground ,setViewAllProductsBackground]=useState("#FE5C36")
    const [viewAllProductsText ,setViewAllProductsText]=useState("white")
    const { grounds, }: any = useAppSelector((state:any) => state.playbook);
    const [deleteModal, setDeleteModal] = useState(false);
    const [values,setValues]=useState<any>(null);
    const [productsLoading, setProductsLoading] = useState<boolean>(false);
    const [hoverImage ,setHoverImage]=useState(false)

  const dispatch = useDispatch();

  const fetchGrounds = () => {
    const  locationCollection:CollectionReference=collection(firestore, "grounds");
    let baseQuery:any = locationCollection;
    if(values?.location) baseQuery =query(baseQuery,where("locationId",'==',values?.location));
    if(values?.slot) baseQuery =query(baseQuery,where("slots",'array-contains',values?.slot));
    setProductsLoading(true);
    onSnapshot(baseQuery, (snapshot:any) => {
      const groundsData: any = snapshot.docs.map((doc:any) => ({ id: doc.id, ...doc.data() }))
      console.log("grounds",groundsData)
      setProductsLoading(false);
      dispatch(setGrounds(groundsData))
    });
  };
  useEffect(() => {
     fetchGrounds();
  
  }, [values]);

  return (
    <>
    <Grid container>
      <Grid item lg={12}>
        <Box className="slider" sx={{ p: 1 }}>
          <Box className="slide-track">
            {props.CricketGrounds.map((productData:any, index:any) => {
              return (
                <>
                  <Box className="slide" key={index}>
                    <Box sx={{ mt: 2, mb: 2 }}>
                      {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <img alt="example" src={!hoverImage?productData?.image:productData?.image} onMouseLeave={()=>setHoverImage(false)} onMouseOver={()=>{setHoverImage(true)}} style={{height:"20vh"}} />
                      </Box> */}
                    
                     
                      <Card
                                
                                style={{ background: "rgba(44 ,43 ,42,0.9)", border: "1px solid rgba(44 ,43 ,42,0.9)" }}
                                cover={<img alt="example" src={!hoverImage?productData?.image:productData?.image} onMouseLeave={()=>setHoverImage(false)} onMouseOver={()=>{setHoverImage(true)}} style={{height:"20vh"}} />}
                            >
                                <div style={{ textAlign: "center", padding: "0" }}>
                                <p style={{ fontWeight: "bold", color: "white", padding: "0px", margin: "2px",fontFamily:" Oswald,sans-serif" }}> {productData?.name} </p>

                                    <p style={{ fontWeight: "bold", color: "white", padding: "0px", margin: "2px",fontFamily:" Oswald,sans-serif" }}> {productData?.seats} Seats</p>
                                    <p style={{ color: "white", padding: "0px", margin: "2px" }}>{productData?.description}</p>
                                    <p style={{ fontWeight: "bold", color: "white", padding: "0px", margin: "2px" }}>{productData?.location}</p>
                                    <Rate disabled defaultValue={productData?.ratingStars} style={{display:"block"}} />
                                    <Link to="" > <Button style={{marginTop:"20px"}}>View Details</Button></Link>
                                </div>
                            </Card>
                        
                    </Box>
                  </Box>
                </>
              );
            })}
          </Box>
          <Col xs={24} sm={24} style={{ textAlign: "center", marginTop: "25px" }} >
                        <Link className="btn btn-2 hover-slide-right" to="/select-stadium-location" style={{ background: viewAllProductsBackground, padding: "14px", color: viewAllProductsText ,border:"1px solid #FE5C36" }} onMouseLeave={()=>{setViewAllProductsBackground("#FE5C36");setViewAllProductsText("white")}} onMouseOver={()=>{setViewAllProductsBackground("white");setViewAllProductsText("#FE5C36")}} >VIEW  PARKS</Link>
                    </Col>
        </Box>
      </Grid>
    </Grid>
  </>
  );
};

export default ParkSlider;
