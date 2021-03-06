import React from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import PercentClause from './PercentClause';
import IntClause from './IntClause';
import DateRangeClause from './DateRangeClause';
import ProximityClause from './ProximityClause';
import {resetFilter} from 'filters/FiltersActions';
import Close from 'react-icons/lib/fa/close';
import settings from 'settings';

@connect(state => state.filters)
@Radium
class Clauses extends React.Component {
  static propTypes = {
    /* react */
    params: React.PropTypes.object,
    routes: React.PropTypes.array,
    /* component api */
    style: React.PropTypes.object
  }
  getStyles() {
    return {
      container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginBottom: 20
      },
      clause: {
        backgroundColor: settings.darkGrey,
        color: 'white',
        padding: '10px 20px',
        margin: '0 10px 0px 0px',
        borderRadius: 4
      }
    };
  }

  userChangedFilter(filterName) {
    const f = this.props[filterName];
    const maxDifferent = f.userMax !== f.max && f.userMax < f.max;
    const minDifferent = f.userMin !== f.min && f.userMin > f.min;

    return {
      either: maxDifferent || minDifferent,
      both: !(maxDifferent && minDifferent)
    };
  }

  formatName(name) {
    /* removes hyphen */
    name = name.replace('-', ' ');
    /* title case */
    return name.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  getSpecific() {
    const breakdown = this.props.editMode ? this.props.breakdownEdit : this.props.breakdown;
    const specificBreakdown = this.props.editMode ? this.props.specificBreakdownEdit : this.props.specificBreakdown;

    if (specificBreakdown) {
      return (
        <span style={this.getStyles().clause}>
          {`${breakdown} ${this.formatName(specificBreakdown)} `}
        </span>
      );
    }
  }

  getFilters() {
    const filterList = this.props.editMode ? this.props.editFilterList : this.props.filterList;

    return filterList.map((filterName, i) => {

      if (this.userChangedFilter(filterName).either) {

        let clause;
        switch (this.props[filterName].type) {
        case 'dateRange':
          clause = <DateRangeClause {...this.props[filterName]}/>;
          break;
        case 'percentRange':
          clause = <PercentClause {...this.props[filterName]}/>;
          break;
        case 'intDateProximity':

          clause = <ProximityClause {...this.props[filterName]}/>
          break;
        default:
          clause = <IntClause {...this.props[filterName]}/>;
        }

        return (
          <span key={i} style={styles.clause}>
            {clause}
            <span onClick={this.resetFilter.bind(this, filterName)}
              style={styles.close}><Close style={styles.closeIcon} /></span>
          </span>
        );
      }
    });
  }

  resetFilter(filterName) {
    this.props.dispatch(resetFilter(filterName));
  }

  render() {
    const styles = this.getStyles();
    return (
      <div style={[
        styles.container,
        this.props.style
      ]}>
        {this.getSpecific()}
        {this.getFilters()}
      </div>
    );
  }
}

export default Clauses;


const styles = {
  container: {
  },
  closeIcon: {
    cursor: 'pointer',
    marginLeft: 10,
    fontSize: 18,
    color: 'rgb(100,100,100)',
    position: 'relative',
    top: -1
  },
  clause: {
    backgroundColor: "white",
    color: 'rgb(100,100,100)',
    WebkitBoxShadow: '3px 3px 6px -1px ' + settings.mediumGrey,
    BoxShadow: '3px 3px 6px -1px ' + settings.mediumGrey,
    borderRadius: 4,
    padding: 10,
    marginRight: 10,
    marginBottom: 20
  }
};
