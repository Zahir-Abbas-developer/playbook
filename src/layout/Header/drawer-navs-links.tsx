import { Fragment, useEffect, useState } from "react";
import { navItems } from "./nav-data";
// import Logo from "../assets/images/brands/Final-Clock.gif";
import { useLocation, useNavigate } from "react-router-dom";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import "./navbar.styles.scss";
import { Switch } from "antd";


interface Props {
  setToggleDrawer: any;
  toggleDrawer: any;
}
const DrawerNavsLinks = (props: any) => {
  const { setToggleDrawer, toggleDrawer,isDarkMode,setIsDarkMode } = props;
  const [toggleDropDown, setToggleDropDown] = useState({ open: false, id: "" });
  const [active, setActive] = useState<string>("Dashboard");
  const [activeChild, setActiveChild] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Getting user role from  local storage
  // const userData: any = JSON.parse(localStorage.getItem("UserData") || "{}");
  const { role,permissions }: any = JSON.parse(
    localStorage.getItem("user") || "{}"
  );


  useEffect(() => {
    navItems?.map((e: any) => {
      e?.path.includes(pathname) && setActive(e?.title);
      e?.subItems?.map((subitem: any) => {
        if (`/${subitem?.path}` === pathname) {
          setActive(e.title);
          setActiveChild(subitem.title);
        }
      });
    });
  }, [pathname]);
  return (
    <div className="drawer_main header-main-wrapper-ecommerce-sidebar">
      <div className="drawer-header" style={{ textAlign: "center" }}>
        {/* <img src={Logo} alt="Logo" height={75} /> */}
      </div>

      <div className="drawer-menus">
        <ul className="m-0">
          {navItems.map((items: any) => (
            <li
              style={{
                color: active === items.title ? "#3c3b91" : "black",
                listStyle: "none",
              }}
              key={items.title}
            >
              {items.toshowforrole.includes(role ?role: "newUser") && (
                <div
                  className={
                    (items.subItems &&
                      toggleDropDown.open &&
                      toggleDropDown.id === items.title) ||
                    active === items.title
                      ? "activeDrawerList"
                      : "drawerList_items"
                  }
                >
                  <img src={items.lightIcon} alt="icons" className="icons-size" height={20} width={20} />
                  <p
                    className="drawerList_text"
                    onClick={() => {
                      setToggleDropDown({
                        open: !toggleDropDown.open ? true : false,
                        id: !toggleDropDown.id ? items.title : "",
                      });
                      if (
                       role === "user" &&
                        items.title === "Reports"
                      ) {
                        navigate("reports/project-task/1");
                        setActive("Reports");
                      } else {
                        navigate(items.path);
                        setActive(items.title);
                      }
                      setToggleDrawer({
                        ...toggleDrawer,
                        open: items?.subItems ? true : false,
                        type: "navbar",
                      });
                    }}
                  >
                    {items.title}
                    {items.subItems &&
                      (toggleDropDown.open &&
                      toggleDropDown.id === items.title ? (
                        <UpOutlined style={{ fontSize: "10px" }} />
                      ) : (
                        <DownOutlined style={{ fontSize: "10px" }} />
                      ))}
                  </p>
                </div>
              )}
              {toggleDropDown.open && toggleDropDown.id === items.title && (
                <div className="drawerList_subItems">
                  {items?.subItems &&
                    items?.subItems?.map((item: any) => (
                      <Fragment key={uuidv4()}>
                        {item.toshowforrole.includes(role) && (
                          <p
                            className="fs-12"
                            onClick={() => {
                              navigate(item.path);
                              setActiveChild(item.title);
                              setToggleDrawer({
                                ...toggleDrawer,
                                open: false,
                                type: "navbar",
                              });
                            }}
                            style={{
                              color:
                                activeChild === item.title ? "#3c3b91" : "",
                            }}
                            // onClick={() => {
                            //   setActive(item.title);
                            //   navigate(item.path);
                            //   setToggleDrawer({ ...toggleDrawer, open: false, type: "navbar" });
                            // }}
                            // style={{ color: active === item.title ? "#e76f51" : "black", listStyle: "none" }}
                          >
                            {item.title}
                          </p>
                        )}
                      </Fragment>
                    ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Switch
      style={{position:"absolute",bottom:"120px"}}
            className="switch fs-12"
            checkedChildren="Dark"
            unCheckedChildren="Light"
            onChange={() => setIsDarkMode(!isDarkMode)}
          />
    </div>
  );
};

export default DrawerNavsLinks;
