import React, { useEffect } from "react";
import fetch from "cross-fetch";

import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import apiurl from "api/url";

export default function AirportSelect(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      // "https://country.register.gov.uk/records.json?page-size=5000"

      const response = await fetch(`${apiurl}/airports`);
      // await sleep(1e3); // For testing.
      let airports = await response.json();
      if (active && response.status === 200) {
        let c = airports.map((key) => {
          return key;
        });

        setOptions(c);
      } else {
        // Don't show an error if we can't fetch this component
        // asynchronously, just log to console.
        console.log(response);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => {
        return option.name ? option.name : "";
      }}
      options={options}
      loading={loading}
      value={props.value ? props.value : ""}
      onChange={(event, val) => {
        if (props.valueChangeCallback) {
          props.valueChangeCallback(val);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          className={props.className}
          label={props.label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
