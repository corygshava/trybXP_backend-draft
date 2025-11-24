const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Simple API route
app.get('/api/data', (req, res) => {
	res.json({ message: 'Hi welcome to trybXP', timestamp: Date.now() });
});
app.get('/api/appdata', (req, res) => {
	let outdata = {
		message: 'Hi welcome to trybXP API implementation',
		success: true, 
		result: true, 
		data: {info: "appdata",source: "API"}, 
		timestamp: Date.now()
	};

	res.json(outdata);
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});