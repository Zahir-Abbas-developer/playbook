

// Dark Mode Icons
import shoes from "../../assets/icons/ground.png";
import parks from "../../assets/icons/park.png";
import contact from "../../assets/icons/contact-us.png";
import color from "../../assets/icons/sidebar/color-picker.png";
import order from "../../assets/icons/sidebar/order.png";
import add from "../../assets/icons/sidebar/add.png";
import filing from "../../assets/icons/sidebar/filing-cabinet.png";
import category from "../../assets/icons/sidebar/add-product.png";
import home from "../../assets/icons/home.png";


export const navItems = [
  {
    toshowforrole: [
      'user',"newUser"
    ],
    title: "HOME",
    path: "/services",
    lightIcon: home,
    alt: "dashboard",
    
  },
  {
    toshowforrole: [
       'user',"newUser"
    ],
    title: "Grounds",
    path: "/select-grounds",
    lightIcon: shoes,
    alt: "dashboard",
  },
  {
    toshowforrole: [
       'user',"newUser"
    ],
    title: "Parks",
    path: "/services",
    lightIcon: parks,
    alt: "dashboard"
  },
  {
    toshowforrole: [
       'user',"newUser"
    ],
    title: "Contact Us",
    path: "/contact-details",
    lightIcon: contact,
    alt: "dashboard"
  },
  {
    toshowforrole: [
       'admin',
    ],
    title: "PRODUCTS",
    path: "/add-products",
    lightIcon: add,
    alt: "dashboard"
  },
  {
    toshowforrole: [
       'admin',
    ],
    title: "CATEGORIES",
    path: "/add-categories",
    lightIcon: category,
    alt: "dashboard"
  },
  
  {
    toshowforrole: [
       'admin',
    ],
    title: "COLORS",
    path: "/add-colors",
    lightIcon: color,
    alt: "dashboard"
  },
  {
    toshowforrole: [
       'admin',
    ],
    title: "STYLES",
    path: "/add-styles",
    lightIcon: filing,
    alt: "dashboard"
  },
  {
    toshowforrole: [
       'admin',
    ],
    title: "ORDERS",
    path: "/add-orders",
    lightIcon: order,
    alt: "dashboard"
  },
  
 


];
