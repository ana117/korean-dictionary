# Korean Dictionary
A SvelteKit web app powered by [Korean Dictionary API](https://krdict.korean.go.kr/openApi/openApiInfo) to help you search for Korean words and their English definitions.


## Features
- Korean to English Translation
- Virtual Korean keyboard


## Getting Started
### Requirements
- [npm](https://www.npmjs.com/)
- [Korean Dictionary API Key](https://krdict.korean.go.kr/openApi/openApiInfo)

### Installation
1. Clone the repository
```bash
git clone https://github.com/ana117/korean-dictionary.git  
cd korean-dictionary  
```
2. Install dependencies with `npm install`
3. Add your API key to your environment variables by creating a `.env` file
```
KRDICT_API_KEY=<your_key>
```
4. Run the app with `npm run dev`
5. By default, open [http://localhost:5173](http://localhost:5173) to view it in the browser


## Limitations
- The Korean Dictionary API key is restricted to 50,000 requests per day

## License
[MIT](LICENSE)
