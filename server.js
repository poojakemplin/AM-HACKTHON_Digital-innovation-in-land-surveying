const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const session = require('express-session');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'public', 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

// Create required directories
const dirs = [
    path.join(__dirname, 'data'),
    path.join(__dirname, 'public', 'uploads')
];

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Serve static files
app.use(express.static('public'));

// Sample land records data
const landRecords = {
    '123': {
        ownerName: 'John Doe',
        surveyNumber: '123',
        location: 'North District',
        area: '2.5',
        coordinates: '12.9716° N, 77.5946° E',
        topography: 'Flat terrain',
        landUse: 'Agricultural',
        boundaries: 'North: Plot 124, South: Road, East: Plot 122, West: River'
    },
    '456': {
        ownerName: 'Jane Smith',
        surveyNumber: '456',
        location: 'South District',
        area: '1.8',
        coordinates: '12.9716° N, 77.5946° E',
        topography: 'Hilly terrain',
        landUse: 'Residential',
        boundaries: 'North: Road, South: Plot 457, East: Plot 455, West: Park'
    }
};

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/land-details', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'land-details.html'));
});

app.get('/gramamitra', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'gramamitra.html'));
});

app.get('/feedback', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'feedback.html'));
});

// API endpoint for land details
app.get('/api/land-details/:surveyNumber', (req, res) => {
    const surveyNumber = req.params.surveyNumber;
    const record = landRecords[surveyNumber];
    
    if (record) {
        res.json(record);
    } else {
        res.status(404).json({ error: 'Record not found' });
    }
});

// API Routes
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    // Add your login logic here
    res.json({ success: true });
});

app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
    // Add your registration logic here
    res.json({ success: true });
});

app.post('/api/feedback', upload.single('attachment'), (req, res) => {
    const { name, email, message } = req.body;
    const attachment = req.file;
    // Add your feedback handling logic here
    res.json({ success: true });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});