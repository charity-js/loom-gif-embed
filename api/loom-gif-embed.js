import { gifEmbed } from "@loomhq/loom-embed";

export default async function handler(req, res) {
  try {
    const url = (req.query && req.query.url) || (req.body && req.body.url);
    if (!url) {
      res.status(400).send("Missing ?url or body.url");
      return;
    }
    if (!/^https:\/\/(www\.)?loom\.com\/share\/[a-z0-9]+$/i.test(url)) {
      res.status(400).send("Invalid Loom share URL");
      return;
    }

    const html = await gifEmbed(url); // <a><img ...full-play.gif.../></a>
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(html);
  } catch (err) {
    console.error("Loom GIF embed error:", err);
    res.status(500).send("Failed to fetch Loom GIF embed");
  }
}
