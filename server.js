const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const api = require('./apihandler');
const { error } = require('console');

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // For POST JSON bodies


// Catch-all for /api/* routes
app.all('/api/*path', (req, res) => {
	const thepath = req.params.path; // e.g., 'data'
	const requestData = { 
		method: req.method,
		query: req.query,
		body: req.body
	};

	try {
		const result = api(thepath, requestData, req);
		res.json(result);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});