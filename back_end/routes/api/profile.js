const express = require("express")
const router = express()
const mongoose = require("mongoose")
const passport = require("passport")

const Profile = require("../../models/Profile")
const user = require("../../models/User")
const validateProfileInput = require("../../validation/profile")

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(
        profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user"
          return res.status(404).json(errors)
        } else {
          res.status(200).json(profile)
        }
      })
      .catch(err => res.status(500).json("ss" + err))
  }
)

router.get('/user/:user_id', (req, res) => {
  const errors = {}

  Profile.findOne({ user: req.params.user_id })
  .populate('user', ['name', 'avatar'])
  .then(
    profile => {
      if(!profile){
        errors.noprofile = 'There is no profile for this user'
        return res.status(404).json(errors)
      }
      res.status(200).json(profile)
    }
  ).catch(err => res.status(500).json({ profile: "There is no profile for this user"}))
})

router.get('/handle/:handle', (req, res) => {
  const errors = {}

  Profile.findOne({ user: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(
      profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user'
          return res.status(404).json(errors)
        }
        res.status(200).json(profile)
      }
  ).catch(err => res.status(500).json({ profile: "There is no profile for this user" }))
})

router.get('/all', (req, res) => {
  const errors = {}

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(
      profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user'
          return res.status(404).json(errors)
        }
        res.status(200).json(profile)
      }
  ).catch(err => res.status(500).json({ profile: "There is no profile for this user" }))
})

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body)

    if(!isValid){
      return res.status(400).json(errors) // put return protect serveral error
    }

    const profileFields = {}
    profileFields.user = req.user.id
    if (req.body.handle) profileFields.handle = req.body.handle
    if (req.body.company) profileFields.company = req.body.company
    if (req.body.website) profileFields.website = req.body.website
    if (req.body.location) profileFields.location = req.body.location
    if (req.body.bio) profileFields.bio = req.body.bio
    if (req.body.status) profileFields.status = req.body.status
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername
    // Skill
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",")
    }
    // Socail
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram

    Profile.findOne({ user: req.user.id }).then(
      profile => {
        if (profile) {
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(
            profile => {
              res.status(200).json(profile)
          })
        } else {
          Profile.findOne({ handle: profileFields.handle }).then(
            profile => {
              if (profile) {
                errors.handle = "That handle alrady exists"
                res.status(400).json(errors)
              }
              new Profile(profileFields).save().then(
                result => {
                  res.status(201).json(result)
              });
          });
        }
    }).catch(err => res.status(500).json(err))
  }
)

module.exports = router
