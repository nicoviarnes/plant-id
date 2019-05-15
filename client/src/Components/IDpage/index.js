import React from "react";
import Navbar from "../Navbar/Navbar";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import tropical from "../../assets/images/tropical.jpg";
import succulent from "../../assets/images/succulent.jpg";
import "./style.css"


const styles = {
    Paper: {marginRight:75, marginLeft:75, marginTop:50, height:500},
    
}



function IDpage (){
    
    return(
        <>
            <Grid container>
                {/* <Grid item sm={12}>
                    <Navbar/>
                </Grid> */}
                <Grid item sm={12}>    
                    <div>
                        <h1>Test</h1>
                    </div>
                </Grid>
                <Grid item sm={2}>    
                <img className="panel-back" src={succulent} alt="succulents"/>
                </Grid>     
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
                              
                <Grid item sm={2}>    
                    
                        <img className="panel-back" src={tropical} alt="tropical plant"/>
                        
                    
                </Grid>               
            </Grid>
        </>

    )
}

export default IDpage;