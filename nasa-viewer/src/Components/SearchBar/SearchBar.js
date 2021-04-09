import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import './SearchBar.scss';

const SearchBar = ({ requestUrl, getNewImage }) => {
  const [value, setValue] = useState('');
  const [query, setQuery] = useState('');
  const [searchResults, setsearchResult] = useState([]);

  const searchBarColor = '#121212';

  const useStyles = makeStyles({
    inputRoot: {
      background: searchBarColor,
      '&:hover': {
        background: searchBarColor,
      },
    },
    inputFocused: {
      background: searchBarColor,
    },
    root: {
      background: searchBarColor,
    },
  });

  const styles = useStyles();

  const getNewResult = async (searchQuery) => {
    try {
      const response = await axios.get(`${requestUrl}/api/search`, {
        params: {
          q: searchQuery,
        },
      });
      setsearchResult(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const selectedPlace = searchResults.filter((place) => place.name === value);
    if (selectedPlace.length > 0) {
      const lon = selectedPlace[0].coordinates[0];
      const lat = selectedPlace[0].coordinates[1];
      getNewImage(lon, lat);
    }
  }, [value]);

  return (
    <div className="searchBarWrapper">
      <Autocomplete
        classes={{
          inputRoot: styles.inputRoot,
          inputFocused: styles.inputFocused,
        }}
        filterOptions={(options, object) => options}
        freeSolo
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={query}
        onInputChange={(event, newValue) => {
          setQuery(newValue);
          getNewResult(newValue);
        }}
        options={searchResults.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            classes={{
              root: styles.root,
            }}
            label="Search for place.."
            margin="normal"
            variant="filled"
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
    </div>
  );
};

export default SearchBar;
