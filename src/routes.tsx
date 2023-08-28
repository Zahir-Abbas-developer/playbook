import { FC, lazy, LazyExoticComponent, Suspense } from "react";
import { Navigate } from "react-router-dom";

import Login from "./components/Authentication/Login";
import NotFound from "./components/Authentication/NotFound";
import SignUp from "./components/Authentication/SignUp";
import Unathorized from "./components/Authentication/Unathorized";
import ResetPassword from "./components/Authentication/ResetPassword";
import RequireAuth from "./components/Authentication/RequireAuth";
import LoadingSvg from "../src/assets/Login/loader-icon.gif";
import { ROLES } from "./constants/Roles";
import path from "path";
import AddStyles from "./components/Admin/AddStyles/AddStyles";
import OurCollectionTabDetails from "./components/ClientTabs/OurCollectionTabDetails/OurCollectionTabDetails";
import OurCustomOrderDetails from "./components/ClientTabs/CustomOrderTabDetails/CustomOrderTabDetails";
import DashboardLayout from "./layout/Header/dashboard.layout";

const Loadable = (Component: LazyExoticComponent<FC>) => (props: any) =>
(
  <Suspense
    fallback={
      <div className="d-flex justify-center align-center" style={{ height: "80vh" }}>
        <img src={LoadingSvg} height={200} width={200} alt="LoadingSvg" />
      </div>
    }
  >
    <Component {...props} />
  </Suspense>
);

const ReviewCareHomesPage = Loadable(lazy(() => import("./pages/Ratings")));

const DashboardPage = Loadable(lazy(() => import("./pages/Dashboard")));
const JacketDetailsPage = Loadable(lazy(() => import("./pages/JacketDetails")));

const OverAllRatingsPage = Loadable(lazy(() => import("./pages/OverAllRatings")));

const ProductDetailsPage = Loadable(lazy(() => import("./pages/ProductDetails")));
const BillingDetailsPage = Loadable(lazy(() => import("./pages/BillingDetails")));
const SelectGroundPage = Loadable(lazy(() => import("./pages/SelectGrounds")));
const SelectGroundLocationPage = Loadable(lazy(() => import("./pages/SelectGroundLocation")));
//Cart Details
const CartDetailsPage = Loadable(lazy(() => import("./pages/CartDetails")));
//UserVerification page
const UserVerficationPage = Loadable(lazy(() => import("./pages/UserVerification")));

const StaffAllocationPage = Loadable(lazy(() => import("./pages/StaffAllocation")));

const AddProductsPage = Loadable(lazy(() => import("./pages/AddProducts")));
const AddCategoriesPage = Loadable(lazy(() => import("./pages/AddCategories")));
const AddColorsPage = Loadable(lazy(() => import("./pages/AddColors")));
const AddStylesPage = Loadable(lazy(() => import("./pages/AddStyles")));
const AddOrdersPage = Loadable(lazy(() => import("./pages/AddOrders")));
const ClientFeedBackPage = Loadable(lazy(() => import("./pages/ClientFeedback")));
const AdminFeedBackPage = Loadable(lazy(() => import("./pages/AdminFeedback")));
const AddParks=Loadable(lazy(()=>import("./pages/AddParks")))


// Reports and its Child Routes Ends Here

const SettingsPage = Loadable(lazy(() => import("./pages/Settings")));
const RatingsFeedback = Loadable(lazy(() => import("./pages/RatingAndFeedback")));

const KeyInfo = Loadable(lazy(() => import("./pages/Settings/KeyInfo")));
const JobRole = Loadable(lazy(() => import("./pages/Settings/JobRole")));
const ShiftTimeSettings = Loadable(lazy(() => import("./pages/Settings/ShiftTimeSettings")));
const Services = Loadable(lazy(() => import("./components/ClientTabs/Services/Services")));
const StaffSettings = Loadable(lazy(() => import("./pages/Settings/StaffSettings")));
const BankHolidays = Loadable(lazy(() => import("./pages/Settings/BankHolidays")));
const DBSConfiguration = Loadable(lazy(() => import("./pages/Settings/DBSConfiguration")));
const EmailNotification = Loadable(lazy(() => import("./pages/Settings/EmailNotification")));
const ResetEmailPhone = Loadable(lazy(() => import("./pages/Settings/ResetEmailPhone")));
const WeekStartDay = Loadable(lazy(() => import("./pages/Settings/WeekStartDay")));
const ClientTermsCondition = Loadable(lazy(() => import("./pages/Settings/ClientTermsConditionPage")));
const FestivalDayGreeting = Loadable(lazy(() => import("./pages/Settings/FestivalDayGreeting")));
const BreakTime = Loadable(lazy(() => import("./pages/Settings/BreakTime")));
const ChangePassword = Loadable(lazy(() => import("./pages/Settings/ChangePassword")));
const ElectronicAttendanceMonitoring = Loadable(lazy(() => import("./pages/Settings/ElectronicAttendanceMonitoring")));

