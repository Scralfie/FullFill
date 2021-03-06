import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Donation = () => {
  const [inputValue, setInputValue] = useState("");
  const [submitValue, setSubmitValue] = useState("Clapham Common");
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    async function searchApi(searchString) {
      try {
        const result = await axios.get(
          `https://www.givefood.org.uk/api/2/foodbanks/search/?address=${searchString}`
        );
        setLocationData(result.data);
      } catch (err) {
        console.log(err);
      }
    }

    searchApi(submitValue);
  }, [submitValue]);

  const renderLocations = () => {
    return locationData.map((s, i) => (
      <li key={i} className="show-link">
        <Card sx={{ minWidth: 275 }} className="donation-card">
          <CardContent>
            <Typography variant="h6" component="div">
              {s.name} Foodbank
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {s.distance_mi} miles away from {submitValue}
            </Typography>
            <Typography sx={{ mb: 1.5 }} variant="body2">
              {s.needs.needs}
              <br />
              <strong>Phone number:</strong> {s.phone}
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small">More Details</Button>
          </CardActions> */}
        </Card>
        <br />
      </li>
    ));
  };

  const handleInput = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitValue(inputValue);
    setInputValue("");
    console.log("Submitted: ", submitValue);
  };

  return (
    <>
      <h1 className="main-titles">Donate Food:</h1>
      <p>
        Your food donations count and are vital to give everyone referred a food
        bank a balanced and nutritious three day supply of food.
      </p>
      <p>
        You can use the search box below to find the food the food banks near
        you are in need of:
      </p>

      <form
        role="donationForm"
        onSubmit={handleSubmit}
        className="search-bar-form"
      >
        <input
          type="text"
          onChange={handleInput}
          value={inputValue}
          className="search-form-control search-input"
        ></input>

        <button type="submit" className="search-btn">
          Search
        </button>
        <br />
      </form>
      <br />
      <h5>Foodbanks near {submitValue}:</h5>
      <br />
      <ol>{renderLocations()}</ol>
    </>
  );
};

export default Donation;
