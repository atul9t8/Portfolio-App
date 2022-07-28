const mongoose = require("mongoose");
const express = require('express');
const Cryptr = require('cryptr')

const User = require("../models/UserModels.js")

const awardController = async(req, res)=>{
    let cryptr = new Cryptr(process.env.OCEAN_BLUE);
    const enID = req.body.id;
    const id = cryptr.decrypt(enID);
    const user = await User.findOne({ _id : id })

    user['awards'] = req.body.singleAward

    try{
        await user.save()
        res.send(enID)
    }
    catch(err){
        res.send(err)
    }
}


const updateAwardController = async (req, res)=>{

    let cryptr = new Cryptr(process.env.OCEAN_BLUE);
    const enID = req.body.id;
    const id = cryptr.decrypt(enID);
    const user = await User.findOne({ _id : id })
    let index = req.body.index;

    let awardsLength = user["awards"].length;

    if(index < awardsLength){
        user["awards"][index]["name"] = req.body.singleAward.name || user["awards"][index]["name"];
        user["awards"][index]["position"] = req.body.singleAward.position || user["awards"][index]["position"];
        user["awards"][index]["year"] = req.body.singleAward.year || user["awards"][index]["year"];

        await user.save()
        res.send("Updated")
    }else{ 
        res.send("ID not found")
    }
}

const deleteAwardController = async(req, res) =>{
    let cryptr = new Cryptr(process.env.OCEAN_BLUE);
    const enID = req.body.id;
    const id = cryptr.decrypt(enID);
    const index = req.body.index;
    const award = await User.findOne({ _id : id })

    for(let i = 0; i<= 2; i++){
        if(i === index){
            award["awards"][index]["name"] = "Not Set";
            award["awards"][index]["position"] = "Not Set";
            award["awards"][index]["year"] = "Not Set";

            try{
                award.save()
                res.send("unset")
            }
            catch(err){
                res.send(err)
            }
        }
    }
}

module.exports = { awardController, updateAwardController, deleteAwardController }