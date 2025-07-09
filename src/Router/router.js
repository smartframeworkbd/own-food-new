import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import ProductsDetailsPage from "../Pages/ProductsDetailsPage";
import SellerProfilePage from "../Pages/SellerProfilePage";
import CategoryPage from "../Pages/CategoryPage";
import SearchPage from "../Pages/SearchPage";

import AllRecipeCategoryPage from "../Pages/AllRecipeCategoryPage";
import SingleRecipeCategoryAllFoodPage from "../Pages/SingleRecipeCategoryAllFoodPage";
import SingleRecipeFoodPage from "../Pages/SingleRecipeFoodPage";
import FaqPage from "../Pages/FaqPage";
import CountryCategoryPage from "../Pages/CountryCategoryPage";
import CustomerRegistrationPage from "../Pages/CustomerRegistrationPage";
import CreateFood from "../Components/ChildComponents/CreateFood";
import WishOrder from "../Components/ChildComponents/WishOrder";

import FoodsDairyPage from "../Pages/FoodsDairyPage";
import CheckOutPage from "../Pages/CheckOutPage";
import CustomerLoginPage from "../Pages/CustomerLoginPage";
import ForgetPasswordPage from "../Pages/ForgetPasswordPage";
import OTPPage from "../Pages/OTPPage";
import ResetPasswordPage from "../Pages/ResetPasswordPage";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import FoodGallery from "../Components/ChildComponents/FoodGallery";
import UpdateSellerProfile from "../Pages/UpdateSellerProfile";
import PaymentSuccess from "../Components/ChildComponents/PaymentSuccess";
import AllRecipeCategoryComponent from "../Components/RootComponents/AllRecipeCategoryComponent.jsx";
import WhatsAppOTP from "../Components/ChildComponents/WhatsAppOTP";
import WhastsAppOTPComponent from "../Components/RootComponents/WhastsAppOTPComponent";

import Sample from "../Sample/Sample.jsx";
import Terms from "../Components/ChildComponents/Terms";
import SellerProfile from "../Components/ChildComponents/SellerProfile.jsx";
import AllFoodSeller from "../Components/ChildComponents/SellerComponents/AllFoodSeller.jsx";
import InstantFoodSeller from "../Components/ChildComponents/SellerComponents/InstantFoodSeller.jsx";
import CateringFoodSeller from "../Components/ChildComponents/SellerComponents/CateringFoodSeller.jsx";
import ExperimentalFood from "../Components/ChildComponents/SellerComponents/ExperimentalFood.jsx";
import Review from "../Components/ChildComponents/SellerComponents/Review.jsx";
import SellerRecipe from "../Components/ChildComponents/SellerComponents/SellerRecipe.jsx";
import SellerDiary from "../Components/ChildComponents/SellerComponents/SellerDiary.jsx";
import AmazingDish from "../Components/ChildComponents/SellerComponents/AmazingDish.jsx";
import CateringOrder from "../Components/ChildComponents/CateringOrder.jsx";
import WishOrderMash from "../Components/ChildComponents/WishOrderMash.jsx";
import PreOrderFoodSeller from "../Components/ChildComponents/SellerComponents/PreOrderFoodSeller.jsx";
import BottomBar from "../MobileLayout/BottomBar.jsx";
import HomeLayout from "../Components/RootComponents/HomeLayout.jsx";
import PrintComponent from "../Components/Common/Print/PrintComponent.jsx";
import AboutUs from "../Components/RootComponents/AboutUs.jsx";
import ContactUs from "../Components/RootComponents/ContactUs.jsx";
import EarnMoney2 from "../Components/ChildComponents/EarnMoney2.jsx";
import NewHomePage from "../Pages/NewHomePage.jsx";
import KitchenProfile from "../Components/Kitchen/KitchenProfile/KitchenProfile.jsx";
import Kitchen from "../Components/Kitchen/Kitchen.jsx";
import AllFood from "../Components/AllFoodParent/AllFood/AllFood.jsx";

