import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Downshift from 'downshift';
import Paper from '@material-ui/core/Paper';
import deburr from 'lodash/deburr';

import MenuItem from '@material-ui/core/MenuItem';

import './Header.scss';
import SlideFilters from '../slide-filters/SlideFilters';
import { appConfig } from '../../config';

const countryList = appConfig.countryList;

function renderInput(inputProps) {
  const {InputProps, ref, ...other} = inputProps;
  return (
    <TextField
      InputProps={{
        inputRef: ref,
        ...InputProps
      }}
      {...other}
    />
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? countryList
    : countryList.filter(suggestion => {
        const keep =
          count < 5 && suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}
function renderSuggestion({suggestion, index, itemProps, highlightedIndex, selectedItem}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.name) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.name}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.name}
    </MenuItem>
  );
}

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index           : PropTypes.number,
  itemProps       : PropTypes.object,
  selectedItem    : PropTypes.string,
  suggestion      : PropTypes.shape({name: PropTypes.string}).isRequired
};

function getCountryCodeName(countryName, labelName) {
  const countryObj = countryName.length === 0
    ? ''
    : countryList.filter(suggestion => {
       const cnCode = suggestion[labelName] === countryName;
       return cnCode;
    });
    return countryObj[0];
}
class Header extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      drawerIsOpened: false,
      title: '',
      isConfig: false,
      countryCodeName: appConfig.defaultCountryName,      
      countryCode: appConfig.defaultCountry
    }; 

    setTimeout(() => {
      this.setState({title : this.props.setTitle()});
    }, 100); 
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  handleInputChange = event => {
    const countryCodeVal = getCountryCodeName(event, 'name');
    this.setState({ countryCodeName: event, countryCode: countryCodeVal.code});    
    this.props.config.defaultCountry = countryCodeVal.code;
    appConfig.defaultCountryName = event;
    this.props.onChanges();
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }
  resize() {
    let currentHideNav = (window.innerWidth <= 760);
    if (currentHideNav !== this.state.isConfig) {
        this.setState({isConfig: currentHideNav});
    }
  }  

  toggleDrawer = (open) => () => {    
    this.setState({
      drawerIsOpened: open
    });
  };

  render() {
    return (
      <div id="page-header">
        <nav>
          <div className="logo-bg">
            
          </div>
          <div className="opened-module-title">
            {this.state.title}
          </div>
          {this.state.isConfig ? (
            <Button className="menu-toggle" onClick={this.toggleDrawer(true)}>
              <MenuIcon aria-label="Menu"/>
            </Button>
          ) : (
            <Downshift id="countrySelect" selectedItem={this.state.countryCodeName}
          onChange={this.handleInputChange}>
          {({
              getInputProps,
              getItemProps,
              getMenuProps,
              highlightedIndex,              
              inputValue,
              isOpen,
              selectedItem,
            }) => (
            <div className="select-country">
              {renderInput({
                fullWidth : true,
                InputProps: getInputProps({
                  placeholder: 'Search a country',
                }),                
                label     : 'Select Country'
              })}
              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper square style={{maxHeight: 400, overflow: 'auto'}}>
                    {getSuggestions(inputValue).map((suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({item: suggestion.name}),
                        highlightedIndex,
                        selectedItem
                      })
                    )}
                  </Paper>
                ) : null}
              </div>
            </div>
          )}
        </Downshift>
          )
          }                  
        </nav>
        <Drawer
          anchor="right"
          open={this.state.drawerIsOpened}          
          onClose={this.toggleDrawer(false)}>
            <SlideFilters onCloseIconClick={this.toggleDrawer(false)} config={this.props.config} onChanges={this.props.onChanges}/>
        </Drawer>
      </div>
    );
  }
}

Header.propTypes = {
  setTitle: PropTypes.func,
  config: PropTypes.object,
  onChanges: PropTypes.func,
  location: PropTypes.string,
  match: PropTypes.object
};

export default Header;
