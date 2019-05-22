import React, { Component } from "react";
import Loader from "react-loader-spinner";
import image2base64 from "image-to-base64";
import axios from "axios";
import cheerio from "cheerio";
import Navbar from "../Navbar/Navbar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import tropical from "../../assets/images/tropical.jpg";
import succulent from "../../assets/images/succulent.jpg";
import Banner2 from "../../assets/images/leafy.jpg";
import "./style.css";
import decode from "jwt-decode";
import API from "../../utils/API";
import KEYS from "../../utils/KEYS"
const KEY = KEYS.PLANT_ID_KEY;
let b64Str;
let body = {};
let IMGURKEY = KEYS.IMGUR_KEY;

axios.defaults.headers.post["Content-Type"] = "application/json";

const styles = {
  Paper: { marginRight: 75, marginLeft: 75, marginBottom:50, marginTop: 50, height: 500 }
};

class IDpage extends Component {
  state = {
    selectedFile: null,
    uploadedFileLink: "",
    waitingForData: false,
    isScraped: false,
    plantObj: {},
    suggestions: {},
    userID: null,
    plantName: null
  };

  // componentDidMount = () => {
  //   var plantName = "Oxalis corniculata"
  //   var searchTerm = plantName.toLowerCase().split(" ")
  //   console.log(searchTerm[0])
  //   this.scrape(searchTerm[0], plantName.toLowerCase());
  // };

  componentDidMount() {
    const { id } = decode(localStorage.getItem("x-auth-token"));
    console.log(id)
    this.setState({ userID: id });
  }

  confirmSuggestion = plantName => {
    console.log("scrape plantName: ", plantName);
    this.setState({plantName})
    var searchTerm = plantName.toLowerCase().split(" ");
    console.log(searchTerm[0]);
    this.scrape(searchTerm[0], plantName.toLowerCase());
  };

  scrape = (searchTerm, plantName) => {
    let plantRaw = [];
    let plantURL;
    let plantInfo = {};
    var self = this;
    console.log("Scrape started");
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://garden.org/plants/search/text/?q=${searchTerm}`
      )
      .then(response => {
        var $ = cheerio.load(response.data);

        $(".pretty-table a").each(function(i, element) {
          if (
            $(this)
              .text()
              .toLowerCase()
              .endsWith(`(${plantName})`)
          ) {
            plantURL = $(this).attr("href");

            console.log(plantURL);

            axios
              .get(
                `https://cors-anywhere.herokuapp.com/https://garden.org${plantURL}`
              )
              .then(response => {
                console.log("we are here");
                var $ = cheerio.load(response.data);

                $(".simple-table td").each(function(i, element) {
                  plantRaw.push($(this).text());
                });

                for (i = 0; i < plantRaw.length; i++) {
                  if (plantRaw[i].endsWith(":")) {
                    plantInfo[i] = {
                      header: plantRaw[i],
                      info: plantRaw[i + 1]
                    };
                  }
                }

                console.log(plantInfo);
                self.setState({ plantObj: plantInfo });
                self.setState({ isScraped: true });

                API.addUserPlant({
                    owner: self.state.userID,
                    name: self.state.plantName,
                    url: self.state.uploadedFileLink,
                    plantInfo
                })
              });
          }
        });
      });
  };

  checkId = body => {
    this.setState({ waitingForData: true });
    axios
      .post(
        "https://cors-anywhere.herokuapp.com/https://api.plant.id/check_identifications",
        body
      )
      .then(response => {
        if (response.data[0].suggestions.length > 0) {
          this.setState({ suggestions: response.data[0].suggestions });
          this.setState({ waitingForData: false });
          // this.scrape(this.state.suggestions[0].plant.name.toLowerCase())
        } else {
          console.log("suggestions not ready yet for id: " + body.ids);
          console.log("trying again....");
          this.checkId(body);
        }
      });
  };

  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  uploadHandler = () => {
    this.setState({ suggestions: "" });
    var headers = {
      "Content-Type": "application/json",
      Authorization: `Client-ID ${IMGURKEY}`,
      "Access-Control-Allow-Origin": "*"
    };
    var formData = new FormData();
    formData.append("image", this.state.selectedFile);
    axios
      .post(
        "https://cors-anywhere.herokuapp.com/https://api.imgur.com/3/upload",
        formData,
        {
          headers: headers
        }
      )
      .then(response => {
        this.setState({ uploadedFileLink: response.data.data.link });
        image2base64(response.data.data.link)
          .then(response => {
            console.log(response);
            b64Str = response;
            body = {
              key: KEY,
              usage_info: true,
              images: [b64Str]
            };
            console.log(body);
            // initial request to plant.id
            axios
              .post(
                "https://cors-anywhere.herokuapp.com/https://api.plant.id/identify",
                body
              )
              .then(response => {
                body = {
                  key: KEY,
                  ids: [response.data.id]
                };
                console.log(response.data.usage_info);
                console.log(body);
                // call method to listen for identification
                this.checkId(body);
              });
          })
          .catch(error => {
            console.log(error);
          });
      });
  };

  render() {
    var self = this;
    return (
      <div>
        {this.state.isScraped ? (
          Object.entries(this.state.plantObj).map((plant, i) => {
            return (
              <li key={i}>
                {plant[1].header} {plant[1].info} {console.log(plant)}
              </li>
            );
          })
        ) : (
          
          <div>
              <div>
                <img className="splashImg2" src={Banner2} alt="splashImg2"/>
              </div>
              <div className="bodyId">
            <Grid container>
                <Grid item sm={2}></Grid>
                  <Grid item sm={8}>    
                          <Paper style={styles.Paper}>
            <div className="input-back">                
            <h1 className="id-title">My Plant Identifier</h1>
            <input
              type="file"
              accept="image/*"
              onChange={this.fileChangedHandler}
            />
            <h4 className="sub-tag">Upload a picture of a plant you wish to identify!</h4>
            <button class="sub-butt" onClick={this.uploadHandler}>Upload!</button>
            
            {this.state.waitingForData ? (
              <Loader type="Oval" color="#00BFFF" height="100" width="100" />
              
            ) : (
              <p />
            )}

            <h1>
              {this.state.suggestions.length > 0 &&
                this.state.suggestions.map(function(suggestion, i) {
                  return (
                    <button
                      key={i}
                      onClick={() =>
                        self.confirmSuggestion(suggestion.plant.name)
                      }
                    >
                      {suggestion.plant.name}
                    </button>
                  );
                })}
            </h1>
            {
              <img
                alt="user uploaded"
                src={
                  this.state.uploadedFileLink.length > 0 &&
                  this.state.uploadedFileLink
                }
              />
            }
                      </div>          
                    </Paper> 
                  </Grid>
              <Grid item sm={2}></Grid>
            </Grid>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default IDpage;
