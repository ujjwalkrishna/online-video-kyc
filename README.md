<div id="top"></div>


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="frontend/public/android-chrome-512x512.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Online Video KYC Platform</h3>

  <p align="center">
    It is a platform for customers to verify their KYC through video calling with agents.
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
       <ul>
        <li><a href="#journey-map">Journey Map Diagram</a></li>
      </ul>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
       <ul>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="frontend\src\assets\images\popup.png" alt="Journey Map Diagram" width="1920" height="982">
  </a>
</div>
<br />

This project is about doing online KYC through video verification process. This will eliminate physical presence of an agent further reducing the cost of onboarding a customer.
Also Personal interview with the customers to assess his credit worthiness including verification of his location through GPS co-ordinates, face match with KYC 
documents during video call.

<p align="right">(<a href="#top">back to top</a>)</p>

### Journey Map Diagram
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="frontend\src\assets\images\journey_map_diagram.png" alt="Journey Map Diagram" width="700" height="450">
  </a>
</div>
<br />

### Built With
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="frontend\src\assets\images\tech_stack.png" alt="Journey Map Diagram" width="500" height="356">
  </a>
</div>
<br />

* [React.js](https://reactjs.org/)
* [Node.js](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/)


<p align="right">(<a href="#top">back to top</a>)</p>

### Features

* Used google map places widget API to suggest the user's their address.

* Used geolocation API to fetch the real-time location of the user.

* Integrated Screen sharing functionality and chat feature during a personal interview on the video call.

* Integrated video downloading functionality during video-call.

* Realtime face capturing of user.

* Taking all important documents as input from the user and saving them in disk storage and storing their link to the database record.

* Used nomemailer to send meeting links and code to users on their registered email.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get Google Maps API Key from here: [https://developers.google.com/maps/documentation/javascript/get-api-key](https://developers.google.com/maps/documentation/javascript/get-api-key)
2. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `.env file`
   ```js
   REACT_APP_GOOGLE_MAPS_API_KEY='ENTER YOUR API';
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Krishna Ujjwal - [@linkedin_ujjwalkrishn48](https://www.linkedin.com/in/ujjwalkrishna48/) - ujjwalkrishna48@gmail.com

Project Link: [https://github.com/github_username/repo_name](https://github.com/github_username/repo_name)

<p align="right">(<a href="#top">back to top</a>)</p>