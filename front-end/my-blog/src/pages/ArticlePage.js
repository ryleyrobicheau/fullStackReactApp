import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import articles from "./article-content";
import useUser from "../hooks/useUser";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({
    upvotes: 0,
    comments: [],
    canUpvote: false,
  });
  const { canUpvote } = articleInfo;
  const { articleId } = useParams();

  const { user, isLoading } = useUser();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      const response = await axios.get(`/api/articles/${articleId}`, {
        headers,
      });
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    };

    if (isLoading) {
      loadArticleInfo();
    }
  }, [isLoading, user]);

  const article = articles.find((article) => article.name === articleId);

  const addUpvote = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.put(
      `/api/articles/${articleId}/upvote`,
      null,
      { headers }
    );

    // Log the response data from the server
    console.log("Response Data from Server:", response.data);

    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
  };

  if (!article) {
    return <NotFoundPage />;
  }
  return (
    <>
      <h1>{article.title}</h1>
      <div className="upvotes-section">
        {user ? (
          <button onClick={addUpvote}>{canUpvote ? 'Upvote' : 'Already upvoted'}</button>
        ) : (
          <button>Log in to upvote</button>
        )}
        <p>This Article Has {articleInfo.upvotes} Upvote(s)</p>
      </div>
      {article.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      {user ? (
        <AddCommentForm
          articleName={articleId}
          onArticleUpdate={(updatedArticle) => setArticleInfo(updatedArticle)}
        />
      ) : (
        <button>Log in to leave a comment</button>
      )}
      <CommentsList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
