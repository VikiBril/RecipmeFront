import React, { Component } from "react";
import { InputBase, Card } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { Fab, FormGroup, Grid } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DatePicker";
import Slider from "@mui/material/Slider";
import { weekNumber, dayNumber } from "weeknumber";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
const marks = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
];

export const labelStyle = {
  position: "relative",
  marginTop: "20px",
};

const styleCard = {
  fontFamily: "Arial",
  color: "#77787B",
  width: "418px",
  height: "752px",
  left: "10px",
  top: "114px",

  backgroundColor: "#FFFFFF",
  borderRadius: "25px",
};

const styleFab = {
  width: "52px",
  height: "52px",
  border: "2.10345px solid #FFFFFF",
  boxShadow: "0px 4.2069px 4.2069px rgba(236, 236, 236, 1)",
  backgroundColor: "#8fcbd9",
  color: "white",
  marginTop: "-10%",
};

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "white" : "white",
    fontSize: 15,
    border: "1px",
    padding: "10px 12px",
    height: "10px",
    transition: theme.transitions.create([]),
    fontFamily: ["Arial"].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

class RecipeForms extends Component {
  constructor(props) {
    super(props);
    this.recipeId = props.recipeId;
    this.name = props.name;
    this.imgurl = props.imgurl;
    this.description = props.description;
    this.day = props.day;
    this.week = props.week;
    this.hour = props.hour;
    this.ingredients = props.ingredients;
    this.repeat = 1;
    this.url = props.url;
    this.addRecipe = this.addRecipe.bind(this);
    this.render = this.render.bind(this);
    this.updateRecipe = this.updateRecipe.bind(this);
    this.renderUpdate = this.renderUpdate.bind(this);
    this.renderAdd = this.renderAdd.bind(this);
    this.state = {
      day: this.day,
      hour: this.hour,
      week: this.week,
      date: new Date(),
    };
  }
  valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }
  valuetext(value) {
    return `${value} days`;
  }
  addRecipe(e) {
    console.log(this.ingredients);
    this.props.addRecipe(
      this.name,
      this.description,
      this.imgurl,
      this.state.date.getDay() + 1,
      weekNumber(this.state.date),
      this.state.hour,
      this.ingredients,
      this.repeat,
      this.url
    );
  }

  updateRecipe() {
    this.props.updateRecipe(
      {
        description: this.description,
        imgurl: this.imgurl,
        name: this.name,
        ingredients: this.ingredients,
        url: this.url,
        id: this.recipeId,
      },
      this.recipeId
    );
  }

  renderAdd() {
    return (
      <div>
        <Card style={styleCard}>
          <Grid container>
            <Typography
              sx={{
                marginLeft: "25%",
                marginTop: "20px",
                fontSize: "25px",
                color: "black",
                justifyContent: "center",
              }}
            >
              Add a new Recipe
            </Typography>
            <FormGroup
              sx={{ width: "90%", marginLeft: "5%" }}
              variant="standard"
            >
              <InputLabel style={labelStyle} shrink htmlFor="locationInput">
                Name
              </InputLabel>
              <BootstrapInput
                placeholder="Name"
                sx={{ width: "100%" }}
                id="NameInput"
                onChange={(event) => (this.name = event.target.value)}
              />

              <InputLabel style={labelStyle} shrink htmlFor="locationInput">
                Time
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                sx={{ width: 100, height: 30, fontSize: "12px" }}
                value={this.state.hour}
                label="Time"
                onChange={(event) =>
                  this.setState({ hour: event.target.value })
                }
              >
                <MenuItem value={1}>Breakfast</MenuItem>
                <MenuItem value={2}>Lunch</MenuItem>
                <MenuItem value={3}>Dinner</MenuItem>
              </Select>

              <InputLabel style={labelStyle} shrink htmlFor="locationInput">
                Date
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Custom date"
                  value={this.state.date}
                  onChange={(newValue) => {
                    this.setState({ date: newValue });
                  }}
                  renderInput={({ inputRef, inputProps, InputProps }) => (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <input ref={inputRef} {...inputProps} />
                      {InputProps?.endAdornment}
                    </Box>
                  )}
                />
              </LocalizationProvider>

              <InputLabel style={labelStyle} shrink htmlFor="ingredientsInput">
                Ingredients
              </InputLabel>
              <BootstrapInput
                placeholder="Ingredients"
                fullWidth
                id="ingredientsInput"
                onChange={(event) => (this.ingredients = event.target.value)}
              />

              <InputLabel style={labelStyle} shrink htmlFor="ingredientsInput">
                Description
              </InputLabel>
              <TextareaAutosize
                maxRows={4}
                aria-label="maximum height"
                placeholder="Add detiled description"
                onChange={(event) => (this.description = event.target.value)}
              />
              <InputLabel style={labelStyle} shrink htmlFor="ingredientsInput">
                For how many days ?
              </InputLabel>
              <Slider
                aria-label="Restricted values"
                defaultValue={1}
                valueLabelFormat={this.valueLabelFormat}
                getAriaValueText={this.valuetext}
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
                min={1}
                max={5}
                onChange={(event) => (this.repeat = event.target.value)}
              />

              <InputLabel style={labelStyle} shrink htmlFor="imageInput">
                Image url
              </InputLabel>
              <BootstrapInput
                placeholder="Image Url"
                fullWidth
                id="imageInput"
                onChange={(event) => (this.imgurl = event.target.value)}
              />

              <InputLabel style={labelStyle} shrink htmlFor="recipeUrl">
                Url
              </InputLabel>
              <BootstrapInput
                placeholder="Url"
                fullWidth
                id="recipeUrl"
                onChange={(event) => (this.url = event.target.value)}
              />
            </FormGroup>
          </Grid>
        </Card>
        <Fab size="medium" style={styleFab} aria-label="add">
          <AddIcon onClick={(event) => this.addRecipe(event)} />
        </Fab>
      </div>
    );
  }

  renderUpdate() {
    return (
      <div>
        <Card style={styleCard}>
          <Typography
            sx={{
              fontFamily: "Alef",
              marginTop: "20px",
              marginLeft: "220px",
              fontSize: "25px",
              color: "black",
            }}
          >
            Update Recipe
          </Typography>
          <FormGroup sx={{ width: "90%", marginLeft: "5%" }} variant="standard">
            <InputLabel style={labelStyle} shrink htmlFor="locationInput">
              Name
            </InputLabel>
            <BootstrapInput
              defaultValue={this.name}
              placeholder="Name"
              sx={{ width: "100%" }}
              id="NameInput"
              onChange={(event) => (this.name = event.target.value)}
            />

            <InputLabel style={labelStyle} shrink htmlFor="locationInput">
              Time
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              sx={{ width: 100, height: 30, fontSize: "12px" }}
              value={this.state.hour}
              label="Time"
              onChange={(event) => this.setState({ hour: event.target.value })}
            >
              <MenuItem value={1}>Breakfast</MenuItem>
              <MenuItem value={2}>Lunch</MenuItem>
              <MenuItem value={3}>Dinner</MenuItem>
            </Select>

            <InputLabel style={labelStyle} shrink htmlFor="locationInput">
              Date
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Custom date"
                value={this.state.date}
                onChange={(newValue) => {
                  this.setState({ date: newValue });
                }}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <input ref={inputRef} {...inputProps} />
                    {InputProps?.endAdornment}
                  </Box>
                )}
              />
            </LocalizationProvider>

            <InputLabel style={labelStyle} shrink htmlFor="ingredientsInput">
              Ingredients
            </InputLabel>
            <BootstrapInput
              placeholder="Ingredients"
              defaultValue={this.ingredients}
              fullWidth
              id="ingredientsInput"
              onChange={(event) => (this.ingredients = event.target.value)}
            />

            <InputLabel style={labelStyle} shrink htmlFor="ingredientsInput">
              Description
            </InputLabel>
            <TextareaAutosize
              maxRows={4}
              aria-label="maximum height"
              placeholder="Maximum 4 rows"
              defaultValue={this.description}
              style={{ width: 500 }}
              onChange={(event) => (this.description = event.target.value)}
            />

            <InputLabel style={labelStyle} shrink htmlFor="imageInput">
              Image url
            </InputLabel>
            <BootstrapInput
              defaultValue={this.imgurl}
              placeholder="Image Url"
              fullWidth
              id="imageInput"
              onChange={(event) => (this.imgurl = event.target.value)}
            />

            <InputLabel style={labelStyle} shrink htmlFor="recipeUrl">
              Url
            </InputLabel>
            <BootstrapInput
              defaultValue={this.url}
              placeholder="Url"
              fullWidth
              id="recipeUrl"
              onChange={(event) => (this.url = event.target.value)}
            />
          </FormGroup>
        </Card>
        <Box sx={{ marginLeft: "36%" }}>
          <Fab
            size="medium"
            style={styleFab}
            aria-label="update"
            onClick={(event) => {
              this.props.disableForm(event);
            }}
          >
            <CloseIcon />
          </Fab>
          <Fab
            size="medium"
            margin="25%"
            style={styleFab}
            aria-label="add"
            onClick={(event) => {
              this.updateRecipe(event);
            }}
          >
            <DoneIcon />
          </Fab>
        </Box>
      </div>
    );
  }
  render() {
    return (
      <>{this.props.showAddForm ? this.renderAdd() : this.renderUpdate()}</>
    );
  }
}

export default RecipeForms;
