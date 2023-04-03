import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost, getPost, setEdit, updatePost } from "../redux/postSlice";
import Spinner from "./Spinner";

const Posts = () => {
  const [id, setId] = useState("");
  const [textBody, setTextBody] = useState("");
  const navigate = useNavigate();
  const { loading, post, body, edit } = useSelector((state) => ({
    ...state.app,
  }));
  useEffect(() => {
    if (body) {
      setTextBody(body);
    }
  }, [body]);
  //fetch handler
  const handleFetchData = (e) => {
    e.preventDefault();
    if (!id) {
      window.alert("Please Provide Post ID");
    } else {
      dispatch(getPost({ id }));
      setId("");
    }
  };
  const dispatch = useDispatch();
  //delete handler
  const handleDelete = ({ id }) => {
    dispatch(deletePost({ id: post[0].id }));
    window.location.reload();
    window.alert("post deleted");
  };
  return (
    <div>
      <div className="row mt-4 d-flex align-items-center justify-content-center">
        <div className="col-md-8">
          <form action="">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Search By ID:
              </label>
              <input
                onChange={(e) => setId(e.target.value)}
                value={id}
                aria-describedby="emailHelp"
                type="number"
                className="form-control"
                id="exampleInputEmail1"
              />
            </div>
            <button
              onClick={handleFetchData}
              type="submit"
              className="btn btn-primary"
            >
              Fetch Post
            </button>
            <button
              onClick={() => navigate("/CreatePost")}
              type="button"
              className="btn btn-warning ms-4"
            >
              create post
            </button>
          </form>
        </div>
      </div>
      <div className="container">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {post.length > 0 && (
              <>
                <div className="card mt-4">
                  <div className="card-body">
                    <h5 className="card-title">{post[0].title}</h5>
                    {edit ? (
                      <>
                        <textarea
                          className="form-control"
                          id="floatingTextarea"
                          value={textBody}
                          onChange={(e) => setTextBody(e.target.value)}
                        />
                        <div className="d-flex align-items-end justify-content-end">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              dispatch(
                                updatePost({
                                  id: post[0].id,
                                  title: post[0].title,
                                  body: textBody,
                                })
                              );
                              dispatch(setEdit({ edit: false, body: "" }));
                            }}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-danger ms-4"
                            onClick={() =>
                              dispatch(setEdit({ edit: false, body: "" }))
                            }
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="card-text">{post[0].body}</p>
                      </>
                    )}
                    {!edit && (
                      <div className="d-flex align-items-end justify-content-end">
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            dispatch(
                              setEdit({ edit: true, body: post[0].body })
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-4"
                          onClick={handleDelete}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Posts;
