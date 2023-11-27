import React, { useEffect } from "react";
import Routers from "./routers/Routers";
import NotiPopup from "./components/NotiPopup";
import Toast from "./components/Toast";
import { startUpApp } from "./utils/appUtils";
import { getArticle } from "./services/api/articleApis";
import { useDispatch } from "react-redux";
import { articleStorage } from "./redux/slice/articleSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getArticle({
      onSuccess: (resp) => {
        dispatch(articleStorage(resp.data));
      },
      onError: (err) => {
        console.log(err);
      },
    });

    startUpApp();
  }, []);

  return (
    <>
      <NotiPopup />
      <Toast />
      <Routers />
    </>
  );
}

export default App;
