import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PostReco from "./Components/PostReco";
import Reco from "./Components/Reco";
import "./App.css";

function App() {
  const [themeToggle, setThemeToggle] = useState(false);
  return (
    <>
      <div className={themeToggle ? "dark" : "light"}>
        {" "}
        <Router>
          <Container>
            {" "}
            <Switch>
              <Route exact path="/">
                <PostReco
                  setThemeToggle={setThemeToggle}
                  themeToggle={themeToggle}
                />
              </Route>
              <Route exact path="/reco">
                <Reco />
              </Route>
            </Switch>
          </Container>
        </Router>
      </div>{" "}
    </>
  );
}

export default App;
