import React from 'react';
import Radium from 'radium';

import settings from '../settings';
import {connect} from 'react-redux';

import {fetchAllTags, upsertUser, fetchCommentsByUser, clearUserDetailComments} from '../actions';

import Avatar from './Avatar';
import Tab from './tabs/Tab';
import Tabs from './tabs/Tabs';
import Stats from './stats/Stats';
import Stat from './stats/Stat';
import Heading from './Heading';
import MdLocalOffer from 'react-icons/lib/md/local-offer';
import Tagger from './forms/Tagger';
import Select from 'react-select';

import CommentDetailList from './CommentDetailList';

import { Lang } from '../lang';

@connect(state => state.pipelines)
@Lang
@Radium
export default class UserDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {selectedTags: []};
  }

  componentWillMount() {
    // comments might have been loaded for another user.
    this.props.dispatch(clearUserDetailComments());
    this.props.dispatch(fetchAllTags());
  }

  componentWillUpdate(nextProps) {
    console.log('UserDetail.componentWillUpdate', nextProps);
    if (nextProps.selectedUser && nextProps.userDetailComments === null) {
      console.log('loading comments for user ' + nextProps.selectedUser._id);
      nextProps.dispatch(fetchCommentsByUser(nextProps.selectedUser._id));
    }
  }

  // getUserTags(user) {
  //   console.log('\n\n', user);
  //   var tags = [];
  //   if (user && user.tags && user.tags.length) {
  //     for (var i in user.tags) {
  //       tags.push({
  //         id: user.tags[i] + Math.random(),
  //         text: user.tags[i]
  //       });
  //     }
  //   }
  //   return tags;
  // }

  // onTagsChange(tags) {
  //   if (this.props.selectedUser && this.props.selectedUser._id) {
  //     var preparedUser = {};
  //     preparedUser.id = this.props.selectedUser._id;
  //     preparedUser.name = this.props.selectedUser.user_name;
  //     preparedUser.avatar = this.props.selectedUser.avatar;
  //     preparedUser.status = this.props.selectedUser.status;
  //     preparedUser.tags = tags.map(tag => tag.text);
  //     this.props.dispatch(upsertUser(preparedUser));
  //   }
  // }

  getTags() {
    return this.props.tags.map(tag => {
      return {label: tag.name, value: tag.name};
    });
  }

  updateTags(tags) {
    this.setState({selectedTags: tags.map(tag => tag.value)});
    if (this.props.selectedUser && this.props.selectedUser._id) {
      var s = this.props.selectedUser;
      var preparedUser = {
        id: s._id,
        name: s.user_name,
        avatar: s.avatar,
        status: s.status,
        tags: this.state.selectedTags.splice()
      };
      this.props.dispatch(upsertUser(preparedUser));
    }
  }

  render() {

    let comments = this.props.userDetailComments === null ?
      'Loading Comments...' :
      (<CommentDetailList user={this.props.selectedUser} comments={this.props.userDetailComments} />);

    /*
    var tagger = this.props.tags ?
      <div style={ styles.tags }>
        <Tagger
          onChange={ this.onTagsChange.bind(this) }
          tagList={ this.props.tags }
          tags={ this.getUserTags(this.props.selectedUser) }
          freeForm={ false }
          type="user"
          id={
            this.props.selectedUser && this.props.selectedUser._id ?
              this.props.selectedUser._id :
              1
            }
          />
      </div>
    : null;
    */

    return (
      <div style={[styles.base, this.props.style]}>
        <Heading size="medium">{this.props.user_name}</Heading>
        <div style={styles.topPart}>
          <Avatar style={styles.avatar} src={this.props.avatar || ''} size={200} />
          <Stats style={styles.stats}>
            <Stat term={ window.L.t('Status') } description="subscriber" />
            <Stat term={ window.L.t('Last Login') } description={ window.L.date('', 'LLLL') } />
            <Stat term={ window.L.t('Member Since') } description={ window.L.relativeDate() } />
            <Stat term={ window.L.t('Warnings') } description="0" />
            {/* tagger */}
          </Stats>
        </div>
        <p><MdLocalOffer /> Add / Remove Tags for this Commenter</p>
        <Select
          multi={true}
          value={this.state.selectedTags}
          onChange={this.updateTags.bind(this)}
          options={this.getTags()}
        />
        <Tabs initialSelectedIndex={0} style={styles.tabs}>
          <Tab title="About"> {comments} </Tab>
          <Tab title="Activity">Tab Bravo Content</Tab>
          <Tab title="Messages">Tab Charlie Content</Tab>
        </Tabs>
      </div>
    );
  }
}

const styles = {
  base: {
    background: 'white',
    padding: 20,
    marginTop: '50px'
  },
  topPart: {
    display: 'flex',
    marginBottom: 10
  },
  avatar: {
    marginRight: 10
  },
  stats: {
    flex: 1
  },
  tabs: {
    marginTop: 20,
    clear: 'both'
  },
  tags: {
    clear: 'both',
    paddingTop: '20px'
  }
};
