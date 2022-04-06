import React from "react";
import { deleteCard } from "../utils/api/index";
import { useHistory } from "react-router-dom";

function CardList( {card} ) {

  const history = useHistory();
  const handleEdit = () => history.push(`/decks/${card.deckId}/${card.id}/edit`);
  const handleDelete = async () => {
    if (window.confirm("Delete this card?")) await deleteCard(card.id);
    history.go(0); // refresh
  };

      return (
        <div>
          <table>
            <tbody>
             <tr>
               <td>{card.front}</td>
               <td>{card.back}</td>
            </tr>
             <tr>
               <td><button type="button" onClick={handleEdit}>Edit</button></td>
               <td><button type="button" onClick={handleDelete}>Delete</button></td>
             </tr>
            </tbody>
          </table>
        </div>
      );
}
export default CardList;
