
// Dark Mode Icons
import shoes from "../../assets/icons/sidebar/sport-shoe.png";
import jacket from "../../assets/icons/sidebar/jacket.png";
import contact from "../../assets/icons/contact-us.png";
import color from "../../assets/icons/sidebar/color-picker.png";
import order from "../../assets/icons/sidebar/order.png";
import add from "../../assets/icons/sidebar/add.png";
import filing from "../../assets/icons/sidebar/filing-cabinet.png";
import category from "../../assets/icons/sidebar/add-product.png";



export const navItems = [
  {
    toshowforrole: [
      "admin",
    ],
    title: "HOME",
    path: "/admin-dashboard",
    lightIcon: jacket,
    alt: "dashboard",
    
  },
  {
    toshowforrole: [
       'user',"newUser"
    ],
    title: "Grounds",
    path: "/dashboard",
    lightIcon: shoes,
    alt: "dashboard",
    subItems: [
      {
        toshowforrole: [
          'user',"newUser"
        ],
        title: "Cricket",
        path: "/dashboard",
        shoeType:"OxfordandDerby"
      },
      {
        toshowforrole: [
          'user',"newUser"
        ],
        title: "Football",
        path: "/dashboard",
        shoeType:"Loafers"
      },
      {
        toshowforrole: [
          'user',"newUser"
        ],
        title: "Hockey",
        path: "/dashboard",
        shoeType:"Monks"
      },
      {
        toshowforrole: [
          'user',"newUser"
        ],
        title: "Badminton",
        path: "/dashboard",
        shoeType:"Boots"
      },
    ],
  },
  {
    toshowforrole: [
       'user',"newUser"
    ],
    title: "Parks",
    path: "/jacket-details",
    lightIcon: jacket,
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
