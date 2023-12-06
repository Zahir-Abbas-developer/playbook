

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
    darkIcon:home,
    alt: "dashboard",
    
  },
  {
    toshowforrole: [
       'user',"newUser"
    ],
    title: "Grounds",
    path: "/select-grounds",
    lightIcon: shoes,
    darkIcon: shoes,
    alt: "dashboard",
  },
  {
    toshowforrole: [
       'user',"newUser"
    ],
    title: "Parks",
    path: "/park-details",
    lightIcon: parks,
    darkIcon: parks,
    alt: "dashboard"
  },
  {
    toshowforrole: [
       'user',"newUser"
    ],
    title: "Contact Us",
    path: "/contact-details",
    lightIcon: contact,
    darkIcon: contact,
    alt: "dashboard"
  },
  {
    toshowforrole: [
       'admin',
    ],
    title: "GROUNDS",
    path: "/add-products",
    lightIcon: add,
    darkIcon: add,
    alt: "dashboard"
  },
  {
    toshowforrole: [
       'admin',
    ],
    title: "PARKS",
    path: "/add-parks",
    lightIcon: category,
    darkIcon: category,
    alt: "dashboard"
  },
  
  {
    toshowforrole: [
       'admin',
    ],
    title: "GROUND CATEGORIES",
    path: "/add-categories",
    lightIcon: add,
    darkIcon: add,
    alt: "dashboard"
  },
  {
    toshowforrole: [
       'admin',
    ],
    title: "GROUND LOCATIONS",
    path: "/add-colors",
    lightIcon: add,
    darkIcon: add,
    alt: "dashboard"
  },
  {
    toshowforrole: [
       'admin',
    ],
    title: "PARK LOCATIONS",
    path: "/add-park-location",
    lightIcon: add,
    darkIcon: add,
    alt: "dashboard"
  },
  
 
  {
    toshowforrole: [
       'admin',
    ],
    title: "ORDERS",
    path: "/add-orders",
    lightIcon: order,
    darkIcon: order,
    alt: "dashboard"
  },
  
 


];
