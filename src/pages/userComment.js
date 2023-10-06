import React from "react";
import styles from "../styles/Home.module.css";
import "firebase/database";
import firebase from "./firebase";
import { db, analytics } from "./firebase";
import { push, ref } from "firebase/database";
import { getDatabase, get } from "firebase/database";
import { useState } from "react";
import { useEffect } from "react";

function userComment() {
  const [allUserComments, setAllUserComments] = useState([]);
  const [visibleComments, setVisibleComments] = useState([]);
  const [commentData, setCommentData] = useState({
    UserName: "",
    UserMessage: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 3;

  const handleInputChangeInComment = (e) => {
    const { name, value } = e.target;
    // Update the state only if name is "UserName" or "UserMessage".
    if (name === "UserName" || name === "UserMessage") {
      setCommentData({ ...commentData, [name]: value });
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await push(ref(db, "userComments"), commentData);
      setCommentData({
        UserName: "",
        UserMessage: "",
      });
      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting comment", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = getDatabase();
        const response = await get(ref(dbRef, "userComments"));
        const data = response.val();

        if (data && typeof data === "object") {
          const dataArray = Object.values(data);
          setAllUserComments(dataArray);
        } else {
          setAllUserComments([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setAllUserComments([]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    const currentComments = allUserComments.slice(startIndex, endIndex);
    setVisibleComments(currentComments);
  }, [allUserComments, currentPage]);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(allUserComments.length / commentsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className={styles.feedBack}>
        <div className={styles.header}>
          <h1>Post Your Comment</h1>
        </div>
        <div className={styles.form}>
          <form onSubmit={handleCommentSubmit}>
            <div className={styles.inputFields}>
              <div className={styles.fieldOne}>
                <label htmlFor="UserName">Your Name</label>
                <input
                  type="text"
                  id="UserName"
                  name="UserName"
                  value={commentData.UserName}
                  onChange={handleInputChangeInComment}
                  placeholder="Enter your name"
                />
              </div>

              <div className={styles.fieldTwo}>
                <label htmlFor="UserMessage">Your Message</label>
                <textarea
                  id="UserMessage"
                  name="UserMessage"
                  value={commentData.UserMessage}
                  onChange={handleInputChangeInComment}
                  placeholder="Enter your message"
                  rows="4"
                />
              </div>

              <div className={styles.submitBtn}>
                <button type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.userMessageContainer}>
        {visibleComments.map((comment, index) => (
          <div key={index} className={styles.subUserMessage}>
            <div className={styles.userName}>
              <h1>{comment.UserName}</h1>
            </div>
            <div className={styles.userMessage}>
              <p>{comment.UserMessage}</p>
            </div>
          </div>
        ))}
        {allUserComments.length > commentsPerPage && (
          <div className={styles.pagination}>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={
                currentPage ===
                Math.ceil(allUserComments.length / commentsPerPage)
              }
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default userComment;
