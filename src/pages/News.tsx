import { useEffect, useState } from "react";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_KEY = "3f3dd65a0ea34fb8bdf3485b4ae69113";

type Article = {
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source?: {
    name: string;
  };
};

function News() {
  const [news, setNews] = useState<Article[]>([]);
  const [filteredNews, setFilteredNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All News", icon: "📰" },
    { id: "premier-league", name: "Premier League", icon: "⚪" },
    { id: "champions-league", name: "Champions League", icon: "🏆" },
    { id: "transfers", name: "Transfers", icon: "🔄" },
    { id: "international", name: "International", icon: "🌍" },
  ];

  // ✅ AD SCRIPT (bottom banner) with error handling
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.innerHTML = `
      atOptions = {
        'key' : '070cc7f3560099e01301ff26cf81dc4b',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    `;

    const script2 = document.createElement("script");
    script2.src = "https://hoodinvoluntaryplash.com/070cc7f3560099e01301ff26cf81dc4b/invoke.js";
    script2.async = true;
    script2.crossOrigin = "anonymous";

    // Add timeout to prevent hanging
    const timeout = setTimeout(() => {
      console.warn("Ad script loading timeout - preventing errors");
    }, 5000);

    // Enhanced error handling for the script
    script2.onload = () => {
      clearTimeout(timeout);
      console.log("Ad script loaded successfully");
    };

    script2.onerror = () => {
      clearTimeout(timeout);
      console.warn("Ad script failed to load - this is expected behavior");
    };

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    return () => {
      clearTimeout(timeout);
      try {
        if (document.body.contains(script1)) {
          document.body.removeChild(script1);
        }
        if (document.body.contains(script2)) {
          document.body.removeChild(script2);
        }
      } catch (error) {
        console.warn("Error removing ad scripts:", error);
      }
    };
  }, []);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://newsapi.org/v2/everything?q=football&sortBy=publishedAt&pageSize=100&apiKey=${API_KEY}`,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            mode: 'cors'
          }
        );

        if (!res.ok) {
          if (res.status === 426) {
            throw new Error('API requires protocol upgrade - using fallback data');
          }
          throw new Error(`API Error: ${res.status}`);
        }

        const data = await res.json();

        if (!data.articles) {
          throw new Error("Invalid API response");
        }

        setNews(data.articles);
        setFilteredNews(data.articles);
      } catch (err: any) {
        console.error(err);
        if (err.message.includes('426') || err.message.includes('protocol upgrade')) {
          // Use fallback data for API Error 426
          const fallbackNews = [
            {
              title: "Latest Football Updates",
              description: "Stay tuned for the latest football news and updates from around the world.",
              url: "#",
              urlToImage: "/logo.png",
              publishedAt: new Date().toISOString(),
              source: { name: "kissmyfootball" }
            },
            {
              title: "Match Highlights Available",
              description: "Check out the latest match highlights and analysis from recent games.",
              url: "#",
              urlToImage: "/logo.png",
              publishedAt: new Date().toISOString(),
              source: { name: "kissmyfootball" }
            },
            {
              title: "Transfer Window Updates",
              description: "Get the latest transfer rumors and confirmed deals from the football world.",
              url: "#",
              urlToImage: "/logo.png",
              publishedAt: new Date().toISOString(),
              source: { name: "kissmyfootball" }
            }
          ];
          setNews(fallbackNews);
          setFilteredNews(fallbackNews);
          setError(null);
        } else {
          setError(err.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  useEffect(() => {
    let filtered = news;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category (simplified - in real app, you'd categorize based on content)
    if (selectedCategory !== "all") {
      filtered = filtered.filter((article) =>
        article.title.toLowerCase().includes(selectedCategory.replace("-", " "))
      );
    }

    setFilteredNews(filtered);
  }, [news, searchTerm, selectedCategory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      color: 'white'
    }}>
      <Header />
      
      <main style={{
        padding: '40px 20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: '700',
            marginBottom: '16px',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            textTransform: 'lowercase',
            letterSpacing: '-1px',
            background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            kissmyfootball
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Stay updated with the latest football news, transfers, match highlights, and more from around the world.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          marginBottom: '48px'
        }}>
          {/* Search Bar */}
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            width: '100%'
          }}>
            <div style={{
              position: 'relative'
            }}>
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px 48px 16px 20px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  color: 'white',
                  fontSize: '16px',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <span style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '20px',
                color: 'rgba(255, 255, 255, 0.5)'
              }}>
                🔍
              </span>
            </div>
          </div>

          {/* Category Filter */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  padding: '12px 20px',
                  background: selectedCategory === category.id
                    ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                    : 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  border: selectedCategory === category.id
                    ? 'none'
                    : '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: selectedCategory === category.id
                    ? '0 4px 12px rgba(59, 130, 246, 0.3)'
                    : 'none'
                }}
                onMouseOver={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              border: '3px solid rgba(255, 255, 255, 0.2)',
              borderTop: '3px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px'
            }}></div>
            <p style={{
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.7)'
            }}>
              Loading latest football news...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '16px',
            margin: '20px auto',
            maxWidth: '600px'
          }}>
            <p style={{
              fontSize: '18px',
              color: '#fca5a5',
              margin: 0
            }}>
              ❌ {error}
            </p>
          </div>
        )}

        {/* News Grid */}
        {!loading && !error && (
          <>
            {filteredNews.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <p style={{
                  fontSize: '18px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  margin: 0
                }}>
                  No news found matching your criteria.
                </p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '24px',
                marginBottom: '48px'
              }}>
                {filteredNews.map((article, index) => {
                  // Insert ad banner after every 6 news articles
                  const shouldShowAd = index > 0 && (index + 1) % 6 === 0;
                  
                  return (
                    <React.Fragment key={index}>
                      <div
                        onClick={() => window.open(article.url, "_blank")}
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '16px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                        }}
                      >
                        {/* Article Image */}
                        {article.urlToImage ? (
                          <div style={{
                            width: '100%',
                            height: '200px',
                            overflow: 'hidden',
                            position: 'relative'
                          }}>
                            <img
                              src={article.urlToImage}
                              alt={article.title}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.3s ease'
                              }}
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            <div style={{
                              position: 'absolute',
                              bottom: '0',
                              left: '0',
                              right: '0',
                              height: '60px',
                              background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
                            }}></div>
                          </div>
                        ) : (
                          <div style={{
                            width: '100%',
                            height: '200px',
                            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '48px'
                          }}>
                            ⚽
                          </div>
                        )}

                        {/* Article Content */}
                        <div style={{
                          padding: '20px',
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column'
                        }}>
                          {/* Source and Date */}
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '12px',
                            fontSize: '12px',
                            color: 'rgba(255, 255, 255, 0.6)'
                          }}>
                            <span style={{
                              background: 'rgba(255, 255, 255, 0.1)',
                              padding: '4px 8px',
                              borderRadius: '6px'
                            }}>
                              {article.source?.name || 'Unknown Source'}
                            </span>
                            <span>
                              {formatDate(article.publishedAt)}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            marginBottom: '12px',
                            lineHeight: '1.4',
                            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                            color: 'white',
                            flex: 1
                          }}>
                            {article.title}
                          </h3>

                          {/* Description */}
                          {article.description && (
                            <p style={{
                              fontSize: '14px',
                              color: 'rgba(255, 255, 255, 0.7)',
                              lineHeight: '1.5',
                              marginBottom: '16px',
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}>
                              {article.description}
                            </p>
                          )}

                          {/* Read More */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#60a5fa',
                            marginTop: 'auto'
                          }}>
                            Read More
                            <span>→</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Ad Banner - inserted after every 6 news articles */}
                      {shouldShowAd && (
                        <div style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '16px',
                          padding: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minHeight: '200px',
                          gridColumn: '1 / -1'
                        }}>
                          <div style={{
                            fontSize: '14px',
                            color: 'rgba(255, 255, 255, 0.5)',
                            marginBottom: '12px',
                            textAlign: 'center'
                          }}>
                            Advertisement
                          </div>
                          <div style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            padding: '8px',
                            minWidth: '320px',
                            minHeight: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <span style={{
                              fontSize: '12px',
                              color: 'rgba(255, 255, 255, 0.4)'
                            }}>
                              Ad Space (320x50)
                            </span>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default News;
