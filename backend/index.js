const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const getFilterDate = (duration, now) => {
  const filterDate = new Date(now);
  switch (duration) {
    case "Last Month":
      filterDate.setMonth(now.getMonth() - 1);
      break;
    case "This Month":
      filterDate.setMonth(now.getMonth());
      break;
    case "Last 3 Months":
      filterDate.setMonth(now.getMonth() - 3);
      break;
    case "Last 6 Months":
      filterDate.setMonth(now.getMonth() - 6);
      break;
    case "This Year":
      filterDate.setFullYear(now.getFullYear());
      break;
    case "Last Year":
      filterDate.setFullYear(now.getFullYear() - 1);
      break;
    default:
      break;
  }
  return filterDate;
};

app.get("/api/inventory", (req, res) => {
  const results = [];
  const csvFilePath = path.resolve(__dirname, "sample-data.csv");

  if (!fs.existsSync(csvFilePath)) {
    return res.status(404).json({ error: "CSV file not found" });
  }

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      try {
        let filteredData = results;
        const { make, duration } = req.query;

        if (make) {
          const makeArray = Array.isArray(make) ? make : [make];
          filteredData = filteredData.filter((item) =>
            makeArray.includes(item.brand)
          );
        }

        if (duration) {
          const durationArray = Array.isArray(duration)
            ? duration
            : [duration];
          const now = new Date();

          filteredData = filteredData.filter((item) => {
            const itemDate = new Date(item.timestamp);
            return durationArray.some((dur) => itemDate >= getFilterDate(dur, now));
          });
        }

        res.json(filteredData);
      } catch (error) {
        res.status(500).json({ error: "Error processing data" });
      }
    })
    .on("error", (error) => {
      res.status(500).json({ error: "Error reading CSV file", details: error.message });
    });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
