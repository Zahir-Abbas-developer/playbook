
import { Button, Card, Col, Row, Space, Table, Form, Input, Select } from 'antd'
import './BillingDetails.scss'
import deleteIcon from "../../../assets/icons/delete-icon-outlined.svg";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import storage from 'redux-persist/lib/storage';
import { useDispatch } from 'react-redux';
import { addProduct, removeProduct } from '../../../store/Slices/AddToCardSlice';
import { text } from 'stream/consumers';
import AppSnackbar from '../../../utils/AppSnackbar';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store';
import { usePostOrdersMutation } from '../../../store/Slices/Products';
import { useLocation } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../../../utils/firebase';
const BillingDetails = () => {
  const [userInfo, setUserInfo] = useState({})
  const [form] = Form.useForm();
  const dispatchOld = useDispatch();
  const { products }: any = useAppSelector((state) => state.products);
  const [postOrders] = usePostOrdersMutation()
  const handleDeleteCart = (id: any) => {
    dispatchOld(removeProduct(id))
    AppSnackbar({ type: "success", messageHeading: "Success!", message: "Successful Deleted!" });
  }
  const {id} : any = JSON.parse(localStorage.getItem("user") || "{}");
  let payloadValues:{}
  const onFinishFailed = (errorInfo: any) => console.log('Failed:', errorInfo);
  const onFinish = (values: any) => {
   
    payloadValues=values
    
  
  }
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();



  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: "USD",
      },
    });
  }, []);

  const {state}=useLocation()
  console.log(state)
  const onApprove = (data: any, actions: any) => {
    // Implement your logic to handle the approved payment
    // Use the data object to access the payment details
    return actions.order.capture().then(function (details: any) {
      console.log('Payment completed by ' + details.payer.name.given_name);
      // Call your server to save the transaction
    });
  };

  const orderCreate = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          currency_code: 'EUR',
          value: '120.16'
        },
        description: 'Purchase Unit test description',
        custom_id: '64735',
      }]
    })
  }

  const onError = (err: any) => {
    // Implement your logic to handle payment errors
    // Use the err object to access the error details
    console.error('PayPal error:', err);
  };

  // Using reduce to calculate the total price
  const totalPrice = products?.products?.reduce((accumulator: any, currentValue: any) => {
    // Adding the price of the current object to the accumulator
    return accumulator + currentValue.price;
  }, 0); // 0 is the initial value of the accumulator

//   const shoeProducts = [{
//     productId: "",
//     quantity: "",
//     price: totalPrice
//   }]
//   const {state}=useLocation()
//   console.log(state)
 
  return (
    <>

      <div className="header-image">
        <div className="image-content">
          <h1 className="" style={{color:"black"}} >CHECKOUT</h1>

          <p className="image-heading-subheading"  style={{color:"black"}} >We accept Visa, Mastercard,Anex,PayPal and more.</p>

        </div>
      </div>

      <Row style={{ padding: "40px", backgroundColor: "#181818" }}>

        <Col xs={24} lg={12} style={{ backgroundColor: "#363636", padding: "40px" }}>
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
                  label="First Name"
                  name="firstName"

                  rules={[{ required: true, message: 'Required field' }]}
                >
                  <Input placeholder="Type here" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} className='onBoarding-input'>
                <Form.Item
                  label="Last Name"
                  name="lastName"

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
              <Col xs={24} sm={24} md={12} lg={12} className='onBoarding-input'>
                <Form.Item
                  label="PHONE"
                  name="phone"

                  rules={[{ required: true, message: 'Required field' }]}
                >
                  <Input placeholder="Type here" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} className='onBoarding-input'>
                <Form.Item
                  label="COUNTY"
                  name="county"

                  rules={[{ required: true, message: 'Required field' }]}
                >
                  <Input placeholder="Type here" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} className='onBoarding-input'>
                <Form.Item
                  label="TOWN / CITY"
                  name="city"

                  rules={[{ required: true, message: 'Required field' }]}
                >
                  <Input placeholder="Type here" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} className='onBoarding-input'>
                <Form.Item
                  label="POSTCODE / ZIP"
                  name="postcode"

                  rules={[{ required: true, message: 'Required field' }]}
                >
                  <Input placeholder="Type here" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} className='onBoarding-input'>
                <Form.Item
                  label="STREET ADDRESS"
                  name="streetAddress"

                  rules={[{ required: true, message: 'Required field' }]}
                >
                  <Input placeholder="Type here" />
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
        <Col xs={24} lg={12} style={{ textAlign: "center" }} >
          <Card style={{ backgroundColor: "#000000" }}>
            <p style={{ color: "#ffffff", marginBottom: "0px" }}>Your Booking</p>
            <span style={{ color: "#ffffff" }}>----------</span>
            <Row>
              <Col xs={12}>
                <p style={{ color: "#ffffff" }}>SUBTOTAL</p>
              </Col>
              <Col xs={12}>
                <p style={{ color: "#ffffff" }}>{state?.price} Rs</p>
              </Col>
             
              <Col xs={12}>
                <p style={{ color: "#ffffff" }}>TOTAL</p>
              </Col>
              <Col xs={12}>
                <p style={{ color: "#ffffff" }}>{state?.price} Rs</p>
              </Col>

            </Row>
            <Row>
              <Col xs={24} style={{ textAlign: "center" }}>
                <PayPalButtons createOrder={(data: any, actions: any) => {
                  return actions.order
                    .create({
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "USD",
                            value: totalPrice + 10,
                          },
                        },
                      ],
                    })
                    .then((orderId: string) => {
                      console.log("orderId", orderId);

                      // Your code here after create the order
                      return orderId;
                    });
                }}
                  onApprove={function (data: any, actions: any) {
                    return actions.order.capture().then(function () {
                      console.log("ressssssssss", data);
                      const addPayment = {
                        ...payloadValues,subtotal: totalPrice, total: totalPrice,paymentMethod: "PAYPAL", paymentTransactionId: data?.orderID,groundId:state?.groundId,userId:id
                    
                      };
                      addDoc(collection(firestore, "order"), addPayment)
                        .then((response:any) =>{ AppSnackbar({ type: "success", messageHeading: "Successfully Added!", message: "Information added successfully" }); storage.removeItem("persist:role")})
                        .catch((error:any) =>
                          AppSnackbar({
                            type: "error",
                            messageHeading: "Error",
                            message: error?.data?.message ?? "Something went wrong!",
                          })
                        )
                        .finally(() =>    form.resetFields());
                    }
                    
                    )
                        }
                      }
                  />

              </Col>
            </Row>
          </Card>

        </Col>
      </Row>


    </>)
}
export default BillingDetails