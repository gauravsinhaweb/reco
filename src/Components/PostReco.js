import "../Style/PostReco.css";
import { useState } from "react";
import { useHistory } from "react-router";
import { Switch } from "@material-ui/core";
import InstrumentJSON from "../Assets/instruments.json";
import db from "./firebase";
import firebase from "firebase";

function PostReco({ setThemeToggle, themeToggle }) {
  const history = useHistory();

  const [exchangeValue, setExchangeValue] = useState("");
  const [instrumentValue, setInstrumentValue] = useState("");
  const [tradePrice, setTradePrice] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [quantity, setQuantity] = useState("");
  const [recommendation, setRecommendation] = useState();

  const [buttonBuy, setbuttonBuy] = useState(false);
  const [buttonSell, setbuttonSell] = useState(false);
  const [isFirst, setIsFirst] = useState(true);

  const [buttonMoving, setbuttonMoving] = useState(false);
  const [buttonClosing, setbuttonClosing] = useState(false);
  const [isSecond, setIsSecond] = useState(true);
  const submitHandler = (e) => {
    e.preventDefault();

    db.collection("postreco").add({
      buttonBuy: buttonBuy,
      buttonSell: buttonSell,
      buttonMoving: buttonMoving,
      buttonClosing: buttonClosing,
      exchangeValue: exchangeValue,
      instrumentValue: instrumentValue,
      tradePrice: tradePrice,
      stopLoss: stopLoss,
      quantity: quantity,
      recommendation: recommendation,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    console.log("submitted");
    history.push("/reco");
  };
  const [state, setState] = useState({
    checkedA: false,
    checkedB: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  let callValue;
  if (buttonBuy === true) {
    callValue = "Buy";
  } else if (isFirst === true) {
    callValue = "";
  } else {
    callValue = "Sell";
  }
  let stopValue;
  if (buttonMoving === true) {
    stopValue = "Moving";
  } else if (isSecond === true) {
    stopValue = "";
  } else {
    stopValue = "Closing";
  }
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;

  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  const dateFormat = (today = yyyy + "-" + mm + "-" + dd);
  return (
    <>
      <div style={{ height: "4rem", width: "1rem" }}></div>{" "}
      <div>
        <form onSubmit={submitHandler}>
          <div
            className="body"
            style={{
              border: "1px solid #e5e8ef",
              top: "2rem",
              borderRadius: "8px",
            }}
          >
            <section style={{ marginTop: "5rem", marginBottom: "8rem" }}>
              <div className="form-group col  col-form-label ">
                {" "}
                Is it buy call or sell call?
              </div>
              <div className="form-group row col col-form-label">
                <button
                  type="button"
                  className={buttonBuy ? "solid" : "outlined"}
                  onClick={() =>
                    isFirst
                      ? (setbuttonBuy(!buttonBuy), setIsFirst(false))
                      : (setbuttonBuy(buttonSell), setbuttonSell(buttonBuy))
                  }
                  color="primary"
                  required
                  // value="Buy"
                  // onChange={(event) => setCallValue(event.target.value)}
                >
                  Buy
                </button>
                <button
                  type="button"
                  className={buttonSell ? "solid" : "outlined"}
                  onClick={() =>
                    isFirst
                      ? (setbuttonSell(!buttonSell), setIsFirst(false))
                      : (setbuttonSell(buttonBuy), setbuttonBuy(buttonSell))
                  }
                  color="primary"
                  required
                >
                  Sell
                </button>
              </div>
              <div className="form-group row col col-form-label w-100">
                {" "}
                Is it Moving stop or Closing stop?
              </div>
              <div className="form-group row col col-form-label">
                {" "}
                <button
                  type="button"
                  className={buttonMoving ? "solid" : "outlined"}
                  onClick={() =>
                    isSecond
                      ? (setbuttonMoving(!buttonMoving), setIsSecond(false))
                      : (setbuttonMoving(buttonClosing),
                        setbuttonClosing(buttonMoving))
                  }
                  color="primary"
                  required
                >
                  {" "}
                  Moving
                </button>
                <button
                  type="button"
                  className={buttonClosing ? "solid" : "outlined"}
                  onClick={() =>
                    isSecond
                      ? (setbuttonClosing(!buttonClosing), setIsSecond(false))
                      : (setbuttonClosing(buttonMoving),
                        setbuttonMoving(buttonClosing))
                  }
                  color="primary"
                  required
                >
                  Closing
                </button>
              </div>{" "}
              <div className="form-group row col col-form-label">
                Exchange name
              </div>
              <div className="form-group row">
                <div className="col-10">
                  <input
                    list="list"
                    className="form-control col-form-label"
                    type="text"
                    onChange={(e) => setExchangeValue(e.target.value)}
                    required
                  />
                  <datalist id="list">
                    <option value="NFO" />
                    <option value="CDS" />
                    <option value="NSE" />
                    <option value="BSE" />
                    <option value="MCX" />
                    <option value="BCD" />
                  </datalist>
                </div>
              </div>
              <div className="form-group row col col-form-label">
                Instrument Type
              </div>
              <div className="form-group row col-form-label">
                <div className="col-10">
                  <input
                    list="list"
                    className="form-control"
                    disabled={!exchangeValue}
                    required
                    onChange={(e) => setInstrumentValue(e.target.value)}
                    placeholder={
                      !exchangeValue ? "Please select an exchange first" : null
                    }
                  />
                  <datalist id="list">
                    {InstrumentJSON[0].data.map((info) => {
                      console.log(info.tradingsymbol);
                    })}
                  </datalist>
                </div>
              </div>
            </section>
            <section style={{ marginTop: "5rem" }}>
              {" "}
              <div
                style={{
                  position: "absolute",
                  marginLeft: "30rem",
                }}
                className=" "
              >
                <Switch
                  checked={state.checkedA}
                  onChange={handleChange}
                  onClick={() => setThemeToggle(!themeToggle)}
                  name="checkedA"
                  color="primary"
                />
              </div>{" "}
              <div className="form-group row col-form-label">
                <label className="ml-3  col-form-label">Trade Price</label>
                <div className="col-10">
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    className="form-control col-form-label"
                    required
                    onChange={(e) => setTradePrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="ml-3 col-form-label">Stop loss</label>
                <div className="col-10">
                  <input
                    type="text"
                    className="form-control col-form-label"
                    onChange={(e) => setStopLoss(e.target.value)}
                    required
                    step="0.1"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="ml-3 col-form-label">Quantity</label>
                <div className="col-10">
                  <input
                    required
                    type="number"
                    min="1"
                    className="form-control col-form-label"
                    onChange={(e) => setQuantity(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="form-group row">
                <label className="ml-3 col-form-label">
                  Recommendation Validity
                </label>
                <div className="col-10">
                  <input
                    onChange={(e) => setRecommendation(e.target.value)}
                    required
                    type="date"
                    className="form-control col-form-label"
                    min={dateFormat}
                  />
                </div>
              </div>
            </section>
          </div>{" "}
          <div className="text-center mt-4">
            <button
              className="btn btn-primary "
              type="submit"
              disabled={!recommendation}
            >
              Add Recommendation
            </button>
          </div>
        </form>
      </div>{" "}
      {console.log(recommendation, dateFormat)}
    </>
  );
}

export default PostReco;
