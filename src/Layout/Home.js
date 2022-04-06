import React, { useEffect, useState } from "react";
import DeckListItem from "./DeckListItem";
import { listDecks } from "../utils/api/index";
import { useHistory } from "react-router-dom";

function Home() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();
  
  useEffect(() => {
    listDecks()
    .then(response => setDecks(response));
  }, []);
  
  if(decks) {
    const deckList = decks.map(
      (deck, index) => <tr key={`${index}`}><td><DeckListItem deck={deck}/></td></tr>
    );

    const handleCreate = () => history.push("/decks/new");
    
    return (
        <table>
          <tbody> 
             <tr><td>
              <button type="button" onClick={handleCreate}>Create Deck</button>
             </td></tr>
            {deckList}
          </tbody>
        </table>
    );
  }
  return "Loading...";
}

export default Home;
