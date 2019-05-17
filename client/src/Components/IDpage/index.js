import React from "react";
import Navbar from "../Navbar/Navbar";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import tropical from "../../assets/images/tropical.jpg";
import succulent from "../../assets/images/succulent.jpg";
import "./style.css"
// import Banner from "../../assets/images/banner-lush.jpg"
import Banner2 from "../../assets/images/leafy.jpg"


const styles = {
    Paper: {marginRight:75, marginLeft:75, marginTop:50, marginBottom:50, height:450},
    
}



function IDpage (){
    
    return(
        <>
            <div className="App">
      <Navbar/>
                <div>
                    <img className="splashImg2" src={Banner2} alt="splashImg2"/>
                </div>
        <div className="bodyId">
        <Grid container>
                <Grid item sm={2}></Grid>
                <Grid item sm={8}>    
                    <Paper style={styles.Paper}>
                        <div className="input-back">
                        <div className="bg"></div>
                            <h1 className="id-title">My Plant Identifier</h1>
                            <h4 className="sub-tag">Upload a picture of a plant you wish to identify!</h4>                                          
                            
                            <input type="file" className="pic-box" name="pic" accept="image/*"/>                  
                            <button className="sub-butt" type="submit">Find my Plant!</button>                                      
                        </div>
                    </Paper> 
                </Grid>
                <Grid item sm={2}></Grid>
        </Grid>
            
        <div className="footer">
          
        </div>
        </div>
      </div>
            
        </>

    )
}

export default IDpage;