import { Col, Row } from "antd"
import SelectServices from "../SelectServices/SelectServices"
import SelectServicesDetails from "../SelectServicesDetails/SelectServicesDetails"
import ShoeProductDetails from "../ShoeProductDetails/ShoeProductDetails"

const Services=()=>{
    console.log(window.location.origin + "/reset-password");
    
    return(
    
    <Row>
<Col xs={24}>
 <SelectServices/>
</Col>
<Col xs={24} md={24} style={{marginTop:"15px"}}>
 <SelectServicesDetails/>
</Col>
<Col xs={24} md={24} style={{marginTop:"15px"}}>
 <ShoeProductDetails/>
</Col>
    </Row>)
}
export default Services