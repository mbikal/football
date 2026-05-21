import Header from "../components/Header";
import styles from "./AboutUs.module.css";

function AboutUs() {
  return (
    <>
      <Header />

      <div className={styles.aboutPage}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1>About GoalZone</h1>
          <p>
            Your ultimate destination for the latest football news, match
            updates, transfer rumors, player insights, and live scores from
            leagues around the world.
          </p>
        </section>

        {/* About Section */}
        <section className={styles.content}>
          <h2>Who We Are</h2>
          <p>
            GoalZone is built for football fans who want fast, accurate, and
            exciting updates. Whether you're following the Premier League,
            Champions League, La Liga, or international tournaments, we bring
            you the stories that matter.
          </p>

          <p>
            Our mission is to keep football lovers connected with breaking news,
            match highlights, team standings, and expert analysis — all in one
            place.
          </p>
        </section>

        {/* Features */}
        <section className={styles.features}>
          <h2>What We Offer</h2>

          <div className={styles.cards}>
            <div className={styles.card}>
              <h3>⚽ Latest News</h3>
              <p>
                Stay updated with breaking football news from clubs and leagues
                worldwide.
              </p>
            </div>

            <div className={styles.card}>
              <h3>📊 Live Scores</h3>
              <p>
                Follow live match scores, fixtures, and results in real-time.
              </p>
            </div>

            <div className={styles.card}>
              <h3>🔄 Transfer Updates</h3>
              <p>
                Get the latest transfer rumors and official player signings.
              </p>
            </div>

            <div className={styles.card}>
              <h3>🏆 Match Analysis</h3>
              <p>
                Read expert opinions, tactical analysis, and match previews.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className={styles.footer}>
          <p>⚽ Made for football fans, by football fans.</p>
        </section>
      </div>
    </>
  );
}

export default AboutUs;
