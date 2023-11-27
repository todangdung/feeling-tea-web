import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { getStores } from "../../services/api/userApis";
import Img from "../../components/Img";
import Button from "../../components/Button";
import { mapGreenIcon } from "../../assets/icons";

function Store() {
  const [storeData, setStoreData] = useState([]);

  //get lat, lng
  function getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            resolve({ latitude, longitude });
          },
          (error) => {
            reject("Lỗi: " + error.message);
          }
        );
      } else {
        reject("Trình duyệt của bạn không hỗ trợ định vị.");
      }
    });
  }

  //get store data
  const getStoreData = ({ latitude, longitude }) => {
    getStores({
      lat: latitude,
      lng: longitude,
      onSuccess: (resp) => {
        setStoreData(resp.data);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  useEffect(() => {
    getLocation()
      .then((position) => {
        getStoreData(position);
      })
      .catch((errorMessage) => {
        console.error(errorMessage);
      });
  }, []);

  return (
    <div className=" mb-20">
      <Header title={"Store"} disableBack />

      <div className="p-4">
        {storeData.map((store, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden">
            <Img src={store.thumbnail} className={"w-full h-52"} cover />

            <div className="py-3 px-4">
              <p className=" font-medium text-lg mb-1">{store.store_name}</p>
              <p className="text-textSubdued mb-1">{store.address}</p>
              <p className="text-textSubdued mb-1">{store.phone}</p>
              <div className="flex flex-row justify-between items-center">
                {store.distance ? (
                  <div className="flex flex-row items-center">
                    <Img src={mapGreenIcon} />
                    <span className="ml-2 text-green">{store.distance}</span>
                  </div>
                ) : (
                  <div></div>
                )}
                <Button className={"w-40 mb-2"}>Tim duong</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Store;
