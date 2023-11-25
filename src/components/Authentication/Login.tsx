import { Col, Row } from "antd";
import CareLibraryIcon from "../../assets/icons/logo.jpg";
import LazyIcon from "./../../assets/Login/lazy-icon-care.png";
import { useState } from "react";
import { Form, Input, Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./SignIn.scss";
import { useForgetPasswordRequestMutation, useNewPasswordRequestMutation, useSignInPostRequestMutation } from "../../store/Slices/Signin";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useChangePasswordPostRequestMutation } from "../../store/Slices/ChangePassword";
import { useAuthSignUpMutation } from "../../store/Slices/Products";
import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

//comment for testing
const Login = () => {
  const [errorMessage, setErrorMessage] = useState<any>(false);
  const [changePasswordErrorMessage, setChangePasswordErrorMessage] = useState("");
  const [signInLoading ,setIsSignInLoading]=useState(false)
  const [signUpLoading ,setIsSignUpLoading]=useState(false)
  const [forgotPasswordLoading ,setIsForgotPasswordLoading]=useState(false)

  let navigate = useNavigate();
  const location = useLocation();
  const [resetPasswordRequest, { isLoading: isLoadingNewPassword }] = useNewPasswordRequestMutation();

  const [changePasswordPostRequest, { isLoading: changePasswordLoading }] = useChangePasswordPostRequestMutation();

  function renderDashboard(role: string): string {
    if (role === "user") {
      return "/services";
    } else if (role === "admin") {
      return "/admin-dashboard";
    } else {
      return "/services";
    }
  }
  const onFinishSignUp = async (values: any) => {
    delete values?.confirmpassWord;
    if (values?.password === values?.confirmPassword) {
      const payload = {
        email: values.email,
        password: values.password,
        username: values?.username,
        role: "admin",
        url: window?.location?.origin + "/user-verification",
      };
      createUserWithEmailAndPassword(auth, values?.email, values.password)
      
        .then((response) => {
          setIsSignUpLoading(true)
          // Save user data to Firestore
          setDoc(doc(firestore, "users", response.user.uid), {
            email: values.email,
            username: values.username,
            role: payload.role,
          }).then(() => {
            // Check if the user is not null before sending the verification email
            if (auth.currentUser !== null) {
              // Send email verification to the user
              sendEmailVerification(auth.currentUser)
                .then(() => {
                  console.log("Verification email sent!");
                  navigate("/login");
                })
               
                .catch((error) => {
                  console.error("Error sending verification email:", error);
                  // Handle the error or notify the user appropriately
                });
            } else {
              console.error("Current user is null. Cannot send verification email.");
              // Handle this scenario appropriately (e.g., show an error message)
            }
            setIsSignUpLoading(true)
          });
        })
        .catch((error) => {
          console.error("Error creating user:", error);
        });
    } else {
      setChangePasswordErrorMessage("New Password and Confirm New Password Should Be Equal");
    }
  };

  const onFinish = async (values: any) => {
    const payload = {
      emailOrUsername: values?.emailOrUsername, // values.username,
      password: values?.password, //values.password,
    };

    signInWithEmailAndPassword(auth, values.emailOrUsername, values.password)
      .then((response) => {
        setIsSignInLoading(true)
        if (!response?.user?.emailVerified) {
          setErrorMessage("Email is not Verified");
          return;
        }
        getDoc(doc(firestore, "users", response.user.uid)).then((result) => {
          if (result.exists()) {
            const userData: any = { id: result.id, ...result.data() };
            localStorage.setItem("user", JSON.stringify(userData));
            navigate(renderDashboard(userData?.role || "user"));
          }
        });
        setIsSignInLoading(true)
      })
      .catch((err) => {
        setErrorMessage(err?.message);
      });

    // const { error, data }: any = await signInPostRequest({
    //   payload,
    // });

    // let token
    // const role = data?.data?.user?.roleData?.name;

    // // console.log("test data", data?.data?.session)

    // if (data?.data?.session) {
    //   navigate(`/reset-password`, {
    //     state: { session: data?.data?.session, email: values.username },
    //   });
    // } else {
    //   if (!error) {
    //     const userData = {
    //       username: data?.user?.email,
    //       token: data?.accessToken,
    //       refreshToken: data?.data?.refreshToken,
    //       role: data?.user?.role,
    //     };
    //     const stringifyData = JSON.stringify(userData);
    //     localStorage.setItem("careUserData", stringifyData);

    //     navigate(renderDashboard(role))

    //   } else {
    //     setErrorMessage(error?.data?.message);
    //   }
    // }
  };

  const onFinishForgetPassword = async (values: any) => {
    const payload = {
      email: values?.email,
      url: window?.location?.origin + "/reset-password",
    };
    try {
      setIsForgotPasswordLoading(true)
      sendPasswordResetEmail(auth, values?.email)
    
        .then((response) => {})
        .catch((err) => console.log("error", err));
      // const res: any = await forgetPasswordRequest({ payload }).unwrap()
      // console.log(res)
      navigate("/login");
      setIsForgotPasswordLoading(true)
    } catch (error) {
      console.log(error);
    }
  };
  const myParam = useLocation().search;
  const resetToken = new URLSearchParams(myParam).get("token");
  const onFinishNewPassword = async (values: any) => {
    const payload = {
      password: values?.password,
      token: resetToken,
    };
    try {
      const res = await resetPasswordRequest({ payload }).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishChangePassword = async (values: any) => {
    if (values?.newPassword === values?.confirmNewPassword) {
      const payload = {
        currentPassword: values.currentPassword,
        updatedPassword: values.newPassword,
      };
      const { error, data }: any = await changePasswordPostRequest({
        payload,
      });
      if (!error) {
        navigate("/login");
      } else {
        setChangePasswordErrorMessage(error?.data?.message);
      }
    } else {
      setChangePasswordErrorMessage("New Password and Confirm New Password Should Be Equal");
    }
  };
  const validateEmail = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback();
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(value)) {
        callback();
      } else {
        callback("Invalid format of email");
      }
    }
  };

  return (
    <Row className="care-signin">
      {/* Left Div */}
      <Col xs={0} sm={0} lg={12} xl={14}>
        <div className="left-outer-div">
          <div className="inner-left-div">
            <div>
              <h1 className="heading-1">
                <span className="pink-color" style={{ color: "#3c3b91" }}>
                  {location?.pathname === "/login" ? "Sign In" : location?.pathname === "/sign-up" ? "Sign Up" :  location?.pathname === "/forget-password"?"Forgot Password":"Change Password"}
                </span>
                <span> to</span>
              </h1>
              <h3 className="heading-3">Play Book</h3>
            </div>
            {/* <div>
              <p className="p-tag-description-1">If you don't have an account register</p>
              <p className="p-tag-description-2">
                You can
                <span className="pink-color fw-600"> Register</span>
                <span> here!</span>
              </p>
            </div> */}
            <div className="demo-wrap">
              <div className="demo-content">
                <img src={LazyIcon} alt="care-library-icon" />
              </div>
            </div>
          </div>
        </div>
      </Col>
      {/* Right Div for form */}
      {location?.pathname === "/login" && (
        <Col xs={24} sm={24} lg={12} xl={10}>
          <div className="right-outer-div">
            <div className="img-div" style={{ textAlign: "center" }}></div>
            <div>
              <h2 className="Sign-in-heading">Sign In</h2>
              <Form name="emailOrUsername" onFinish={onFinish}>
                <Form.Item
                  name="emailOrUsername"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                    { validator: validateEmail },
                  ]}
                >
                  <Input placeholder="Username" className="input-style" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                  ]}
                >
                  {/* <Input.Password placeholder="Password" /> */}
                  <Input.Password
                    placeholder="Password"
                    className="input-style"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
                <p style={{ color: "red" }}>{errorMessage}</p>

                <div style={{ textAlign: "end", margin: "10px 0px 20px 0px" }}>
                  <Link to="/forget-password" className="forgot-password-style">
                    Forgot Password?
                  </Link>
                </div>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={signInLoading} className=" btn-signin fw-600 " block>
                    Sign In
                  </Button>
                  <div style={{ textAlign: "end", margin: "10px 0px 20px 0px" }}>
                    <Link to="/sign-up" className="forgot-password-style">
                      New to Play Book? <span style={{ textDecoration: "revert" }}>Sign Up</span>
                    </Link>
                  </div>
                </Form.Item>
              </Form>

              {/* <p className="fs-15-n-gray">
              Resend <span className="pink-color">Log In</span> Details
            </p> */}
            </div>
          </div>
        </Col>
      )}
      {/* Change Password */}
      {location?.pathname === "/change-password" && (
        <Col xs={24} sm={24} lg={12} xl={10}>
          <div className="right-outer-div">
            <div className="img-div" style={{ textAlign: "center" }}></div>
            <div>
              <h2 className="Sign-in-heading">Change Passwod</h2>
              <Form name="currentPassword" onFinish={onFinishChangePassword}>
                <Form.Item
                  name="currentPassword"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                  ]}
                >
                  <Input.Password placeholder="Current Password" className="input-style" />
                </Form.Item>
                <Form.Item
                  name="newPassword"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                  ]}
                >
                  {/* <Input.Password placeholder="Password" /> */}
                  <Input.Password
                    placeholder="New Password"
                    className="input-style"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
                <Form.Item
                  name="confirmNewPassword"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                  ]}
                >
                  {/* <Input.Password placeholder="Password" /> */}
                  <Input.Password
                    placeholder="Confirm New Password"
                    className="input-style"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
                <p style={{ color: "red" }}>{errorMessage}</p>
                <p style={{ color: "red" }}>{changePasswordErrorMessage}</p>

                <Form.Item>
                  <Button type="primary" htmlType="submit" className=" btn-signin fw-600 " block>
                    Save Password
                  </Button>
                </Form.Item>
              </Form>

              {/* <p className="fs-15-n-gray">
              Resend <span className="pink-color">Log In</span> Details
            </p> */}
            </div>
          </div>
        </Col>
      )}
      {location?.pathname === "/sign-up" && (
        <Col xs={24} sm={24} lg={12} xl={10}>
          <div className="right-outer-div">
            <div className="img-div" style={{ textAlign: "center" }}></div>
            <div>
              <h2 className="Sign-in-heading" style={{ textDecoration: "revert" }}>
                Sign Up
              </h2>
              <Form name="currentPassword" onFinish={onFinishSignUp}>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                  ]}
                >
                  <Input placeholder="Username" className="input-style" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                    { validator: validateEmail },
                  ]}
                >
                  <Input placeholder="Useremail" className="input-style" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                  ]}
                >
                  {/* <Input.Password placeholder="Password" /> */}
                  <Input.Password
                    placeholder="Password"
                    className="input-style"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                  ]}
                >
                  {/* <Input.Password placeholder="Password" /> */}
                  <Input.Password
                    placeholder="Confirm  Password"
                    className="input-style"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
                <p style={{ color: "red" }}>{errorMessage}</p>
                <p style={{ color: "red" }}>{changePasswordErrorMessage}</p>

                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={signUpLoading} className=" btn-signin fw-600 " block>
                    Save
                  </Button>
                </Form.Item>
              </Form>

              {/* <p className="fs-15-n-gray">
              Resend <span className="pink-color">Log In</span> Details
            </p> */}
            </div>
          </div>
        </Col>
      )}
      {location?.pathname === "/forget-password" && (
        <Col xs={24} sm={24} lg={12} xl={10}>
          <div className="right-outer-div">
            <div className="img-div" style={{ textAlign: "center" }}></div>
            <div>
              <h2 className="Sign-in-heading" style={{ textDecoration: "revert" }}>
                Forget Password
              </h2>
              <Form name="currentPassword" onFinish={onFinishForgetPassword}>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                  ]}
                >
                  <Input style={{ color: "white" }} placeholder="Enter Email" className="input-style" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={forgotPasswordLoading} className=" btn-signin fw-600 " block>
                    Save
                  </Button>
                </Form.Item>
              </Form>

              {/* <p className="fs-15-n-gray">
              Resend <span className="pink-color">Log In</span> Details
            </p> */}
            </div>
          </div>
        </Col>
      )}
      {location?.pathname === "/reset-password" && (
        <Col xs={24} sm={24} lg={12} xl={10}>
          <div className="right-outer-div">
            <div className="img-div" style={{ textAlign: "center" }}></div>
            <div>
              <h2 className="Sign-in-heading">New Password</h2>
              <Form name="password" onFinish={onFinishNewPassword}>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                  ]}
                >
                  {/* <Input.Password placeholder="Password" /> */}
                  <Input.Password
                    placeholder="New Password"
                    className="input-style"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
                <Form.Item
                  name="confirmNewPassword"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                  ]}
                >
                  {/* <Input.Password placeholder="Password" /> */}
                  <Input.Password
                    placeholder="Confirm New Password"
                    className="input-style"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={isLoadingNewPassword} className=" btn-signin fw-600 " block>
                    Save
                  </Button>
                </Form.Item>
              </Form>

              {/* <p className="fs-15-n-gray">
              Resend <span className="pink-color">Log In</span> Details
            </p> */}
            </div>
          </div>
        </Col>
      )}
    </Row>
  );
};

export default Login;