export const routes = createBrowserRouter([

  {
    path: '/',
    element: <HomeLayout />,
    children: [
      //      {
      //   path: "/",
      //   element: <HomePage />,
      // },

      {
        path: "/",
        element: <NewHomePage />
      },
      {
        path:"/all-food",
        element:<AllFood/>
      },
      {
        path: "/kitchen/:id",
        element: <Kitchen />
      },
      {
        path: "/ProductsDetails/:id",
        element: <ProductsDetailsPage />,
      },
      {
        path: "/SellerProfile/:id",
        element: <UpdateSellerProfile />,


        children: [
          {
            path: "",
            element: <AllFoodSeller />,
          },
          {
            path: "instant",
            element: <InstantFoodSeller />,
          },
          {
            path: "catering",
            element: <CateringFoodSeller />,
          },
          {
            path: "experimental",
            element: <ExperimentalFood />,
          },
          {
            path: "amazing-dish",
            element: <AmazingDish />,
          },
          {
            path: "near-seller",
            element: <h1>not found</h1>,

          },

          {
            path: "wish-order",
            element: <h1>not found </h1>,
            // element: <WishOrder />,
          },

          {
            path: "pre-order",
            element: <PreOrderFoodSeller />,
          },
          // {
          //   path: "pre-order",
          //   element: <h1>pre order food</h1>,
          // },
          {
            path: "review",
            element: <Review />,
          },
          {
            path: "recipe",
            // element:<h1>not found</h1>
            element: <SellerRecipe />,
          },
          {
            path: "diary",
            // element:<h1>not found</h1>
            element: <SellerDiary />,
          },
          // {
          //   path:'',
          //   element:<AllRecipeCategoryComponent/>,
          // },
          // {
          //   path:'All-SellerFood',
          //   element:<AllRecipeCategoryComponent/>
          // }
        ],
      },
      {
        path: "/Category/:id",
        element: <CategoryPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/AllRecipe",
        element: <AllRecipeCategoryComponent />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/earn-money",
        element: <EarnMoney2 />,
      },

      {
        path: "/SingleRecipeCategoryAllFood/:id",
        element: <SingleRecipeCategoryAllFoodPage />,
      },
      {
        path: "/SingleRecipeFood/:id",
        element: <SingleRecipeFoodPage />,
      },

      {
        path: "/Faq",
        element: <FaqPage />,
      },
      {
        path: "/CountryCategory",
        element: <CountryCategoryPage />,
      },
      {
        path: "/CustomerRegistration",
        element: <CustomerRegistrationPage />,
      },
      {
        path: "/createfood",
        element: <CreateFood />,
      },
      {
        path: "/FoodsDairyPage/",
        element: <FoodsDairyPage />,
      },
      {
        path: "/CheckOut",
        element: (
          <PrivateRoute>
            <CheckOutPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/CustomerLogin",
        element: <CustomerLoginPage />,
      },
      {
        path: "/ForgetPassword",
        element: <ForgetPasswordPage />,
      },
      {
        path: "/forget-password-otp",
        element: <OTPPage />,
      },
      {
        path: "/Reset-Password",
        element: <ResetPasswordPage />,
      },
      {
        path: "/food",
        element: <FoodGallery />,
      },
      {
        path: "/updateProfile",
        element: <UpdateSellerProfile />,
      },
      {
        path: "/updateProfile1",
        element: <SellerProfile />,
      },

      {
        path: "/catering-order",
        element: <CateringOrder />,
      },
      {
        path: "/wish-order",
        element: <WishOrder />,
      },
      // {
      //   path: "/wish-order",
      //   element: <WishOrderMash />,
      // },

      {
        path: "/payment",
        element: <PaymentSuccess />,
      },

      {
        path: "/OTP",
        element: <WhastsAppOTPComponent />,
      },

      // {
      //   path: "/sample",
      //   element: <Sample></Sample>,
      // },

      {
        path: "/terms",
        element: <Terms></Terms>,
      },

    ]

  },
  {
    path: "/print-order",
    element: <PrintComponent />
  }
  // {
  //   path: "/",
  //   element: <HomePage />,
  // },
  // {
  //   path: "/ProductsDetails/:id",
  //   element: <ProductsDetailsPage />,
  // },
  // {
  //   path: "/SellerProfile/:id",
  //   element: <UpdateSellerProfile />,
  //   children: [
  //     {
  //       path: "",
  //       element: <AllFoodSeller />,
  //     },
  //     {
  //       path: "instant",
  //       element: <InstantFoodSeller />,
  //     },
  //     {
  //       path: "catering",
  //       element: <CateringFoodSeller />,
  //     },
  //     {
  //       path: "experimental",
  //       element: <ExperimentalFood />,
  //     },
  //     {
  //       path: "amazing-dish",
  //       element: <AmazingDish />,
  //     },
  //     {
  //       path: "near-seller",
  //       element: <h1>not found</h1>,
  //     },

  //     {
  //       path: "wish-order",
  //       element: <h1>not found </h1>,
  //       // element: <WishOrder />,
  //     },

  //     {
  //       path: "pre-order",
  //       element: <PreOrderFoodSeller />,
  //     },
  //     // {
  //     //   path: "pre-order",
  //     //   element: <h1>pre order food</h1>,
  //     // },
  //     {
  //       path: "review",
  //       element: <Review />,
  //     },
  //     {
  //       path: "recipe",
  //       // element:<h1>not found</h1>
  //       element: <SellerRecipe />,
  //     },
  //     {
  //       path: "diary",
  //       // element:<h1>not found</h1>
  //       element: <SellerDiary />,
  //     },
  //     // {
  //     //   path:'',
  //     //   element:<AllRecipeCategoryComponent/>,
  //     // },
  //     // {
  //     //   path:'All-SellerFood',
  //     //   element:<AllRecipeCategoryComponent/>
  //     // }
  //   ],
  // },
  // {
  //   path: "/Category/:id",
  //   element: <CategoryPage />,
  // },
  // {
  //   path: "/search",
  //   element: <SearchPage />,
  // },
  // {
  //   path: "/Recipes",
  //   element: <AllRecipeCategoryPage />,
  // },
  // {
  //   path: "/AllRecipe",
  //   element: <AllRecipeCategoryComponent />,
  // },

  // {
  //   path: "/SingleRecipeCategoryAllFood/:id",
  //   element: <SingleRecipeCategoryAllFoodPage />,
  // },
  // {
  //   path: "/SingleRecipeFood/:id",
  //   element: <SingleRecipeFoodPage />,
  // },
  // {
  //   path: "/CustomerRegistration",
  //   element: <CustomerRegistrationPage />,
  // },
  // {
  //   path: "/Faq",
  //   element: <FaqPage />,
  // },
  // {
  //   path: "/CountryCategory",
  //   element: <CountryCategoryPage />,
  // },
  // {
  //   path: "/createfood",
  //   element: <CreateFood />,
  // },
  // {
  //   path: "/FoodsDairyPage/",
  //   element: <FoodsDairyPage />,
  // },
  // {
  //   path: "/CheckOut",
  //   element: (
  //     <PrivateRoute>
  //       <CheckOutPage />
  //     </PrivateRoute>
  //   ),
  // },
  // {
  //   path: "/CustomerLogin",
  //   element: <CustomerLoginPage />,
  // },
  // {
  //   path: "/ForgetPassword",
  //   element: <ForgetPasswordPage />,
  // },
  // {
  //   path: "/forget-password-otp",
  //   element: <OTPPage />,
  // },
  // {
  //   path: "/Reset-Password",
  //   element: <ResetPasswordPage />,
  // },
  // {
  //   path: "/food",
  //   element: <FoodGallery />,
  // },
  // {
  //   path: "/updateProfile",
  //   element: <UpdateSellerProfile />,
  // },
  // {
  //   path: "/updateProfile1",
  //   element: <SellerProfile />,
  // },

  // {
  //   path: "/catering-order",
  //   element: <CateringOrder />,
  // },
  // {
  //   path: "/wish-order",
  //   element: <WishOrder />,
  // },
  // {
  //   path: "/wish-order-mash",
  //   element: <WishOrderMash />,
  // },

  // {
  //   path: "/payment",
  //   element: <PaymentSuccess />,
  // },
  // {
  //   path: "/payment/error",
  //   element: <PaymentSuccess />,
  // },
  // {
  //   path: "/OTP",
  //   element: <WhastsAppOTPComponent />,
  // },

  // {
  //   path: "/sample",
  //   element: <Sample></Sample>,
  // },

  // {
  //   path: "/terms",
  //   element: <Terms></Terms>,
  // },
  // {
  //   path:"mobile",
  //   element:<BottomBar/>
  // }
]);
