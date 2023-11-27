import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation";
import Service from "../pages/service/Service";
import PasswordVerification from "../pages/login/PasswordVerification";
import { PAGE_NAMES } from "../constants/pagesName";
import SendOTP from "../pages/login/SendOTP";
import VerifyPhoneNumber from "../pages/login/VerifyPhoneNumber";
import Home from "../pages/home/Home";
import ForgotPassword from "../pages/login/ForgotPassword";
import VerifyEmail from "../pages/login/VerifyEmail";
import Account from "../pages/account/Account";
import Store from "../pages/store/Store";
import News from "../pages/news/News";
import MyVoucher from "../pages/account/MyVoucher";
import MyOrder from "../pages/account/myOrder/MyOrder";
import FavoritesList from "../pages/account/FavoriteProduct";
import Introduce from "../pages/account/Introduce";
import Address from "../pages/account/Address";
import Setting from "../pages/account/setting/Setting";
import ChangePassword from "../pages/account/ChangePassword";
import OrderDetail from "../pages/account/myOrder/OrderDetail";
import FavoriteProduct from "../pages/account/FavoriteProduct";
import ProductDetail from "../pages/products/ProductDetail";
import Login from "../pages/login/Login";
import Products from "../pages/products/Products";
import ConfirmOrder from "../pages/order/ConfirmOrder";
import Wallet from "../pages/wallet/Wallet";
import ChangeLanguage from "../pages/account/setting/ChangeLanguage";
import TopUp from "../pages/wallet/TopUp";
import PaymentCode from "../pages/wallet/PaymentCode";
import TransactionHistory from "../pages/wallet/transactionHistory/TransactionHistory";
import CoinWallet from "../pages/coinWallet/CoinWallet";

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BottomNavigation />}>
          <Route index element={<Home />} />
          <Route path={PAGE_NAMES.STORE} element={<Store />} />
          <Route path={PAGE_NAMES.NEWS} element={<News />} />
          <Route path={PAGE_NAMES.SERVICE} element={<Service />} />
          <Route path={PAGE_NAMES.PRODUCTS} element={<Products />} />
        </Route>

        <Route path={PAGE_NAMES.PRODUCTS}>
          <Route path={":id"} element={<ProductDetail />} />
        </Route>

        <Route path={PAGE_NAMES.LOGIN} element={<Login />} />
        <Route
          path={PAGE_NAMES.PASSWORD_VERIFICATION}
          element={<PasswordVerification />}
        />
        <Route path={PAGE_NAMES.SEND_OTP} element={<SendOTP />} />
        <Route
          path={PAGE_NAMES.VERIFY_PHONE_NUMBER}
          element={<VerifyPhoneNumber />}
        />
        <Route path={PAGE_NAMES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={PAGE_NAMES.VERIFY_EMAIL} element={<VerifyEmail />} />

        <Route path={"/account"}>
          <Route index element={<Account />} />
          <Route path={PAGE_NAMES.MY_VOUCHER} element={<MyVoucher />} />
          <Route path={PAGE_NAMES.FAVORITES_LIST} element={<FavoritesList />} />
          <Route path={PAGE_NAMES.INTRODUCE} element={<Introduce />} />
          <Route path={PAGE_NAMES.ADDRESS} element={<Address />} />
          <Route path={PAGE_NAMES.SETTING} element={<Setting />} />
          <Route path={PAGE_NAMES.FEEDBACK} element={<Service />} />
          <Route
            path={PAGE_NAMES.FAVORITE_PRODUCT}
            element={<FavoriteProduct />}
          />

          <Route
            path={PAGE_NAMES.CHANGE_PASSWORD}
            element={<ChangePassword />}
          />

          <Route path={PAGE_NAMES.MY_ORDER}>
            <Route index element={<MyOrder />} />
            <Route path={":slug"} element={<OrderDetail />} />
          </Route>
          <Route
            path={PAGE_NAMES.CHANGE_LANGUAGE}
            element={<ChangeLanguage />}
          />
        </Route>
        <Route path={PAGE_NAMES.CONFIRM_ORDER} element={<ConfirmOrder />} />

        <Route path={PAGE_NAMES.WALLET}>
          <Route index element={<Wallet />} />
          <Route path={PAGE_NAMES.TOP_UP} element={<TopUp />} />
          <Route path={PAGE_NAMES.PAYMENT_CODE} element={<PaymentCode />} />
          <Route
            path={PAGE_NAMES.TRANSACTION_HISTORY}
            element={<TransactionHistory />}
          />
        </Route>
        <Route path={PAGE_NAMES.COIN_WALLET}>
          <Route index element={<CoinWallet />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
