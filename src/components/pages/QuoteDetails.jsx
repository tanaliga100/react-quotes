import React, { useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../comments/Comments";
import HighlightedQuote from "../quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

// const DUMMY_QUOTES = [
//   { id: "q1", author: "Jordan Tanaliga", text: "Learning React is fun !!" },
//   { id: "q2", author: "Lara Baldesco", text: "You are awesome !!" },
//   { id: "q3", author: "Chris Martin", text: "I know how amazing you are !!" },
// ];

const QuoteDetails = () => {
  const match = useRouteMatch();
  const params = useParams();

  const { quoteID } = params;

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  // const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteID);

  useEffect(() => {
    sendRequest(quoteID);
  }, [sendRequest, quoteID]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote) {
    return <p>No Quote found !</p>;
  }
  return (
    <React.Fragment>
      <HighlightedQuote
        text={loadedQuote.text}
        id={loadedQuote.id}
        author={loadedQuote.author}
      />
      <Route path={`${match.path}`} exact>
        <div className="centered">
          <Link className="btn" to={`${match.url}/comments`}>
            {" "}
            Load a Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </React.Fragment>
  );
};

export default QuoteDetails;
