import ArticleList from "../components/Articleslist";
import articles from "./article-content";


const ArticleListPage = () => {
    return (
        <>
            <ArticleList articles={articles} />
        </>
    );
}

export default ArticleListPage;