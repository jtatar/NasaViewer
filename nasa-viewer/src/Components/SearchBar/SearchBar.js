import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import './SearchBar.scss';
import { CircularProgress } from '@material-ui/core';

const SearchBar = ({ requestUrl, getNewImage }) => {
  const [value, setValue] = useState('');
  const [query, setQuery] = useState('');
  const [searchResults, setsearchResult] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchBarColor = '#121212';

  useEffect(() => {
    const selectedPlace = searchResults.filter((place) => place.name === value);
    if (selectedPlace.length > 0) {
      const lon = selectedPlace[0].coordinates[0];
      const lat = selectedPlace[0].coordinates[1];
      getNewImage(lon, lat);
    }
  }, [value]);

  useEffect(() => {
    let active = true;
    if (!loading || !open) {
      return undefined;
    }

    (async () => {
      const response = await axios.get(`${requestUrl}/api/search`, {
        params: {
          q: query,
        },
      });
      if (active) {
        setsearchResult(response.data);
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setsearchResult([]);
    }
  }, [open]);

  const useStyles = makeStyles({
    root: {
      background: `${searchBarColor} !important`,
      transition: null,
      '&:hover': {
        background: `${searchBarColor} !important`,
      },
      '&:focus': {
        background: `${searchBarColor} !important`,
      },
    },
  });

  const styles = useStyles();

  return (
    <div className="searchBarWrapper">
      <Autocomplete
        classes={{
          inputRoot: styles.root,
          inputFocused: styles.root,
        }}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        loading={loading}
        filterOptions={(options, object) => options}
        freeSolo
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          setLoading(false);
        }}
        inputValue={query}
        onInputChange={(event, newValue) => {
          setQuery(newValue);
          if (newValue.length != 0) {
            setLoading(true);
          }
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
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading && open ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </div>
  );
};

export default SearchBar;
