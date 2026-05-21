import { useEffect, useState } from "react";
import Header from "../components/Header";
import NewsContainer from "../components/NewsContainer";
import Footer from "../components/Footer";

const API_KEY = "3f3dd65a0ea34fb8bdf3485b4ae69113";

type Article = {
  title: string;
  url: string;
  urlToImage?: string;
};

function News() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://newsapi.org/v2/everything?q=football&sortBy=publishedAt&pageSize=100&apiKey=${API_KEY}`,
        );

        if (!res.ok) {
          throw new Error(`API Error: ${res.status}`);
        }

        const data = await res.json();

        if (!data.articles) {
          throw new Error("Invalid API response");
        }

        setNews(data.articles);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  return (
    <div>
      <Header />

      {loading && <p>Loading news...</p>}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && <NewsContainer news={news} />}

      <Footer />
    </div>
  );
}

export default News;
