import { Button, Card, Col, Rate, Row, Spin } from "antd"
import jacketImage1 from "../../../assets/images/jackets/benjamin-voros-TnNo84AJJ5A-unsplash.jpg"
import jacketImage2 from "../../../assets/images/jackets/caio-coelho-QRN47la37gw-unsplash.jpg"
import jacketImage3 from "../../../assets/images/jackets/lea-ochel-nsRBbE6-YLs-unsplash.jpg"
import jacketImage4 from "../../../assets/images/jackets/tobias-tullius-Fg15LdqpWrs-unsplash.jpg"
import { Link } from "react-router-dom"
import { useGetAllProductsQuery } from "../../../store/Slices/Products"
import { useState } from "react"
import '../../../sass/common.scss'
import { CricketGrounds } from "../../../mock/PlayBookData/Grounds"
import SliderCard from "../Slider/SliderCard"
const SelectServicesDetails = () => {
    const paramsObj: any = {};
    const query = "&" + new URLSearchParams(paramsObj).toString();
    const { data: dataProducts, isSuccess: isSuccessProducts } = useGetAllProductsQuery({ query })
    const [hoverImage ,setHoverImage]=useState(false)
    const [viewAllProductsBackground ,setViewAllProductsBackground]=useState("#3c3b91")
    const [viewAllProductsText ,setViewAllProductsText]=useState("white")
    let productsData: any
    if (isSuccessProducts) {
        productsData = dataProducts
    }
    const productDetails = [
        {
            jacketImages: jacketImage4,
            name: "benjamin-voros",
            price: "100$"

        },
        {
            jacketImages: jacketImage3,
            name: "caio-coelho",
            price: "100$"

        },
        {
            jacketImages: jacketImage3,
            name: "benjamin-voros",
            price: "100$"

        },
        {
            jacketImages: jacketImage4,
            name: "benjamin-voros",
            price: "100$"

        }
    ]
    return (
        <>
            {(CricketGrounds?.length > 0 || CricketGrounds?.length==0)  ? <div style={{marginTop:"18px"}}>
                <p className="title-color" style={{ textAlign: "center", fontSize: "18px" ,marginBottom:"0px",fontFamily:" Oswald,sans-serif"}}>GROUNDS</p>
                { <div className="grounds-details-slider"> <SliderCard CricketGrounds={CricketGrounds}  /></div>}
                {CricketGrounds?.length > 0 ? <Row gutter={[16,16]} style={{padding:"40px"}} className="grounds-details" >
                    {CricketGrounds?.slice(0, 4)?.map((productData: any) => (
                        <Col xs={24} md={12} lg={6} key={productData.id}>
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
                                    {/* <Link to="" > <Button style={{marginTop:"20px"}}>View Details</Button></Link> */}
                                </div>
                            </Card>
                        </Col>
                        
                    ))}
                    <Col xs={24} sm={24} style={{ textAlign: "center", marginTop: "10px" }} >
                        <Link className="btn btn-2 hover-slide-right" to="/select-grounds" style={{ background: viewAllProductsBackground, padding: "14px", color: viewAllProductsText ,border:"1px solid #3c3b91" }} onMouseLeave={()=>{setViewAllProductsBackground("#3c3b91");setViewAllProductsText("white")}} onMouseOver={()=>{setViewAllProductsBackground("white");setViewAllProductsText("#FE5C36")}} >VIEW  GROUNDS</Link>
                    </Col>
                </Row> : <p style={{  fontSize: "large", textAlign: "center" }}>No Products Added</p>}



            </div> : <p style={{  fontSize: "large", textAlign: "center" }}>No Products Added</p>}
        </>

    )
}
export default SelectServicesDetails