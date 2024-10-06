import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  HomePage,
  AboutPage,
  ContactPage,
  AllListingsPage,
  StudentSiguupPage,
  StudentLoginPage,
  ActivationPage,
  StudentProfilePage,
  ListingDetailsPage,
  CategoryListingsPage,
  StudentInboxPage,
} from "./routes/Routes.js";
import {
  OwnerSignupPage,
  OwnerLoginPage,
  OwnerActivationPage,
  OwnerHomePage,
  OwnerDashboardPage,
  OwnerDashboardListingsPage,
  OwnerDashboardCreateListingPage,
  OwnerDashboardUpdateListingPage,
  OwnerDashboardSubscriptionsPage,
  OwnerDashboardPaymentsPage,
  OwnerDashboardPremiumPage,
  PaymentPage,
  OrderSuccessPage,
  OwnerDashboardMessagesPage
} from "./routes/OwnerRoutes.js";

import {
  AdminLoginPage,
  AdminDashboardPage,
  AdminDashboardListingsPage,
  AdminDashboardOwnersPage,
  AdminDashboardStudentsPage,
  AdminDashboardSubscriptionsPage,
  AdminDashboardPaymentsPage,
  AdminDashboardPremiumPage,
  AdminDashboardQueriesPage,
} from "./routes/AdminRoutes.js";

const App = () => {

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/payment" element={<PaymentPage/>}/>
        {/* Coutomer
         */}
        <Route path="/sign-up" element={<StudentSiguupPage />} />
        <Route path="/login" element={<StudentLoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route path="/profile" element={<StudentProfilePage />} />
        <Route path="/inbox" element={<StudentInboxPage/>}/>

        {/* Listing */}
        <Route path="/all-listings" element={<AllListingsPage />} />
        <Route path="/listing/:id" element={<ListingDetailsPage />} />
        <Route path="/category/:category" element={<CategoryListingsPage />} />

        {/* Owner */}
        <Route path="/owner-sign-up" element={<OwnerSignupPage />} />
        <Route path="/owner-login" element={<OwnerLoginPage />} />

        <Route
          path="/owner/activation/:activation_token"
          element={<OwnerActivationPage />}
        />
        {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
        <Route path="/order/success" element={<OrderSuccessPage />} />

        <Route path="/owner-profile" element={<OwnerHomePage />} />
        <Route path="/owner-dashboard" element={<OwnerDashboardPage />} />
        <Route
          path="/owner-dashboard-listings"
          element={<OwnerDashboardListingsPage />}
        />
        <Route
          path="/owner-dashboard-create-listing"
          element={<OwnerDashboardCreateListingPage />}
        />
        <Route
          path="/owner-dashboard-update-listing"
          element={<OwnerDashboardUpdateListingPage />}
        />
        <Route
          path="/owner-dashboard-subscriptions"
          element={<OwnerDashboardSubscriptionsPage />}
        /> 
        <Route
          path="/owner-dashboard-payments"
          element={<OwnerDashboardPaymentsPage />}
        />
        <Route
          path="/owner-dashboard-premiums"
          element={<OwnerDashboardPremiumPage />}
        />
        <Route
          path="/owner-dashboard-messages"
          element={<OwnerDashboardMessagesPage/>}
        />
        <Route path="/order/success" element={<OrderSuccessPage />} />

        {/* Admin */}

        <Route path="/system-admin-login" element={<AdminLoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        <Route
          path="/admin-dashboard-listings"
          element={<AdminDashboardListingsPage />}
        />
        <Route
          path="/admin-dashboard-owners"
          element={<AdminDashboardOwnersPage />}
        />
        <Route
          path="/admin-dashboard-students"
          element={<AdminDashboardStudentsPage />}
        />
        <Route
          path="/admin-dashboard-subscriptions"
          element={<AdminDashboardSubscriptionsPage />}
        />
        <Route
          path="/admin-dashboard-payments"
          element={<AdminDashboardPaymentsPage />}
        />
        <Route
          path="/admin-dashboard-premiums"
          element={<AdminDashboardPremiumPage />}
        />
        <Route
          path="/admin-dashboard-queries"
          element={<AdminDashboardQueriesPage />}
        />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
};

export default App;
