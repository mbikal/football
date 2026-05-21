import { useEffect, useState } from "react";
import Header from "../components/Header";
import NewsContainer from "../components/NewsContainer";
import Footer from "../components/Footer";
const API_KEY = "3f3dd65a0ea34fb8bdf3485b4ae69113";
function News(){
    const [news, setNews] = useState([]);
    useEffect(() => {
        async function fetchNews(){
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=football&sortBy=publishedAt&pageSize=100&apiKey=${API_KEY}`
        );
        const data = await res.json();
        console.log(data);
        setNews(data.articles);
        }
        fetchNews();
    }, [])
    return (
        <div>
            <Header />
            <NewsContainer news={news} />
            <Footer />
        </div>
    )
}
export default News;