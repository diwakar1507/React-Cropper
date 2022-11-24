import React, { Fragment, useState, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Back from "./img/back.svg";
import Heart from "./img/user_image_frame_1.png";
import Square from "./img/user_image_frame_2.png";
import Circle from "./img/user_image_frame_3.png";
import Rectangle from "./img/user_image_frame_4.png";
const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";
const App = () => {
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState(null);
  const [frame, setFrame] = useState(null);
  const imageRef = useRef(null);
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const handleFrame = (name) => {
    const frames = {
      heart: "heart-mask",
      square: "square-mask",
      circle: "circle-mask",
      rectangle: "rectangle-mask",
      original:" ",
    };
    setFrame((prev) => frames[name]);
  };

  return (
    <div className="h-screen mb-40">
      <div className="h-20 bg-gray-300 flex">
        <img
          className="h-16 w-16 pt-4 ml-2 cursor-pointer"
          src={Back}
          alt="loading"
        />
        <h1 className="text-3xl w-screen py-5 pr-8 font-serif text-center sm:text-4xl">
          Add Image/Icon
        </h1>
      </div>
      <div className="bg-gray-100 mx-auto h-1/5 sm:h-1/3 sm:w-1/2 my-16 bg-center w-5/6 sm:mx-auto sm:my-12 border-2 border-zinc-200 rounded-2xl">
        <h1 className="text-2xl sm:text-3xl font-serif pt-5 text-center">
          Upload Image
        </h1>
        <div className="grid justify-items-center">
          <label>
            <input
              type="file"
              className="text-sm text-grey-500
      file:py-3 file:px-10 file:w-44 file:h-10 file:sm:h-14
      file:rounded-full file:border-0 file:mx-auto file:sm:w-52
      file:sm:text-xl file:font-semibold  file:text-white
      file:bg-gradient-to-r file:from-blue-600 file:to-amber-600
      hover:file:cursor-pointer hover:file:opacity-80 file:sm:mt-10 mt-6
     "
              onChange={onChange}
              accept="image/*"
            />
          </label>
        </div>
      </div>
      <div className="h-auto sm:w-1/2 w-5/6 mt-10 mx-auto">
        <Cropper
          style={{ height: 400, width: "100%" }}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          ref={imageRef}
          viewMode={1}
          guides={true}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
        />
      </div>
      <div className="justify-center grid content-center mt-10">
        <button
          className="bg-emerald-500 h-10 w-44 center border-2 rounded sm:h-14 sm:w-52 sm:text-xl border-emerald-600 "
          onClick={getCropData}
        >
          Crop Image
        </button>
      </div>
      <div className="flex justify-center mt-8">
        <button className="h-10 w-20 border-2 rounded border-zinc-600 mt-3 bg-zinc-400 " onClick={() => handleFrame("original")}>
          Original
        </button>
        <img className="h-16 w-16 cursor-pointer" onClick={() => handleFrame("heart")} src={Heart} />
        <img className="h-16 w-16 cursor-pointer" onClick={() => handleFrame("square")} src={Square} />
        <img className="h-16 w-16 cursor-pointer" onClick={() => handleFrame("circle")} src={Circle} />
        <img className="h-16 w-20 cursor-pointer" onClick={() => handleFrame("rectangle")} src={Rectangle} />
      </div>
      <div className="mx-auto h-1/2 w-auto my-12">
        <img
          className={`mx-auto object-contain w-auto h-5/6 ${frame}`}
          src={cropData}
          alt=""
        />
      </div>
      <br style={{ clear: "both" }} />
    </div>
  );
};

export default App;
