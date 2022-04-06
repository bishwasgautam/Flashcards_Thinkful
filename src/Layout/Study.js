import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import CardStudy from "./CardStudy";

function Study() {
  const { deckId } = useParams();
  // const { url } = useRouteMatch();
  const [deck, setDeck] = useState({});
  
  useEffect(() => {
    readDeck(deckId)
    .then(response => setDeck(response) );
  }, [deckId]);
  
  if(deck) {
    return (
      <div>
        <ul className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li>Study</li>
        </ul>
        <h1>Study: {deck.name}</h1>
        < CardStudy cards={deck.cards} />
      </div>
    );
  }
  return "Loading...";
}
export default Study;
