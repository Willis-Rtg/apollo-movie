import { ApolloProvider } from "@apollo/client";
import React from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import client from "../Apollo";
import Detail from "../routes/Detail";
import Home from "../routes/Home";
import Globalstyles from "./Globalstyles";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Globalstyles />
        <Route exact path="/" component={Home} />
        <Route path="/:id" component={Detail} />
        <Redirect from="*" to="/" />
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
