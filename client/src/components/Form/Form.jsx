import React, { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";

import "./Form.scss";

const Form = () => {
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState("");

  console.log(files);

  return (
    <Grid lg={6} item container style={{ margin: "auto" }}>
      <form className="Form">
        <h3>Murojat formasi</h3>
        <TextField
          label="Shahar"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input"
        />
        <TextField
          label="Viloyat"
          variant="outlined"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="input"
        />
        <TextareaAutosize
          minRows={6}
          className="textarea"
          aria-label="maximum height"
          placeholder="Murojat matni"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl fullWidth className="input">
          <InputLabel id="demo-simple-select-label">Murojat turi</InputLabel>
          <Select
            value={categoryId}
            label="Murojat turi"
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <input
          type="file"
          multiple
          className="file_input"
          onChange={(e) => setFiles(e.target.files)}
        />
        <Button variant="contained" size="large" style={{ margin: "auto" }}>
          Jo'natish
        </Button>
      </form>
    </Grid>
  );
};

export default Form;
