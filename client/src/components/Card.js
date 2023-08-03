import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, update } from "../features/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faCartPlus);

const Card = ({ item }) => {
  let options = item.options[0];
  let priceOptions = Object.keys(options);

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState("1");
  const [size, setSize] = useState(priceOptions[0]);
  const [bounce, setBounce] = useState(false);
  const price = quantity * parseInt(options[size]);
  const data = useSelector((state) => state.cart);

  const handleAddToCart = () => {
    let food = null;
    for (const foodItem of data) {
      if (item._id === foodItem.id && size === foodItem.size) {
        food = foodItem;
        break;
      }
    }
    if (food !== null && food.quantity !== quantity) {
      dispatch(
        update({
          id: item._id,
          name: item.name,
          size,
          price,
          quantity,
          img: item.img,
        })
      );
    } else if (food === null) {
      dispatch(
        add({
          id: item._id,
          name: item.name,
          price,
          quantity,
          size,
          img: item.img,
        })
      );
    }
  };

  return (
    <div className="card m-3" style={{ width: "20rem", maxHeight: "400px" }}>
      <img
        src={item.img}
        className="card-img-top"
        alt="..."
        style={{ height: "220px", objectFit: "fill" }}
      />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        {/* <p className="card-text">{item.description}</p> */}
        <div className="container w-100">
          <select
            className="m-2 h-100 bg-success rounded"
            onChange={(e) => setQuantity(e.target.value)}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            className="m-2 h-100 bg-success rouded"
            onChange={(e) => setSize(e.target.value)}
          >
            {priceOptions.map((data) => {
              return (
                <option key={data} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
          <div className="d-inline h-100 ms-1 fs-5">₹{price}/-</div>
        </div>
        <hr />
        <button
          className="btn btn-success justify-center ms-2"
          onClick={handleAddToCart}
          onMouseOver={() => setBounce(true)}
          onMouseLeave={() => setBounce(false)}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-cart-plus"
            size="xl"
            bounce={bounce}
          />
        </button>
      </div>
    </div>
  );
};

export default Card;
