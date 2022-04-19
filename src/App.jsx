import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import React, { Suspense } from "react";

import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const AllQuotes = React.lazy(() => import("./components/pages/AllQuotes"));
const NewQuote = React.lazy(() => import("./components/pages/NewQuote"));
const QuoteDetails = React.lazy(() =>
  import("./components/pages/QuoteDetails")
);
const NotFound = React.lazy(() => import("./components/pages/NotFound"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            {" "}
            <LoadingSpinner />{" "}
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/quotes/:quoteID">
            <QuoteDetails />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;