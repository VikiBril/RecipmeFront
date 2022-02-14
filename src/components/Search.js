import React, { Component } from 'react';
import Logo from "../assets.media/Logo.jpg";
import { Fab } from '@mui/material';
import { InputBase } from '@mui/material';
import { Box } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const styleFab = {
  width: "52px",
  height: "52px",
  boxShadow: "0px 4.2069px 4.2069px rgba(236, 236, 236, 1)",
  backgroundColor: "#8fcbd9",
  color: "white",
  marginLeft: "5px",
  border: "2.10345px solid #FFFFFF",
};
const styleImg = {
  marginLeft: "35%",
  width:"200px",
  height:"250",
};

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#FFFFFF',
    fontSize: 15,
    borderRadius: "25px",
    border: "2.10345px solid #8fcbd9",
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
      <>
      <Box alignItems="center">
           <img src={Logo} alt="Logo" style={styleImg}/>
        <BootstrapInput placeholder="Search by ingredients" sx={{ padding: "2px",marginLeft:"5%",width: "670px", height: "100px" }} id="NameInput" onChange={event => this.searchTerm = event.target.value} />
          <Fab size="medium" style={styleFab} aria-label="search" onClick={event => this.props.searchRecipe(this.searchTerm)} >
            <SearchIcon />
          </Fab>
        </Box>

      </>
    );
  }
}

export default SearchComponent;