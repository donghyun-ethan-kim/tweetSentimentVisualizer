# Tweet Sentiment Visualizer

* Visualize Sentiment Diffusion on Twitter!
* Interactive Network Graph!
* Analyze specific topics!

## Demo

![Alt text](demo.gif) 

## Tech Used
* Backend: Flask
* Frontend: React.js
* Sentiment Analysis: fastText model (Sentiment value based on probability of positive class)
* Network Graph Visualization: react-force-graph with D3.js (d3.scaleOrdinal and d3-scale-chromatic used to color nodes)

## Instructions
1. Create and activate virtual environment with requirements.txt
2. Run `npm install`
3. Run `npm run start-backend`
4. Open [http://localhost:5000](http://localhost:5000) to access backend
5. Run `npm start`
6. Open [http://localhost:3000](http://localhost:3000) to access frontend