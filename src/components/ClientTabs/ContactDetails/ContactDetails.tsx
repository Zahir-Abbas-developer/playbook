import { Button, Card, Col, Form, Input, Row, Select, Space, Spin } from 'antd';
import './ContactDetails.scss'
import { text } from "stream/consumers";
import { MailOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../../utils/firebase';
import AppSnackbar from '../../../utils/AppSnackbar';

const { Meta } = Card;

const ContactDetails = () => {
  const [form] = Form.useForm();
    const onFinishFailed = (errorInfo: any) => console.log('Failed:', errorInfo);
    const { role: userRole, id: userId }: any = JSON.parse(localStorage.getItem("user") || "{}");
  const onFinish = (values: any) => {
   console.log(values)
   const addProductValues = {
    ...values,
   
    createdAt: serverTimestamp(),
    createdBy: userId ?? "",
  };
  addDoc(collection(firestore, "contackdetails"), addProductValues)
    .then((response) => AppSnackbar({ type: "success", messageHeading: "Successfully Sent!", message: "Message has been sent successfully" }))
    .catch((error) =>
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!",
      })
    )
    .finally(() =>  form.resetFields());
  }
   
    return (
        <>
            <div className="header-image-card-details">
                <div className="image-content">
                    <h1 className="image-heading-title">Contact</h1>
                    <p className="image-heading-subheading">Our experts are here to help you with orders, fittings and more</p>
                </div>
            </div>


            <Row >
            <Col xs={24} >
            <h2 className="elementor-heading-title elementor-size-default " style={{textAlign:"center",marginBottom:"0px",fontWeight:"600",fontSize:"30px"}}>Reach Out </h2>
             <p  style={{textAlign:"center",marginTop:"0px",fontWeight:"400",fontSize:"20px"}} >FOR CONSULTATION</p>

             <p  style={{textAlign:"center",fontWeight:"100",fontSize:"1.4rem",lineHeight:"2.1em",}}>Whether have an inquiry related to our services or looking for a quote, we are available for help and support. Just fill out the form or call  +92(307) 520-9625 Dedication to customers is our number one priority.</p>
            </Col>
            </Row>
           <Row style={{ background: "linear-gradient(135deg, rgba(68,68,68,1) 6%, rgba(0,0,0,1) 95%)", padding: "40px" }}>
           <Col xs={24} lg={12} >
            <div style={{textAlign:"center"}}>
                    
            <WhatsAppOutlined style={{color:"white",fontSize:"50px"}} />
            <p style={{color:"white",fontWeight:"600",fontSize:"20px"}}>WHATSAPP</p>
            <p style={{color:"white",fontWeight:"400",fontSize:"15px",margin:"0px"}}>09AM-12PM</p>
            <p style={{color:"white",fontWeight:"400",fontSize:"15px",marginTop:"0px"}}>+92300-526-9625</p>
            </div>
            <div style={{textAlign:"center"}}>
                    
                    <MailOutlined  style={{color:"white",fontSize:"50px"}} />
                    <p style={{color:"white",fontWeight:"600",fontSize:"20px"}}>CONTACT</p>
                    <p style={{color:"white",fontWeight:"400",fontSize:"15px",margin:"0px"}}>playbook@gmail.com</p>
                    <p style={{color:"white",fontWeight:"400",fontSize:"15px",marginTop:"0px"}}>+92307-520-9625</p>
                    </div>
                    <div style={{textAlign:"center"}}>
                    
                  
                    </div>
          </Col>
            <Col xs={24} lg={12} >
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            form={form}
            onFinishFailed={onFinishFailed}
            // autoComplete="off"
            layout="vertical"
          >
            <Row gutter={[30, 5]} align="bottom">



             
              <Col xs={24} sm={24} md={12} lg={12} className='onBoarding-input'>
                <Form.Item
                  label="Full Name"
                  name="name"

                  rules={[{ required: true, message: 'Required field' }]}
                >
                  <Input placeholder="Type here" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} className='onBoarding-input'>
                <Form.Item
                  label="EMAIL ADDRESS"
                  name="email"

                  rules={[{ required: true, message: 'Required field' }]}
                >
                  <Input placeholder="Type here" />
                </Form.Item>
              </Col>
             
              <Col xs={24} sm={24} md={24} lg={24} className='onBoarding-input'>
                <Form.Item
                  label="Subject"
                  name="subject"

                  rules={[{ required: true, message: 'Required field' }]}
                >
                  <Input placeholder="Type here" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24}>
              <Form.Item    rules={[{ required: true, message: 'Required field' }]} name="message" label={<span className="label">Your Message</span>}>
                <Input.TextArea
                  rows={4}
                  placeholder="Type here"
                  style={{ border: "1.5px solid #A0A3BD", borderRadius: "3px" }}
                  
                />
              </Form.Item>
            </Col>
              <Col xs={24} md={24}>
              <Form.Item name="description" label={<span className="label">Your Description</span>}>
                <Input.TextArea
                  rows={4}
                  placeholder="Type here"
                  style={{ border: "1.5px solid #A0A3BD", borderRadius: "3px" }}
                />
              </Form.Item>
            </Col>
              <Col span={24}>
                <Space size={12} className='modal-buttons'>

                  <Button className="modal-button btn-cancel ">Cancel</Button>
                  <Button type="primary"
                    htmlType="submit" className="modal-button btn-secondary ">Save</Button>
                </Space>
              </Col>


              {/*           
            <Col span={24}>
              <Space size={12} className='modal-buttons'>

                <Button  className="modal-button btn-cancel ">Cancel</Button>
                <Button type="primary"
                  htmlType="submit"  className="modal-button btn-secondary ">Save</Button>
              </Space>
            </Col> */}


            </Row>
          </Form>
        
        </Col>
           </Row>

            

        </>

    )

}
export default ContactDetails