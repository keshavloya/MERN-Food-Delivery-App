import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [ordersData, setOrdersData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchMyOrder = async () => {
    const response = await fetch("http://localhost:5000/api/getOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    });
    const data = await response.json();
    setOrdersData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  //   return <div>Hello World</div>;
  return (
    <div>
      {loading ? (
        "Loading"
      ) : (
        <div className="container">
          <div className="row">
            {ordersData !== null && ordersData !== {} ? (
              ordersData.order_data
                .slice(0)
                .reverse()
                .map((orderData, index) => {
                  return (
                    <div key={index}>
                      <div className="m-auto mt-5">
                        {orderData.date}
                        <hr />
                      </div>
                      <div>
                        {orderData.order.map((order, index) => {
                          return (
                            <div
                              key={index}
                              className="col-12 col-md-6 col-lg-3"
                            >
                              <div
                                className="card mt-3"
                                style={{ width: "20rem", maxHeight: "400px" }}
                              >
                                {order.img ? (
                                  <img
                                    src={order.img}
                                    className="card-img-top"
                                    alt="..."
                                    style={{
                                      height: "220px",
                                      objectFit: "fill",
                                    }}
                                  />
                                ) : (
                                  ""
                                )}
                                <div className="card-body">
                                  <h5 className="card-title">{order.name}</h5>
                                  <div
                                    className="container w-100 p-0"
                                    style={{ height: "38px" }}
                                  >
                                    <span className="m-1">
                                      {order.quantity}
                                    </span>
                                    <span className="m-1">{order.size}</span>
                                    <div className=" d-inline ms-2 h-100 w-20 fs-5">
                                      ₹{order.price}/-
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
            ) : (
              <p>You have Not ordered anything yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
