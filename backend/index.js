const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const csv = require("csv-parser");

dotenv.config();
const app = express();

app.use(cors());

app.get("/api/inventory", (req, res) => {
  const results = [];
  fs.createReadStream("data/sample-data.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      let filteredData = results;

      let { make, duration } = req.query;

      if (make) {
        make = Array.isArray(make) ? make : [make];
        filteredData = filteredData.filter((item) => make.includes(item.brand));
      }

      if (duration) {
        duration = Array.isArray(duration) ? duration : [duration];
        const now = new Date();

        filteredData = filteredData.filter((item) => {
          const date = new Date(item.timestamp);
          let shouldInclude = false;

          duration.forEach((dur) => {
            const filterDate = new Date(now);

            switch (dur) {
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
            }

            if (date >= filterDate) {
              shouldInclude = true;
            }
          });

          return shouldInclude;
        });
      }

      res.json(filteredData);
    });
});

app.listen(3000, () => console.log(`Server running on http://localhost:3000`));
