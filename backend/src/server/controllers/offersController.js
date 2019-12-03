const api = require("../../scrappers/api.js");
const Search = require("../models/Data");

exports.checkOffers = async function(req, res) {
  let { city, pages, category } = req.query;

  city = city.toLowerCase();
  category = category.toLowerCase();

  let jobOffer = await Search.findOne({ name: `${city}-${category}` });
  try {
    if (jobOffer) {
      let time = Date.now() - new Date(jobOffer.date);
      let timeMinutes = Math.floor(time / 60000);
      if (timeMinutes >= 0 && timeMinutes < 60) {
        res.status(200).send(jobOffer.data);
      } else {
        const response = await api.getAllOffers(city, category, pages);
        await Search.findOneAndUpdate(
          { name: `${city}-${category}` },
          { data: response, date: Date.now() }
        );
        res.status(200).send(response);
      }
    } else {
      const response = await api.getAllOffers(city, category, pages);
      const search = new Search({
        name: `${city}-${category}`,
        data: response
      });
      await search.save();
      res.status(200).send(response);
    }
  } catch (err) {
    res.status(500).send("Internal server error...");
  }
};
