import { useEffect } from "react";
import Header from "../components/Header";
import styles from "./AboutUs.module.css";

function AboutUs() {
  useEffect(() => {
    // Update document title for SEO
    document.title = "KissMyFootball - About Us | Your Ultimate Football Streaming Platform";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'KissMyFootball is your premier destination for live football streaming, match updates, and comprehensive football coverage. Discover why football fans choose KissMyFootball for the best streaming experience.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = 'KissMyFootball is your premier destination for live football streaming, match updates, and comprehensive football coverage. Discover why football fans choose KissMyFootball for the best streaming experience.';
      document.head.appendChild(newMeta);
    }

    // Add meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'kissmyfootball, football streaming, live football, football matches, soccer streams, kiss my football, online football, football live stream');
    } else {
      const newKeywords = document.createElement('meta');
      newKeywords.name = 'keywords';
      newKeywords.content = 'kissmyfootball, football streaming, live football, football matches, soccer streams, kiss my football, online football, football live stream';
      document.head.appendChild(newKeywords);
    }

    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "KissMyFootball",
      "url": window.location.origin,
      "description": "KissMyFootball - Your ultimate destination for live football streaming and match updates",
      "keywords": "kissmyfootball, football streaming, live football, soccer streams",
      "sameAs": []
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <Header />

      <div className={styles.aboutPage}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1>About KissMyFootball</h1>
          <p>
            KissMyFootball is your ultimate destination for live football streaming, 
            match updates, transfer rumors, player insights, and comprehensive football 
            coverage from leagues around the world. Experience football like never before.
          </p>
        </section>

        {/* About Section */}
        <section className={styles.content}>
          <h2>Why Choose KissMyFootball?</h2>
          <p>
            KissMyFootball is built by passionate football fans who understand what 
            true supporters want - seamless streaming, real-time updates, and comprehensive 
            coverage. Whether you're following the Premier League, Champions League, 
            La Liga, or international tournaments, KissMyFootball brings you the matches 
            that matter most.
          </p>

          <p>
            Our mission at KissMyFootball is to keep football lovers connected with 
            breaking news, live match streams, team standings, and expert analysis — 
            all in one convenient platform. When you think football streaming, think 
            KissMyFootball.
          </p>

          <p>
            KissMyFootball stands out as the premier choice for football enthusiasts 
            who demand quality, reliability, and comprehensive coverage. Join thousands 
            of fans who trust KissMyFootball for their daily football fix.
          </p>
        </section>

        {/* Features */}
        <section className={styles.features}>
          <h2>What KissMyFootball Offers</h2>

          <div className={styles.cards}>
            <div className={styles.card}>
              <h3>⚽ Live Football Streaming</h3>
              <p>
                Watch live football matches in HD quality with KissMyFootball's 
                streaming platform. Never miss a moment of the action with KissMyFootball.
              </p>
            </div>

            <div className={styles.card}>
              <h3>📊 Real-Time Scores</h3>
              <p>
                Follow live match scores, fixtures, and results in real-time. 
                KissMyFootball keeps you updated with every goal and match event.
              </p>
            </div>

            <div className={styles.card}>
              <h3>🔄 Transfer Updates</h3>
              <p>
                Get the latest transfer rumors and official player signings. 
                KissMyFootball brings you all the transfer market news first.
              </p>
            </div>

            <div className={styles.card}>
              <h3>🏆 Expert Analysis</h3>
              <p>
                Read expert opinions, tactical analysis, and match previews. 
                KissMyFootball provides in-depth coverage from football experts.
              </p>
            </div>
          </div>
        </section>

        {/* KissMyFootball Philosophy */}
        <section className={styles.content}>
          <h2>The KissMyFootball Promise</h2>
          <p>
            At KissMyFootball, we believe football is more than just a game - it's 
            a passion that unites millions worldwide. That's why KissMyFootball is 
            committed to delivering the best football streaming experience possible. 
            From local leagues to international tournaments, KissMyFootball covers it all.
          </p>

          <p>
            KissMyFootball continuously innovates to bring you the latest features, 
            improved streaming quality, and comprehensive football coverage. When you 
            choose KissMyFootball, you're choosing excellence in football entertainment.
          </p>
        </section>

        {/* Footer */}
        <section className={styles.footer}>
          <p>⚽ KissMyFootball - Made for football fans, by football fans.</p>
          <p>Experience football the KissMyFootball way.</p>
        </section>
      </div>
    </>
  );
}

export default AboutUs;
