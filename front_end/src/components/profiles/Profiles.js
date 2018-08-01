import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getProfiles } from '../../action/profileActions'
import ProfileItem from './Profileitem';

class Profiles extends Component {
    componentDidMount() {
        this.props.getProfiles()
    }
  render() {
    const { profiles, loading } = this.props.profile
    let profileItem

    if(profiles === null || loading) {
    profileItem = <h4>Loading...</h4>
    }else{
        if(profiles.length > 0) {
            profileItem = profiles.map(
                profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                )
            )
        }else {
            profileItem = <h4>No profiles found...</h4>
        }
    }

    return (
        <div className="Profiles">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <h1 className="display-4 text-center">Developer Profiles</h1>
                    <p className="lead text-center">
                    Browse and connect with developers
                    </p>
                    { profileItem}
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

Profiles.propTypes  = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles)
