import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

function CardStudy( {cards} ) {
  const [cardId, setcardId] = useState(0);
  const [side, setSide] = useState(true);
  const numCards = cards ? cards.length : 0;
  const history = useHistory();
  const deckId = useParams().deckId;
  
    if(numCards < 3) {
      const handleAddCard = () => history.push(`/decks/${deckId}/cards/new`);
      return (
        <div>
         <h2>Not enough cards</h2>
         <p>You need at least 3 cards to study. There are only {numCards} cards in this deck.</p>
         <button type="button" onClick={handleAddCard}>Add Card</button>
        </div>
      );
    } else {
      const card = cards[cardId];
      const handleFlip = () => setSide(!side);
      const handleNext = () => {
        setSide(true); // start on front side
        if(cardId < (numCards - 1)) setcardId(cardId + 1);
        else if (window.confirm("Restart Cards?")) setcardId(0);
        else history.push("/");
      };
      /*
      var nextButton = document.getElementById("nextButton");
      if(nextButton) {
        if(side) nextButton.setAttribute("disabled", true);
        else nextButton.removeAttribute("disabled");
      }*/

      return (
        <div>
          <table>
            <thead>
              <tr><th><h2>Card {cardId + 1} of {numCards}</h2></th></tr>
            </thead>
            <tbody>
             <tr><th><p>{side ? card.front : card.back}</p></th></tr>
             <tr>
               <th><button type="button" onClick={handleFlip}>Flip</button></th>
               {side ? <th></th> : <th><button id="nextButton" type="button" onClick={handleNext}>Next</button></th>}
             </tr>
            </tbody>
          </table>
        </div>
      );
    }
}
export default CardStudy;
