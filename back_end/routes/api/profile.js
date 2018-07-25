const express = require("express")
const router = express()
const mongoose = require("mongoose")
const passport = require("passport")

const Profile = require("../../models/Profile")
const User = require("../../models/User")
const validateProfileInput = require("../../validation/profile")
const validateExpInput = require("../../validation/experience")
const validateEduInput = require("../../validation/education")

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

router.delete('/', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(
      () => {
        User.findOneAndRemove({ _id: req.user.id }).then(
          () => {
            res.status(200).json({ success: true })
          }
        )
      }
    )
  }
)

router.post('/experience', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExpInput(req.body)

    if (!isValid) {
      return res.status(400).json(errors) // put return protect serveral error
    }

    Profile.findOne({ user: req.user.id }).then(
      profile => {
        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        }
        profile.experience.unshift(newExp) // Create array for insert to DB
        profile.save().then( profile => res.status(201).json(profile))
      }
    )
  }
)

router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(
      profile => {
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id)

        profile.experience.splice(removeIndex, 1)

        profile.save().then(profile => res.status(200).json(profile))
      }
    ).catch(err => res.status(500).json(err))
  }
)


router.post('/education', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEduInput(req.body)

    if (!isValid) {
      return res.status(400).json(errors) // put return protect serveral error
    }

    Profile.findOne({ user: req.user.id }).then(
      profile => {
        const newEdu = {
          school: req.body.school,
          degree: req.body.degree,
          fieldofstudy: req.body.fieldofstudy,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        }
        profile.education.unshift(newEdu) // Create array for insert to DB

        profile.save().then(profile => res.status(201).json(profile))
      }
    )
  }
)

router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(
      profile => {
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id)

        profile.education.splice(removeIndex, 1)

        profile.save().then(profile => res.status(200).json(profile))
      }
    ).catch(err => res.status(500).json(err))
  }
)

module.exports = router
