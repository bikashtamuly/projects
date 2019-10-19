import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import deburr from 'lodash/deburr';

import './SlideFilters.scss';
import { appConfig } from '../../config';

const countryList = appConfig.countryList;

const Handle = Slider.Handle;

const handle = (props) => {
  const {value, dragging, index, ...restProps} = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

handle.propTypes = {
  value   : PropTypes.number,
  dragging: PropTypes.func,
  index   : PropTypes.number
};


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
function getCountryCodeName(countryName, labelName) {
  const countryObj = countryName.length === 0
    ? ''
    : countryList.filter(suggestion => {
       const cnCode = suggestion[labelName] === countryName;
       return cnCode;
    });
    return countryObj[0];
}

class SlideFilters extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      countryCodeName: appConfig.defaultCountryName,      
      countryCode: appConfig.defaultCountry
    };    
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer = (open) => () => {
    this.props.onCloseIconClick();  
  };
  
  handleInputChange = event => {
    const countryCodeVal = getCountryCodeName(event, 'name');
    this.setState({ countryCodeName: event, countryCode: countryCodeVal.code});    
    this.props.config.defaultCountry = countryCodeVal.code;
    appConfig.defaultCountryName = event;
    this.props.onChanges();
  };
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });      
    this.props.onChanges();
  };
  
  render() {
    //const { classes } = this.props;    

    return (
      <div className="slide-filters-container">
        <h3 className="title">          
          <Button className="mat-icon-button">
            <CloseIcon className="close-icon" aria-label="Close" onClick={this.toggleDrawer(false)}/>
          </Button>
        </h3>
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
        <div className="divider"/>
      </div>
    );
  }
}

SlideFilters.propTypes = {
  config   : PropTypes.object,
  onChanges: PropTypes.func,
  onCloseIconClick: PropTypes.func
};

export default SlideFilters;
