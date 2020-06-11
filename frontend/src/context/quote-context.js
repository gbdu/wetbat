import React, { useReducer, createContext } from "react";

export const QuoteContext = createContext();

const initialState = {
  quotes: [],
  quote: {}, // selected or new
  message: {}, // { type: 'success|fail', title:'Info|Error' content:'lorem ipsum'}
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_QUOTES": {
      return {
        ...state,
        quotes: action.payload,
        quote: {},
      };
    }
    case "FLASH_MESSAGE": {
      return {
        ...state,
        message: action.payload,
      };
    }
    case "CREATE_QUOTE": {
      return {
        ...state,
        quotes: [...state.quotes, action.payload],
        message: {
          type: "success",
          title: "Success",
          content: "New quote created!",
        },
      };
    }
    case "FETCH_QUOTE": {
      return {
        ...state,
        quote: action.payload,
        message: {},
      };
    }
    case "UPDATE_QUOTE": {
      const quote = action.payload;
      return {
        ...state,
        quotes: state.quotes.map((item) =>
          item._id === quote._id ? quote : item
        ),
        message: {
          type: "success",
          title: "Update Successful",
          content: `Quote "${quote.id}" has been updated!`,
        },
      };
    }
    case "DELETE_QUOTE": {
      const { _id } = action.payload;
      return {
        ...state,
        quotes: state.quotes.filter((item) => item._id !== _id),
        message: {
          type: "success",
          title: "Delete Successful",
          content: `Quote has been deleted!`,
        },
      };
    }
    default:
      throw new Error();
  }
}

export const QuoteContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  return (
    <QuoteContext.Provider value={[state, dispatch]}>
      {children}
    </QuoteContext.Provider>
  );
};
