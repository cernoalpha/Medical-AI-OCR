const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
require('dotenv').config();
const path = require('path'); 

const app = express();
app.use(express.static('public'));
const PORT = process.env.PORT || 5001;


app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());;
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const{imageAi}= require("./services/imageAI")

app.post('/upload', upload.array('files', 50),imageAi)

app.get('/health', (req, res) => {
    res.status(200).contentType('text/plain').send('Server Shaddy Med is healthy 😀🥳');
});

app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    res.sendFile(indexPath);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});