import React from "react";
import GoodExample from "../../assets/images/goodExample.jpg";
import BadExample from "../../assets/images/badExample.jpg";
import "./homePage.css";

function HomePage() {
	return (
		<div className="homeWrapper">
			<div className="splashDiv">
				<h1 className="titleName ">
					<span className="testname">PLANTIFY</span>
				</h1>
			</div>
			<div className="container">
				<div className="aboutBody">
					<h2>About
					</h2>
					<hr />
					<p>
						Welcome to Plantify! Do you ever wonder what that plant was you
						recieved as a house warming gift? Or do you have a hard time
						remembering when all your plants need to be feed and watered? Well
						worry no more! This App can help identify your plants via your own
						pictures and setup a feeding and watering schedule for your plants!
						Being a plant owner has never been so easy!
					</p>
				</div>
				<br /> <br /> <br />
				<div className="docBody">
					<h2>Documentation</h2>
					<hr />
					<br/>


					<div className="howToDiv">
					{/* <h3>How to</h3> */}
					<p>Identifying a plant is as easy as taking a picture and uploading it. For best results take a picture that clearly shows the plants leaves or petals.</p>
					<div className="exampleDiv">
						
						<img className="goodExample" src={GoodExample} alt="Good Example"/>

						<img className="badExample" src={BadExample} alt="Good Example"/>
						
						<p>On the left the picture clearly displays the flowers petals and leaves. On the right there are multiple plants and the angle of the image makes it difficult to see the plants features.</p>
					</div>
					{/* <br/><br/><br/> */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomePage;
