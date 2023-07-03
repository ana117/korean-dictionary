# Korean Dictionary
ReactJS web app using [Korean Dictionary API](https://krdict.korean.go.kr/openApi/openApiInfo) to search for Korean words and their definitions in English.


## Features
- Korean to English
- English to Korean
- Virtual Korean keyboard


## Demo
[Github Page](https://ana117.github.io/korean-dictionary/)

<p align="middle">
   <img src="../assets/kor2eng.png" alt="Feature 1" width="45%"/> 
   <img src="../assets/eng2kor.png" alt="Feature 2" width="45%"/> 
</p>


## Requirements
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [Korean Dictionary API Key](https://krdict.korean.go.kr/openApi/openApiInfo)
- (Optional) [Proxy Server](server/README.md)


## Installation
1. Clone the repository
2. Install dependencies with `npm install`
3. Create a .env file in the root directory and add your proxy server and/or API key
   - If you **are** using the proxy server, you can put anything as the API key (API key are set on the server)
   - If you **are not** using the proxy server, you can put the API URL directly as the proxy server URL
```
REACT_APP_API_URL=<your_proxy_server_url>
REACT_APP_API_KEY=<your_api_key>
```
4. Run the app with `npm start`
5. By default, open [http://localhost:3000](http://localhost:3000) to view it in the browser


## Limitations
- The API key is limited to 50.000 requests per day
- English to Korean functionality uses HTML web scraper. The result may not be accurate and may break
- Proxy server for the demo page is hosted on PythonAnywhere and may be unavailable at times
- Proxy server for the demo page goes to sleep after inactivity. If an error occurred, try again after a few seconds

## License
[MIT](LICENSE)
