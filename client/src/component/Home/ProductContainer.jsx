import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BsCartPlusFill } from "react-icons/bs";
import { MdShoppingBasket } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
import { IoEyeSharp } from "react-icons/io5";
import ViewProduct from "./ViewProduct";

export default function ProductContainer({ data,grid="grid" }) {
  const rowContainer = useRef();
  const [flag, setFlag] = useState(false);
  const [view, setView] = useState(false);
  const [specific_data, setSpecific_data] = useState(null);
  const [gridORlist, setGridORlist] = useState(false);
  const navigate = useNavigate();

  console.log(grid);


  const stopEventPropagationTry = (event) => {
    if (event.target != event.currentTarget) {
      event.stopPropagation();
    }
  };

  const viewProd = (item)=> {
    setSpecific_data(item);
    setView(!view)
  }

  const handleOnClose = () => {
    setView(!view)
  };
useEffect(() => {
  if(grid === "grid"){
    setGridORlist(true)
    console.log("grid");
  }else
  {
    setGridORlist(false)
    console.log("dkfjs");
  }

}, [grid])




  return (
    <div className="text-gray-900 z-30">
      {/* laptop view */}
      <div
        ref={rowContainer}
        className={`w-full hidden md:flex  items-center my-10 p-5 gap-6 md:gap-7 p-1 scroll-smooth ${
          flag
            ? "overflow-x-scroll scrollbar-none scroll-auto"
            : "overflow-x-hidden flex flex-wrap justify-center"
        } ${gridORlist ? null : "flex-col p-5"}`}
      >
        {data &&
          data.map((item) => (
            <div
              key={item?.id}
              onClick={() => navigate(`/singleitem/${item?._id}`)}
              className={`${
                gridORlist
                  ? "w-1/2  md:w-1/4 lg:w-1/4 xl:w-1/5 "
                  : "flex-col w-full"
              } ${
                flag ? "min-w-[320px]" : "min-w-[260px]"
              } h-auto bg-gray-50 bl rounded-lg  my-6 backdrop-blur-lg hover:drop-shadow-2xl`}
            >
              {/* <NavLink to={`/singlefood/${item?.id}`}> */}
              <div className={`${!gridORlist ? "flex flex-row" : "flex flex-col"}`}>
                <div className="flex items-center justify-center w-full bg-gray-50 rounded-br-[30px] z-30">
                  <div className="m-4 w-full z-30 hover:z-40">
                    <motion.img
                      whileHover={{ scale: 1.2 }}
                      src={item?.image}
                      alt=""
                      className={` h-60 ${
                        flag ? "rounded-lg" : "rounded-md"
                      }  -mt-7 drop-shadow-2xl ${gridORlist ? "w-full" : "w-64"}` }
                    />
                  </div>
                  {item.offer && (
                    <div>
                      <div className="w-14 h-6 bg-red-500 absolute top-5 left-2 z-30 rounded-e-md flex items-center justify-center">
                        <p>{item.offer}</p>
                      </div>
                      <div className="w-14 h-6 bg-red-400 absolute top-[29px] left-0 z-10"></div>
                      <div className="w-14 h-10 bg-red-200 absolute top-[30px] left-[14px] rotate-45 z-10"></div>
                    </div>
                  )}
                </div>
                <div className={`w-10 h-10 bg-gray-300 absolute right-0 top-[13rem] z-10 ${gridORlist ? "" : "hidden"}`}></div>

                <div className="bg-gray-300 p-4 rounded-tl-[30px] rounded-b-lg w-full z-10">
                  <div className="flex flex-col items-start justify-between w-full">
                    <p className="text-base font-semibold text-textColor md:text-lg">
                      ratings
                    </p>
                    <p
                      className={`text-base font-semibold text-textColor ${
                        flag ? "text-md" : "md:text-lg"
                      }`}
                    >
                      {item?.item_name}
                    </p>
                  </div>
                  <div className="flex items-start flex-row justify-between gap-8 mt-5">
                    {item?.sale ? (
                      <p
                        className={`text-base flex items-start justify-start gap-4  text-textColor ${
                          flag ? "text-md" : "md:text-lg"
                        }`}
                      >
                        <p className="line-through">
                          <span className="text-sm text-red-500">$</span>
                          {item?.price}
                        </p>
                        <p className="font-semibold">
                          <span className="text-sm  text-red-500">$</span>
                          {item?.sale}
                        </p>
                      </p>
                    ) : (
                      <p
                        className={`text-base flex items-start justify-start gap-4  text-textColor ${
                          flag ? "text-md" : "md:text-lg"
                        }`}
                      >
                        <p className="font-semibold">
                          <span className="text-sm  text-red-500">$</span>
                          {item?.price}
                        </p>
                      </p>
                    )}

                    <div className={`flex flex-col absolute right-2 ${gridORlist ? "top-[17rem]" : ""} `}>
                      <motion.div
                        whileTap={{ scale: 1.2 }}
                        className="flex items-center justify-center w-12 h-12 text-2xl bg-orange-00  rounded-full cursor-pointer hover:shadow-lg"
                        onClick={(e) => {
                          stopEventPropagationTry(e); // Prevent event from propagating
                          viewProd(item);
                        }}
                      >
                        <IoEyeSharp className="" />
                      </motion.div>
                      <motion.div
                        whileTap={{ scale: 1.2 }}
                        className="flex items-center justify-center w-12 h-12 text-2xl bg-orange-00  rounded-full cursor-pointer hover:shadow-lg"
                        onClick={(e) => {
                          stopEventPropagationTry(e); // Prevent event from propagating
                          addtoCart(item);
                        }}
                      >
                        {item?.cartORadd === "cart" ? (
                          <MdShoppingBasket className="" />
                        ) : (
                          <BsCartPlusFill className="" />
                        )}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
              {/* </NavLink> */}
            </div>
          ))}
           {view && specific_data ? (
                          <ViewProduct
                            // addDataNotifi={addingNewData}
                            onClose={handleOnClose}
                            visible={view}
                            data={specific_data}
                          />
                        ) : null}
      </div>

      {/* mobile view */}
      {/* <div
      ref={rowContainer}
      className={`w-full flex md:hidden  items-center my-16 gap-6 md:gap-7  scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex flex-wrap justify-center"
      } ${gridORlist ? null : "flex-col"}`}
    >
      {data &&
        data.map((item) => (
          <div
            key={item?.id}
            onClick={() => navigate(`/singlefood/${item?.id}`)}
            className={`${
              gridORlist
                ? "w-40  md:w-1/3 lg:w-1/4 xl:w-1/5 "
                : "flex-col w-96"
            } ${
              flag ? "min-w-[200px]" : "min-w-[120px]"
            }  h-auto bg-gray-100 bl rounded-lg p-4 my-7 backdrop-blur-lg hover:drop-shadow-2xl`}
          >
            <NavLink to={`/singlefood/${item?.id}`}>
            <div className="flex items-center justify-center w-full">
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={item?.images}
                alt=""
                className={`w-full ${
                  gridORlist ? "h-32" : "h-full"
                } rounded-xl  -mt-8 drop-shadow-2xl`}
              />
            </div>
            <div className="flex flex-col items-start justify-between w-full">
              <p className="text-base font-semibold text-textColor md:text-lg">
                ratings
              </p>
              <p className="text-base font-semibold text-textColor md:text-lg">
                {item?.item_name}
              </p>
            </div>
            <div className="flex items-center flex-row justify-between gap-8">
              <p className="text-lg font-semibold text-headingColor">
                <span className="text-sm text-red-500">$</span> {item?.price}
              </p>
              <motion.div
                whileTap={{ scale: 1.2 }}
                className="flex items-center justify-center w-8 h-8 text-2xl bg-red-600 rounded-full cursor-pointer hover:shadow-md"
                onClick={(e) => {
                  stopEventPropagationTry(e); // Prevent event from propagating
                  addtoCart(item);
                }}
              >
                {item?.cartORadd === "cart" ? (
                  <MdShoppingBasket className="text-white" />
                ) : (
                  <BsCartPlusFill className="text-white" />
                )}
              </motion.div>
            </div>
            </NavLink>
          </div>
        ))}
    </div> */}
    </div>
  );
}
