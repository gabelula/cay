import React from "react";
import { connect } from "react-redux";
import Radium from "radium";

import settings from '../settings';

import {fetchComments} from '../actions';

import Page from './page';

@connect(state => state.data)
@Radium
class Settings extends React.Component {

  getComments() {
    this.props.dispatch(fetchComments());
  }

  render() {

    return (
      <Page>
        <h1>Settings goes here</h1>
      </Page>
    );
  }
}

// same as the @connect decorator above
export default Settings;

const styles = {
  background: settings.brandColor
};