const ContactDetailsPage = Loadable(lazy(() => import("./pages/ContactDetails")));
const AddParkLocationPage=Loadable(lazy(()=>import("./pages/AddParkLocation")))
export const routes: any = [
  { path: "/", element: <Navigate to="services" /> },

  {
    path: "login",
    element: <Login />,
  },
  { path: "forget-password", element: <Login /> },
  {
    path: "change-password",
    element: <Login />,
  },
  {
    path: "user-verification",
    element: <UserVerficationPage />,
  },
  {
    path: "reset-password",
    element: <Login />,
  },
  {
    path: "sign-up",
    element: <Login />,
  },
  {
    path: "unauthorized",
    element: <Unathorized />,
  },
  {
    path: "reset-password",
    element: <ResetPassword />,
  },

  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "services",
        element: (
          // <RequireAuth allowedRoles={[ROLES.superAdmin]}>
          <Services />
          // </RequireAuth>
        ),
      },
      {
        path: "admin-dashboard",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin]}>
            <StaffAllocationPage />
          </RequireAuth>
        ),
      },
      {
        path:"feedback",
        element:<RequireAuth
        allowedRoles={[ROLES.user]}
        >
        {" "}
        <AdminFeedBackPage/>
        </RequireAuth> 
      },
      {
        path:"feedback-details",
        element:<RequireAuth
        allowedRoles={[ROLES.user]}
        >
        {" "}
        <ClientFeedBackPage/>
        </RequireAuth> 
      },
      {
        path: "select-grounds",
        element: <RequireAuth
        allowedRoles={[ROLES.user]}
        >
        {" "}
        <SelectGroundPage />,
        </RequireAuth> 
      },
      {
        path: "select-stadium-location",
        element:   <RequireAuth
        allowedRoles={[ROLES.user]}
        >
        {" "}
        <SelectGroundLocationPage />,
        </RequireAuth> 
      },
      {
        path: "dashboard",
        element: (
          // <RequireAuth allowedRoles={[ROLES.user]}>
          <DashboardPage />
          //  </RequireAuth>
        ),
      },
      {
        path: "contact-details",
        element:<RequireAuth
        allowedRoles={[ROLES.user]}
        >
        {" "}
       <ContactDetailsPage />,
        </RequireAuth>  
      },
      {
        path: "productDetails",
        element:<RequireAuth
        allowedRoles={[ROLES.admin]}
        >
        {" "}
        <ProductDetailsPage />,
        </RequireAuth> 
      },
      {
        path: "/productDetails/cart-details/checkout-details",

        element: <BillingDetailsPage />,
      },
      {
        path: "/add-products",
        element: (
          <RequireAuth
          allowedRoles={[ROLES.admin]}
          >
          {" "}
          <AddProductsPage />
          </RequireAuth>
        ),
      },
      {
        path: "/add-parks",
        element: (
          <RequireAuth
          allowedRoles={[ROLES.admin]}
          >
          {" "}
          <AddParks />
          </RequireAuth>
        ),
      },
      {
        path: "/jacket-details",
        element: <JacketDetailsPage />,
      },
      {
        path: "/add-categories",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin]}>
          <AddCategoriesPage />
           </RequireAuth>
        ),
      },
      {
        
        path: "/add-park-location",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin]}>
          <AddParkLocationPage/>
          </RequireAuth>
        ),
      },
      {
        path: "/add-orders",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin]}>
            <AddOrdersPage />
          </RequireAuth>
        ),
      },
      {
        path: "/add-colors",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin]}>
          <AddColorsPage />
           </RequireAuth>
        ),
      },
      {
        path: "/add-styles",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin]}>
            <AddStyles />
          </RequireAuth>
        ),
      },

      {
        path: "productDetails/cart-details",
        element: <CartDetailsPage />,
      },

      {
        path: "shoes-products",
        element: (
          <RequireAuth allowedRoles={[ROLES.user]}>
            <OurCollectionTabDetails />
          </RequireAuth>
        ),
      },

    
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
