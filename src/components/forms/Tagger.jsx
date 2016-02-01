import React, {PropTypes} from 'react';
import Radium from 'radium';

import TaggerRemoveComponent from './TaggerRemoveComponent';

var ReactTags = require('react-tag-input').WithContext;

@Radium
export default class Tagger extends React.Component {

  static propTypes = {
    type: PropTypes.any.isRequired,
    id: PropTypes.number.isRequired,
    tags: PropTypes.array,
    tagList: PropTypes.array,
    freeform: PropTypes.bool
  }

  getDefaultProps() {
    return {
      tags: [],
      tagList: [],
      freeform: false
    };
  }

  componentWillMount() {
    this.setState({
      tags: [ {id: 1, text: 'Apples'} ],
      suggestions: ['Banana', 'Mango', 'Pear', 'Apricot', 'April', 'Appreciation']
    });
  }

  handleDelete(i) {
    var tags = this.state.tags;
    tags.splice(i, 1);
    this.setState({tags: tags});
  }

  handleAddition(tag) {
    var tags = this.state.tags;
    tags.push({
      id: tags.length + 1,
      text: tag
    });
    this.setState({tags: tags});
  }

  handleDrag(tag, currPos, newPos) {
    var tags = this.state.tags;

    // mutate array
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: tags });
  }

  render() {

    var tags = this.state.tags;
    var suggestions = this.state.suggestions;

    return (
      <div style={ styles.outer }>
        <ReactTags tags={tags}
          suggestions={suggestions}
          handleDelete={this.handleDelete.bind(this)}
          handleAddition={this.handleAddition.bind(this)}
          handleDrag={this.handleDrag.bind(this)}
          removeComponent={TaggerRemoveComponent}
          />
      </div>
    );

  }
}

const styles = {
  outer: {
    margin: '20px'
  }
};