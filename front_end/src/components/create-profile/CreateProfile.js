import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";

class CreateProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            displaySocialInput: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        // check errors return from backend
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault()
        console.log('submit')
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

  render() {
      const { errors, displaySocialInput } = this.state

      let socialInputs

      if (displaySocialInput) {
        socialInputs = (
            <div><br />
                <InputGroup
                    placeholder="Twitter Profile URL"
                    name="twiter"
                    icon="fab fa-twitter"
                    value={this.state.twitter}
                    onChange={this.onChange}
                    error={errors.twitter}
                />

                <InputGroup
                    placeholder="Facebook Profile URL"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={this.state.facebook}
                    onChange={this.onChange}
                    error={errors.facebook}
                />

                <InputGroup
                    placeholder="Youtube Profile URL"
                    name="youtube"
                    icon="fab fa-youtube"
                    value={this.state.youtube}
                    onChange={this.onChange}
                    error={errors.youtube}
                />

                <InputGroup
                    placeholder="Linkedin Profile URL"
                    name="linkedin"
                    icon="fab fa-linkedin"
                    value={this.state.linkedin}
                    onChange={this.onChange}
                    error={errors.linkedin}
                />

                <InputGroup
                    placeholder="Instagram Profile URL"
                    name="instagram"
                    icon="fab fa-instagram"
                    value={this.state.instagram}
                    onChange={this.onChange}
                    error={errors.instagram}
                />
            </div>
        )
      }

      // Select options for state
      const options = [
          { label: 'Select Professional Status', value: 0 },
          { label: 'Developer', value: 'Developer'},
          { label: 'Junior Developer', value: 'Junior Developer' },
          { label: 'Senior Developer', value: 'Senior Developer' },
          { label: 'Manager', value: 'Manager' },
          { label: 'Student or Learning', value: 'Student or Learning' },
          { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
          { label: 'Intern', value: 'Intern' },
          { label: 'Other', value: 'Other' }
      ]
    return (
    <div className="create-profile">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Create your profile</h1>
                <p className="lead text-center">Let's get some information to male your profile stand out</p>
                <small className="d-block pb-3">* required fields</small>
                <form onSubmit={this.onSubmit}>
                <TextFieldGroup 
                    placeholder="* Profile Handle"
                    name="handle"
                    value={this.state.handle}
                    onChange={this.onChange}
                    error={errors.handle}
                    info="A inique handle for your profile URL."
                />
                <SelectListGroup 
                    placeholder="status"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                    options={options}
                    error={errors.status}
                    info="Give us an idea of your career"
                />
                <TextFieldGroup 
                    placeholder="Company"
                    name="company"
                    value={this.state.company}
                    onChange={this.onChange}
                    error={errors.company}
                    info="Could be your own company or one you work for"
                />
                <TextFieldGroup 
                    placeholder="Website"
                    name="website"
                    value={this.state.website}
                    onChange={this.onChange}
                    error={errors.website}
                    info="Could be your own website"
                />
                <TextFieldGroup 
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    error={errors.location}
                    info="Could be your own location"
                />
                <TextFieldGroup 
                    placeholder="Skills"
                    name="skills"
                    value={this.state.skills}
                    onChange={this.onChange}
                    error={errors.skills}
                    info="Please use comma separated value HTML, CSS, JAVASCRIPT, PHP"
                />
                <TextFieldGroup 
                    placeholder="Github Username"
                    name="githubusername"
                    value={this.state.githubusername}
                    onChange={this.onChange}
                    error={errors.githubusername}
                    info="if you want your latest repos"
                />
                <TextAreaFieldGroup 
                    placeholder="Short Bio"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.onChange}
                    error={errors.bio}
                    info="Tell us a little about yourself"
                />

                <div>
                    <button onClick={
                        () => {
                          this.setState(
                              prevState => ({
                                  displaySocialInput: !prevState.displaySocialInput
                              })
                          )  
                        }
                    } className="btn btn-info">Add Social Network Links</button>
                    <span className="text-muted"> Optional</span>
                    {socialInputs}
                    <input type="submit" value="Submit" className="btn btn-primary btn-block mt-4" />
                </div>
                </form>
              </div>
            </div>
          </div>
      </div>)
  }
}
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps)(CreateProfile);