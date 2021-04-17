import React, { useEffect, useState } from "react";
import "../Style/Reco.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import db from "./firebase";

function Reco() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("postreco")
      .orderBy("timestamp")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => doc.data()))
      );
  }, []);
  let callValue,
    sellValue,
    exchangeValue,
    instrumentValue,
    tradePrice,
    stopLoss,
    quantity,
    recommendation;

  posts.map((post) => {
    callValue = post.buttonBuy ? "Buy" : "sell";
    sellValue = post.buttonMoving ? "moving" : "closing";
    exchangeValue = post.exchangeValue;
    instrumentValue = post.instrumentValue;
    tradePrice = post.tradePrice;
    stopLoss = post.stopLoss;
    quantity = post.quantity;
    recommendation = post.recommendation;
  });
  return (
    <>
      <div style={{ height: "4rem", width: "1rem" }}></div>{" "}
      <div
        style={{
          height: "auto",
          border: "1px solid #e5e8ef",
          borderRadius: "8px",
          width: "100%",
          boxShadow: "0px 4px 4px gray",
          backgroundColor: "#f2f9f6",
        }}
      >
        <div className="row m-3">
          <div className="col d-flex ">
            <div className="flex-column ">
              {" "}
              <div
                className="box text-center "
                style={{ backgroundColor: "#e5e8ef", color: "#353669" }}
              >
                <strong style={{ textTransform: "uppercase" }}>
                  {callValue}
                </strong>
              </div>
              <div
                className="box text-center"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#353669",
                  borderBottom: "1px solid gray",
                }}
              >
                <strong>{tradePrice}</strong>
              </div>{" "}
            </div>
            <div className="ml-4">
              <strong>EURINR20AUGFUT</strong>
              <br />
              <span style={{ color: "gray", textTransform: "capitalize" }}>
                {recommendation}
              </span>
            </div>{" "}
          </div>{" "}
          <div className="col text-right">
            {" "}
            <BsThreeDotsVertical style={{ fontSize: "20px", color: "gray" }} />
          </div>
        </div>{" "}
        <div
          className="w-100"
          style={{ borderBottom: "1px solid #e5e8ef" }}
        ></div>
        <div className="" style={{ backgroundColor: "#fafafa" }}>
          <div
            className="row text-center"
            style={{ color: "gray", paddingTop: "2rem" }}
          >
            <div className="col m-1">Quantity</div>
            <div className="col m-1">Stop Loss</div>
            <div className="col m-1">Stop Loss Type</div>
          </div>
          <div
            className="row text-center"
            style={{ fontSize: "20px", paddingBottom: "2rem" }}
          >
            <div className="col m-1">{quantity}</div>
            <div className="col m-1">{stopLoss}</div>
            <div className="col m-1" style={{ textTransform: "uppercase" }}>
              {sellValue}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          height: "auto",
          marginTop: "4rem",
          border: "1px solid #e5e8ef",
          borderRadius: "8px",
          width: "100%",
          boxShadow: "0px 4px 4px gray",
          backgroundColor: "#f2f9f6",
        }}
      >
        <div className="row m-3">
          <div className="col d-flex ">
            <div className="flex-column ">
              {" "}
              <div
                className="box text-center "
                style={{ backgroundColor: "#e5e8ef", color: "#353669" }}
              >
                <strong>BUY</strong>
              </div>
              <div
                className="box text-center"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#353669",
                  borderBottom: "1px solid gray",
                }}
              >
                <strong>1234.0</strong>
              </div>{" "}
            </div>
            <div className="ml-4">
              <strong>EURINR20AUGFUT</strong>
              <br />
              <span style={{ color: "gray" }}>01-OCT-2021</span>
            </div>{" "}
          </div>{" "}
          <div className="col text-right">
            {" "}
            <BsThreeDotsVertical style={{ fontSize: "20px", color: "gray" }} />
          </div>
        </div>{" "}
        <div
          className="w-100"
          style={{ borderBottom: "1px solid #e5e8ef" }}
        ></div>
        <div className="" style={{ backgroundColor: "#fafafa" }}>
          <div
            className="row text-center"
            style={{ color: "gray", paddingTop: "2rem" }}
          >
            <div className="col m-1">Quantity</div>
            <div className="col m-1">Stop Loss</div>
            <div className="col m-1">Stop Loss Type</div>
          </div>
          <div
            className="row text-center"
            style={{ fontSize: "20px", paddingBottom: "2rem" }}
          >
            <div className="col m-1">12</div>
            <div className="col m-1">234.0</div>
            <div className="col m-1">CLOSING</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reco;
