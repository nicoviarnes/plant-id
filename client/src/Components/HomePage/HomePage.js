import React from "react";
// import Navbar from "../Navbar/Navbar";
import SplashBG from "../../assets/images/small.jpg";
import Banner from "../../assets/images/banner-lush.jpg";
import testbg from "../../assets/images/tests/test4.jpg";

import "./homePage.css";

function HomePage() {
	return (
		<>
			{/* <Navbar/> */}
			<div>
				<img className="splashImg" src={SplashBG} alt="splashImg" />
				<h1 className="titleName ">
					<span className="testname">Plantify</span>
				</h1>
			</div>
			<div className="container">
				<br />
				<div className="aboutBody">
					<h2>About</h2>
					<hr />
					<p>
						Welcome too Plantify! Do you ever wonder what that plant was you
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
					<p>
						This application can help you identify, store, and manage your
						plants in one easy place.
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac elit
						id risus euismod vestibulum. Sed sodales lobortis mi non aliquam.
						Nullam eget ex non tortor gravida maximus id nec felis. Duis auctor
						tristique leo, sed varius sapien. Vivamus feugiat tempor nisl sed
						ullamcorper. Donec.
					</p>
				</div>
			</div>
		</>
	);
}

export default HomePage;
