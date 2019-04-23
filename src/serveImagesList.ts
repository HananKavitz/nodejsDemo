
const express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/images',(req:Express.Request, res: any, next: Function) => {
    const staticLocation = 'static/outputs';
    const p = path.join(__dirname,'../', staticLocation);
    console.log(p);
    fs.readdir(p, (err: Error, files: string[]) => {
        if (err){
            console.log(err);
            next(err);
        }
        
        files = files.map((file: string): string => {
            return  path.join(staticLocation, file);
        } );
        res.status(200).send(files);

    })
    
})
module.exports = router;