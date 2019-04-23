
const express = require('express');
import { Response, Request, NextFunction } from "express";
var router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/images',(req: Request, res: Response, next: NextFunction) => {
    const staticLocation = 'static/outputs';
    const p = path.join(__dirname,'../', staticLocation);
   
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