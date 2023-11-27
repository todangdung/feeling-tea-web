import React, { useEffect } from "react";
import Img from "../../components/Img";
import { bg_header_image } from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import {
  bagActiveIcon,
  changePassIcon,
  emailStartIcon,
  femaleIcon,
  heartIcon,
  logoutIcon,
  maleIcon,
  mapIcon,
  settingIcon,
  starGiftIcon,
  userGroupIcon,
  voucherIcon,
} from "../../assets/icons";
import { useNavigate } from "react-router-dom";
import { PAGE_NAMES } from "../../constants/pagesName";
import { logout } from "../../services/api/signinApis";
import { clearUser } from "../../redux/slice/userSlice";
import { clearToken } from "../../redux/slice/tokenSlice";
import { getItemLS, removeItemLS } from "../../utils/localStore";
import { KEYS, TYPES_TOAST } from "../../constants/constants";
import { clearCoinBalance } from "../../redux/slice/coinBalanceSlice";
import { toastStorage } from "../../redux/slice/toastSlice";
import { notiPopupStorage } from "../../redux/slice/notiPopupSlice";
import { clearWalletBalance } from "../../redux/slice/walletBalanceSlice";

function Account() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { contact_name, contact_gender } = useSelector(
    (state) => state.user.value
  );

  const { name } = useSelector((state) => state.user.rankInfo);

  const logoutApp = () => {
    logout({
      onSuccess: (resp) => {
        removeItemLS(KEYS.TOKEN);
        dispatch(clearUser());
        dispatch(clearToken());
        dispatch(clearWalletBalance());
        dispatch(clearCoinBalance());
        dispatch(toastStorage({ message: "Dang xuat thanh cong" }));
        navigate(PAGE_NAMES.LOGIN);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  useEffect(() => {
    const token = getItemLS(KEYS.TOKEN);
    if (!token) {
      dispatch(
        toastStorage({
          message: "Sign in require",
          type: TYPES_TOAST.ERROR,
        })
      );
      navigate(PAGE_NAMES.LOGIN);
    }
  }, []);

  return (
    <div>
      <Img
        src={bg_header_image}
        width={"100%"}
        className={"-z-10 absolute h-60"}
        cover
      />
      <div className="items-center flex flex-col pt-6">
        <Img
          src={contact_gender === "1" ? maleIcon : femaleIcon}
          cover
          className={"rounded-full w-24 h-24"}
        />
        <p className="text-white font-medium text-lg mt-2">{contact_name}</p>
        <p className="text-yellow">{name}</p>
      </div>

      <div className="bg-bgColor mt-16 p-4 pb-12">
        <div className="bg-white w-full rounded-xl p-4 py-8">
          <p className="text-textSubdued">Bag</p>

          <div
            className="flex flex-row items-center mt-6 px-2 pb-6 border-b-[0.5px] border-borderColor"
            onClick={() => navigate(PAGE_NAMES.MY_VOUCHER)}
          >
            <Img src={voucherIcon} width={30} />
            <span className="ml-4">My voucher</span>
          </div>
          <div
            className="flex flex-row items-center mt-6 px-2 pb-6 border-b-[0.5px] border-borderColor"
            onClick={() => navigate(PAGE_NAMES.MY_ORDER)}
          >
            <Img src={bagActiveIcon} width={30} />
            <span className="ml-4">Orders purchased</span>
          </div>
          <div
            className="flex flex-row items-center mt-6 px-2 pb-6 border-b-[0.5px] border-borderColor"
            onClick={() => navigate(PAGE_NAMES.FAVORITE_PRODUCT)}
          >
            <Img src={heartIcon} width={30} />
            <span className="ml-4">Favorites list</span>
          </div>
        </div>

        <div className="bg-white w-full rounded-xl p-4 py-8 mt-4">
          <p className="text-textSubdued">San thuong</p>

          <div
            className="flex flex-row items-center mt-6 px-2 pb-6 border-b-[0.5px] border-borderColor"
            onClick={() =>
              dispatch(
                notiPopupStorage({ message: "Chuc nang nay dang phat trien" })
              )
            }
          >
            <Img src={starGiftIcon} width={30} />
            <span className="ml-4">Enter gift code</span>
          </div>
          <div
            className="flex flex-row items-center mt-6 px-2 pb-6 border-b-[0.5px] border-borderColor"
            onClick={() => navigate(PAGE_NAMES.INTRODUCE)}
          >
            <Img src={userGroupIcon} width={30} />
            <span className="ml-4">Recommend to friends</span>
          </div>
        </div>

        <div className="bg-white w-full rounded-xl p-4 py-8 mt-4">
          <p className="text-textSubdued">Other</p>

          <div
            className="flex flex-row items-center mt-6 px-2 pb-6 border-b-[0.5px] border-borderColor"
            onClick={() => navigate(PAGE_NAMES.ADDRESS)}
          >
            <Img src={mapIcon} width={30} />
            <span className="ml-4">Saved address</span>
          </div>
          <div
            className="flex flex-row items-center mt-6 px-2 pb-6 border-b-[0.5px] border-borderColor"
            onClick={() => navigate(PAGE_NAMES.SETTING)}
          >
            <Img src={settingIcon} width={30} />
            <span className="ml-4">Setting</span>
          </div>
          <div
            className="flex flex-row items-center mt-6 px-2 pb-6 border-b-[0.5px] border-borderColor"
            onClick={() => navigate(PAGE_NAMES.FEEDBACK)}
          >
            <Img src={emailStartIcon} width={30} />
            <span className="ml-4">Feedback</span>
          </div>
          <div
            className="flex flex-row items-center mt-6 px-2 pb-6 border-b-[0.5px] border-borderColor"
            onClick={() => navigate(PAGE_NAMES.CHANGE_PASSWORD)}
          >
            <Img src={changePassIcon} width={30} />
            <span className="ml-4">Change password</span>
          </div>
          <div
            className="flex flex-row items-center mt-6 px-2 pb-6 border-b-[0.5px] border-borderColor"
            onClick={() => logoutApp()}
          >
            <Img src={logoutIcon} width={30} />
            <span className="ml-4">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
