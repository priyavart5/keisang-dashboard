import React, { useEffect, useState } from "react";
import { Checkbox, Button } from "antd";
import "../styles/filter.css";

const { Group: CheckboxGroup } = Checkbox;

const Filters = ({ data, onApply, onClose }) => {
  const [make, setMake] = useState([]);
  const [duration, setDuration] = useState([]);
  const [totalBrand, setTotalBrand] = useState([]);

  const applyFilters = () => {
    onApply({ make, duration });
  };

  useEffect(() => {
    const brands = data.map(item => item.brand);
    const uniqueBrands = [...new Set(brands)];
    setTotalBrand(uniqueBrands);
  }, []);

  const handleMakeChange = (checkedValues) => {
    setMake(checkedValues);
  };

  const handleDurationChange = (checkedValues) => {
    setDuration(checkedValues);
  };

  return (
    <>
    <div className="filter_panel">
      <div className="filter_panel_top">
        <img className="close_button" onClick={onClose} src="/assets/chevronLeft.png" alt="left" />
        <h3 className="filter_panel_top_head">Filter Data By</h3>
      </div>

      <div style={{ marginBottom: 16 }}>
        <h4>Select Make</h4>
        <CheckboxGroup
          options={totalBrand}
          value={make}
          onChange={handleMakeChange}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <h4>Select Duration</h4>
        <CheckboxGroup
          options={[
            "Last Month",
            "This Month",
            "Last 3 Months",
            "Last 6 Months",
            "This Year",
            "Last Year",
          ]}
          value={duration}
          onChange={handleDurationChange}
        />
      </div>

      <Button type="primary" onClick={applyFilters} style={{ width: "100%" }}>
        Apply Filters
      </Button>
    </div>
    </>
  );
};

export default Filters;
