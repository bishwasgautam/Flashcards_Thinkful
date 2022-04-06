import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api/index";
import CardList from "./CardList";

function Deck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  
  useEffect(() => {
    readDeck(deckId)
    .then(response => setDeck(response));
  }, [deckId]);
  
  const history = useHistory();

  
    const handleEdit = () => history.push(`/decks/${deck.id}/edit`);
    const handleStudy = () => history.push(`/decks/${deck.id}/study`);
    const handleAddCards = () => history.push(`/decks/${deck.id}/cards/new`);
    const handleDelete = async () => {
      if (window.confirm("Delete this deck?")) {
        await deleteDeck(deck.id);
        history.push("/");
      }
    };

    const cards = deck.cards ? deck.cards.map( (card, index) => <CardList key={`${index}`} card={card}/> ) : <p>No Cards..</p>;

    return (
      <div>
        <ul className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li>{deck.name}</li>
        </ul>
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <button type="button" onClick={handleEdit}>Edit</button>
        <button type="button" onClick={handleStudy}>Study</button>
        <button type="button" onClick={handleAddCards}>Add Cards</button>
        <button type="button" onClick={handleDelete}>Delete</button>
        <h1>Cards</h1>
        {cards}
      </div>
    );
  
  
}
export default Deck;
