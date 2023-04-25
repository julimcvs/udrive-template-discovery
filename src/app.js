const express = require('express');
const fs = require('fs');
const path = require('path')
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.json());

const port = 3100

async function findMailValidation(req) {
    const templatePath = path.join(__dirname, "/templates/udrive-mail-validation.html")
    const html = fs.readFileSync(templatePath)
        .toString()
        .replace('${GREETING}', req.body.name)
        .replace('${TOKEN}', req.body.tokenUrl);
    return html;
}

app.post('/mail-validation', async function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    const mail = await findMailValidation(req);
    res.write(mail);
    res.end();
})

app.listen(port, () => console.log(`Running on port ${port}`))