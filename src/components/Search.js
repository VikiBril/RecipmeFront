import React, { Component } from 'react';

import { Fab } from '@mui/material';
import { InputBase } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const styleFab = {
  width: "52px",
  height: "52px",
  boxShadow: "0px 4.2069px 4.2069px rgba(255, 102, 71, 0.25)",
  backgroundColor: "#FF6647",
  color: "white",
  marginTop: "-100px",
  marginLeft: "475px",
};

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#FFFFFF',
    fontSize: 15,
    borderRadius: "25px",
    marginLeft: "200px",
    padding: '14px 14px',
    height: "30px",
    marginTop: "25px",
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    fontFamily: [
      '-apple-system',
      'Alef',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));
class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.searchTerm = "";
    this.render = this.render.bind(this);
  }

  render() {
    return (
      <div>
        <BootstrapInput placeholder="Search by name or location" sx={{ width: "470px", height: "100px" }} id="NameInput" onChange={event => this.searchTerm = event.target.value} />
        <div>
          <Fab size="medium" style={styleFab} aria-label="search" onClick={event => this.props.searchRecipe(this.searchTerm)} >
            <SearchIcon />
          </Fab>
        </div>
      </div>
    );
  }
}

export default SearchComponent;