const express = require('express');

const app = express();

app.use(express.static('./dist/hairCutServices-frontend'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/hairCutServices-frontend/'}),
);

app.listen(process.env.PORT || 3000);