import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from '@mui/material/Menu';
import { captureNavigation } from '../../../analytics';

import {
  Container,
  MenuLink,
  StyledButton,
  StyledMenuItem,
} from './styles';

export default class MenuListComposition extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };
  }

  handleClose = event => {
    this.setState({ anchorEl: null });
  };

  handleToggle = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  render() {
    const { menuTitle, menuItems } = this.props;
    const { anchorEl } = this.state;

    return menuItems && menuItems.length > 0 ? (
      <Container>
        <div>
          <StyledButton
            disableRipple
            variant="text"
            aria-haspopup="true"
            onClick={(event) => this.handleToggle(event)}
          >
            {menuTitle.label}
          </StyledButton>
        </div>
        <div>

          <Menu
            elevation={1}
            left
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {menuItems.map((menuItem, key) => (
              <MenuLink
                key={key}
                strict
                to={menuItem.link}
                onClick={() => captureNavigation(menuItem.link)}
              >
                <StyledMenuItem>{menuItem.label}</StyledMenuItem>
              </MenuLink>
            ))}
          </Menu>

        </div>
      </Container>
    ) : (
      <Container>
        <MenuLink
          exact
          to={menuTitle.link}
          onClick={() => captureNavigation(menuTitle.link)}
        >
          <StyledButton
            disableRipple
            variant="text"
            style={{
              color: 'dark',
              opacity: '0.5',
              fontWeight: '500',
              fontSize: '13px',
              textTransform: 'uppercase',
              lineHeight: '16px',
              letterSpacing: '1px',
            }}
          >
            {menuTitle.label}
          </StyledButton>
        </MenuLink>
      </Container>
    );
  }
}

const typeLabelShape = PropTypes.shape({
  label: PropTypes.string,
  type: PropTypes.string,
});

MenuListComposition.propTypes = {
  menuItems: PropTypes.arrayOf(typeLabelShape),
  menuTitle: typeLabelShape.isRequired,
};

MenuListComposition.defaultProps = {
  menuItems: [],
};
