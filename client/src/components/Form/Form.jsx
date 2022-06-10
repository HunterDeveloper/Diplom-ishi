import React, { useEffect, useState } from "react";
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

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "./Form.scss";
import {
  chartApplications,
  createApplication,
  getCategory,
} from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const Form = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [files, setFiles] = useState("");

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const categories = useSelector((state) => state.categories);

  const isFormValid = () => {
    return (
      city.length !== 0 &&
      region.length !== 0 &&
      categoryId.length !== 0 &&
      description.length !== 0 &&
      date.length !== 0 &&
      !!files
    );
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const application = {
      city,
      region,
      categoryId,
      description,
      files,
      name,
      surname,
      date,
    };
    dispatch(createApplication(application));
    dispatch(chartApplications());
    clean();
  };

  const clean = () => {
    setCity("");
    setRegion("");
    setCategoryId("");
    setDescription("");
    setFiles("");
  };

  return (
    <Grid lg={8} item container style={{ margin: "auto" }}>
      <form className="Form" onSubmit={onSubmitHandler}>
        <h3>Murojat formasi</h3>
        <TextField
          label="Ism (ixtiyoriy)"
          variant="outlined"
          placeholder="ixtiyoriy"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
        <TextField
          label="Familiya (ixtiyoriy)"
          variant="outlined"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          className="input"
        />
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
        <FormControl fullWidth className="select">
          <InputLabel id="demo-simple-select-label">Murojat turi</InputLabel>
          <Select
            value={categoryId}
            label="Murojat turi"
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categories.length
              ? categories.map((ctg, idx) => (
                  <MenuItem value={ctg._id} key={idx}>
                    {ctg.name}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>
        <input
          type="file"
          multiple
          className="file_input"
          onChange={(e) => setFiles(e.target.files)}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Sana"
            value={date}
            onChange={(newValue) => {
              setDate(`${newValue}`);
            }}
            renderInput={(params) => (
              <TextField className="input" {...params} error={false} />
            )}
          />
        </LocalizationProvider>
        <div className="form_button">
          <Button
            variant="contained"
            disabled={!isFormValid()}
            type="submit"
            size="large"
          >
            Jo'natish
          </Button>
        </div>
      </form>
    </Grid>
  );
};

export default Form;
