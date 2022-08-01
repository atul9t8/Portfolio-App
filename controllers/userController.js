const User = require("../models/UserModels");
const {awardController} = require("../controllers/awardsController")
const mongoose = require("mongoose");7
const express = require("express");
const bcrypt = require('bcrypt');
const Cryptr = require("cryptr");

const userResInfo = (req, res)=>{
    let cryptr = new Cryptr(process.env.OCEAN_BLUE);

    let registration = req.body.registration

    if(registration['password'] === registration['cPassword']){
        bcrypt.hash(registration['password'], 10, (err, hash) =>{
            if(err){
                res.end(err)
            }else{
                const user = new User({
                    registration:({
                        name:registration['name'],
                        email:registration['email'],
                        password:hash,
                        role:registration['role'],
                        fromWhere:registration['fromWhere'],
                        nationality:registration['nationality'],
                    }),
                    skills:skills,
                    awards:[]
                })
                try{
                    user.save()
                    res.send(cryptr.encrypt(user.id))
                }
                catch(err){
                    res.send(err)
                }
            }
        })
    }else{
        res.end("Password and confirm password doesn't match")
    }
}

const userResInfoUpdate = async (req, res)=>{
    let cryptr = new Cryptr(process.env.OCEAN_BLUE);
    const enID = req.body.id;
    const id = cryptr.decrypt(enID);
    const user = await User.findOne({_id : id})

    if(req.body.registration['password']){
        if(req.body.registration['password'] === req.body.registration['cPassword']){
            password = bcrypt.hashSync(req.body.registration['password'], 10);
        }else{
            res.end("Password and confirm password doesn't match")
        }
    } else if(!req.body.registration['password']){
        password = user['registration']['password']
    }
    user['registration']['name'] = req.body.registration['name'] || user['registration']['name'];
    user['registration']['email'] = req.body.registration['email'] || user['registration']['email'];
    user['registration']['password'] = password;
    user['registration']['role'] = req.bodhy.registration['role'] || user['registration']['role'];
    user['registration']['fromWhere'] = req.body.registration['fromWhere'] || user['registration']['fromWhere'];
    user['registration']['nationality'] = req.body.registration['nationality'] || user['registration']['nationality'];

    try{
        user.save()
        console.log("Registration Updated")
    }
    catch(err){
        res.send(err)
    }
}


const skills = async (req, res) =>{
    let cryptr = new Cryptr(process.env.OCEAN_BLUE);
    const enID = req.body.id;
    const id = cryptr.decrypt(enID);
    const user = await User.findOne({_id : id})
    user.skills = req.body.skills;
    try{
        await user.save()
        res.send(enID)
    }
    catch(err){
        res.send(err)
    }
}


module.exports = { userResInfo, userResInfoUpdate, skills }