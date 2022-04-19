import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../hooks/use-http";
import { getAllComments } from "../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  console.log(params);

  const { quoteID } = params;

  const {
    sendRequest,
    status,
    data: loadedComments,
    error,
  } = useHttp(getAllComments);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteID)
  }, [sendRequest, quoteID]);


  let comments;
  if (status === "pending") {
    comments = (
      <div className="centered">
        {" "}
        <LoadingSpinner />
      </div>
    );
  }

  useEffect(() => {
    sendRequest(quoteID);
  }, [quoteID, sendRequest]);

  if (status === "completed" && (loadedComments && loadedComments.length > 0)) {
    comments = (
      <div>
        <CommentsList comments={loadedComments} />
      </div>
    );
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <div className="centered"> No comments were added yet </div>;
  }
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={quoteID}
          onAddedComment={addedCommentHandler}
        />
      )}
      <div>{comments}</div>
    </section>
  );
};

export default Comments;
