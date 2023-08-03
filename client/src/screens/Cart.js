import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove, drop } from "../features/cart";
library.add(faTrashCan);

const Cart = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const data = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
      </div>
    );
  }

  const totalPrice = data.reduce((total, food) => (total += food.price), 0);

  const handleCheckout = async () => {
    const userEmail = localStorage.getItem("userEmail");
    console.log();
    const response = await fetch(`${baseUrl}/api/orderData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
    if (!response.ok) throw new Error(response.status);
    else {
      dispatch(drop());
    }
  };

  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md ">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.quantity}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td
                  onClick={() =>
                    dispatch(remove({ id: food.id, size: food.size }))
                  }
                >
                  <button className="btn p-0">
                    <FontAwesomeIcon
                      icon="fa-regular fa-trash-can"
                      style={{ color: "#00bc8c" }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: ₹{totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5" onClick={handleCheckout}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
