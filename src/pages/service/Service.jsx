import React, { useState } from "react";
import Header from "../../components/Header";
import Img from "../../components/Img";
import { cameraIcon } from "../../assets/icons";
import Button from "../../components/Button";

function Service() {
  const [content, setContent] = useState("");

  return (
    <div className=" mb-20">
      <Header title={"Phan hoi khach hang"} disableBack />
      <div className="p-4">
        <div className="bg-white p-4 rounded-lg mb-6 border-2 border-borderColor">
          <p className="text-textSubdued text-sm mb-2">Tieu de</p>
          <p className="mx-2">Bao cao su co</p>
        </div>

        <div className="bg-white p-4 rounded-lg mb-2 border-2 border-borderColor">
          <p className="text-textSubdued text-sm mb-2">Noi dung</p>

          <textarea
            placeholder="..."
            value={content}
            onChange={(value) => setContent(value.target.value)}
            className="w-full p-2 h-56"
          />
        </div>
        <p className="text-end mb-4">{content.length}/1500</p>

        <div className="bg-white py-6 rounded-lg flex flex-col items-center border-2 border-borderColor mb-4">
          <Img src={cameraIcon} className={"mb-2"} />
          <p className="mb-2">Anh mo ta</p>
          <p className="text-textSubdued">
            Dinh kem toi da 1 anh (khich co: 5mb)
          </p>
        </div>
        <Button>Gui phan hoi</Button>
      </div>
    </div>
  );
}

export default Service;
