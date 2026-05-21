import styles from "./NewsContainer.module.css";
import TextExpander from "./TextExpander";
function NewsContainer({news}){
    return (
      <div>
        {news.length === 0 && <p>Loading news...</p>}
        {news.map((article, index) => (
          <div key={index} className={styles.NewsContainer} onClick={()=> window.open(article.url, "_blank")}>
            <img
              className={styles.img}
              src={article.urlToImage}
              alt={article.title}
            />
            <h2>{article.title}</h2>
            <TextExpander maxLength={120}>
              {article.description}
            </TextExpander>
          </div>
        ))}
      </div>
    );
}

export default NewsContainer;