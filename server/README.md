# Proxy Server for Korean Dictionary API
A proxy server to bypass CORS restrictions for the [Korean Dictionary API](https://krdict.korean.go.kr/openApi/openApiInfo).

## Installation
1. (Optional) Create and activate a python virtual environment
2. Install dependencies with `pip install -r requirements.txt`
3. Create a .env file in this directory and add your API key
```
KRDICT_KEY=<your_api_key>
```
4. Run the server with `flask run`
5. By default, server is accessible in [http://localhost:5000](http://localhost:5000)
