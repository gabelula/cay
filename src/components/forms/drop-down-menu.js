import React, {PropTypes} from 'react';
import Radium from 'radium';

class DropDownMenu extends React.Component {
  render() {
    return (
      <div>DropDownMenu</div>
    );
  }
}

DropDownMenu.propTypes = {
  menuItems: PropTypes.arrayOf({

  }),
  openImmediately: PropTypes.bool  
};

export default Radium(DropDownMenu);
