import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";

function DeckListItem({deck}) {

  const handleView = () => history.push(`/decks/${deck.id}`);
  const handleStudy = () => history.push(`/decks/${deck.id}/study`);
  
  const history = useHistory();
  const handleDelete = async () => {
    if (window.confirm("Do you really want to delete this deck?")) await deleteDeck(deck.id);
    history.go(0); // refresh
  };

  return (
    <div className="container text-blue">
      <table>
        <thead> 
          <tr>
            <td>
              <h1>{deck.name}</h1>
            </td>
            <td>
              <small>({deck.cards.length} cards)</small>
            </td>
          </tr>
        </thead>
        <tbody> 
          <tr>
            <td>
              <p>{deck.description}</p>
            </td>
          </tr>
          <tr>
            <td> <button type="button" onClick={handleView}>View</button> </td>
            <td> <button type="button" onClick={handleStudy}>Study</button> </td>
            <td> <button type="button" onClick={handleDelete}>Delete</button> </td>
          </tr>
          </tbody>
      </table>
    </div>
  );
}

export default DeckListItem;
