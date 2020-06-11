import React, { useContext, useEffect } from "react";
import Popup from "reactjs-popup";
import axios from "axios";

// UI components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// My components
import QuoteForm from "components/QuoteForm";
import QuotesTable from "components/QuotesTable";
import FlashMessage, { flashErrorMessage } from "components/FlashMessage";

import { QuoteContext } from "context/quote-context";

export default function Quotes() {
  const [state, dispatch] = useContext(QuoteContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3030/quotes?$limit=1000"
        );
        dispatch({
          type: "FETCH_QUOTES",
          payload: response.data.data || response.data, // in case pagination is disabled
        });
      } catch (error) {
        flashErrorMessage(dispatch, error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div>
      {state.message.content && <FlashMessage message={state.message} />}

      <QuotesTable data={state.quotes} />
      <Popup
        contentStyle={{ width: "60%" }}
        trigger={<button> Trigger</button>}
        modal
      >
        <QuoteForm />
      </Popup>
    </div>
  );
}
