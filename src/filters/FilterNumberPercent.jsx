import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
// import Flex from '../layout/Flex';

import Card from 'components/cards/Card';
import CardHeader from 'components/cards/CardHeader';
//import Sparkline from 'filters/Sparkline';

import Slider from 'components/Slider';

const style = {
  sliderInput: {
    backgroundColor: 'rgb(245, 245, 245)',
    border: 'none',
    textAlign: 'center',
    padding: '10px 0px',
    width: 50,
    fontSize: 14,
    margin: '0px 5px',
    borderRadius: 4
    // 'focus': {
    //   outline: 0
    // }
  },
  minMaxInputs: {
    padding: '7px 10px',
    border: '1px solid lightgrey',
    borderRadius: 3
  }
};

@connect(state => state.filters)
@Radium
export default class FilterNumbers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: 'GTLT',
      step: (props.type === 'floatRange' || props.type === 'percentRange') ? 0.01 : 1,
      equals: null
    };
  }

  static propTypes = {
    /* react */
    // dispatch: React.PropTypes.func,
    params: React.PropTypes.object,
    /* component api */
    getValues: React.PropTypes.func,
    description: React.PropTypes.string,
    isPercentage: React.PropTypes.bool
  }
  static defaultProps = {
    fieldName: 'UNDEFINED___'
  }

  componentWillReceiveProps(props) {
    this.setState({step: (props.type === 'floatRange' || props.type === 'percentRange') ? 0.01 : 1});
  }

  renderHelpText() {
    let help = '';

    if (this.props.userMax > this.props.max) {
      help = `Max cannot be greater than ${this.props.max}`;
    }

    if (this.props.userMin < this.props.min) {
      help = `Min cannot be less than ${this.props.min}`;
    }

    if (this.props.userMin > this.props.userMax) {
      help = 'Min cannot be greater than max';
    }

    return help;
  }
  render() {

    return (
      <Card>
        <CardHeader>
          <span style={{marginBottom: 10, marginRight: 20}}>{this.props.description}</span>
        </CardHeader>
          <div>
            <input
              onChange={event => this.props.onChange(this.props.fieldName, 'userMin', event.target.value/100)}
              style={style.minMaxInputs}
              type='number'
              value={Math.floor(this.props.userMin*100)}/>
            {` - `}
            <input
              onChange={event => this.props.onChange(this.props.fieldName, 'userMax', event.target.value/100)}
              style={style.minMaxInputs}
              type='number'
              value={Math.floor(this.props.userMax*100)}/>
            <p style={{marginTop: 10, color: 'red'}}>{this.renderHelpText()}</p>
          </div>
      </Card>
    );
  }
}