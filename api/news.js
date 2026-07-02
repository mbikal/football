export default async function handler(req, res) {
  const apiKey = "3f3dd65a0ea34fb8bdf3485b4ae69113";
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=football&sortBy=publishedAt&pageSize=100&apiKey=${apiKey}`
    );
    
    // Add CORS headers to the response
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error("Serverless Function Error:", error);
    return res.status(500).json({ error: error.message || "Failed to fetch news" });
  }
}
