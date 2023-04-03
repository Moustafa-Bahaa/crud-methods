import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../redux/postSlice";
import Spinner from "./Spinner";

const CreatePost = () => {
  const [values, setValues] = useState({ title: "", body: "" });
  const { title, body } = values;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPost, setShowPost] = useState(false);
  const { loading, post } = useSelector((state) => ({ ...state.app }));

  //handle submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ values }));
    setValues({ title: "", body: "" });
    setShowPost(true);
  };
  //show created post function

  const showCreatedPost = () => {
    return (
      <>
        {loading ? (
          <Spinner />
        ) : (
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">{post[0].title}</h5>
              <p className="card-text">{post[0].body}</p>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      <h1 className="text-center bg-dark text-white p-2">CreatePost</h1>
      <form>
        <div className="mb-3 mt-4">
          <input
            value={title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            type="text"
            placeholder="Enter post Title "
            className="form-control"
          />
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            value={body}
            onChange={(e) => setValues({ ...values, body: e.target.value })}
            placeholder="add post description"
            id="floatingTextarea"
          />
          <label htmlFor="floatingTextarea">add post description</label>
        </div>
        <div className="d-flex align-items-end justify-content-end mt-4">
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Go Home
          </button>
          <button
            className="btn btn-danger ms-4"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
      <div className="mt-4">{showPost && <div>{showCreatedPost()}</div>}</div>
    </div>
  );
};

export default CreatePost;
