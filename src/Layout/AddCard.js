import React, { useState, useEffect } from "react";
import { readDeck, readCard, createCard, updateCard } from "../utils/api/index";
import { useParams, Link, useHistory } from "react-router-dom";

function AddCard( {add=true} ) {

  // const deckId = useParams().deckId;
  const { deckId, cardId } = useParams();
  const deckUrl = `/decks/${deckId}`;
  const history = useHistory();
  
  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState({ ...initialFormState });
  
  // const [cardId, setCardId] = useState();
  
  useEffect(() => {
    readDeck(deckId)
    .then(response => setDeck(response));
  }, [deckId]);

 // if(add=false) {
    useEffect(() => {
      if(cardId && cardId >= 0) {
        readCard(cardId)
        .then(response => setFormData({
          front: response.front,
          back: response.back
        }));
      }
    }, [cardId]);
 // }npm start
 //if(!add) setCardId(useParams().cardId);

  const initialFormState = {
    front: "Front side of card",
    back: "Back side of card"
  };
  
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  if(deck) {
    const handleDone = () => history.push(deckUrl);
    const handleSave = async (event) => {
      event.preventDefault();
    
      const newCard = {
        front: formData.front,
        back: formData.back,
        deckId: deckId
      };
      if(add) {
        await createCard(deckId, newCard);
        setFormData(initialFormState);
        // history.go(0); // refresh
      } else {
        newCard.id = cardId;
        await updateCard(newCard);
        history.push(deckUrl);
      }
    };
    
    return (
      <div>
        <ul className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li><Link to={deckUrl}>{deck.name}</Link></li>
          {add ? <li>Add Card</li> : <li>Edit Card {cardId}</li>}
        </ul>
        {add ? <h1>{deck.name}: Add Card</h1> : <h1>Edit Card</h1>}
        <form name="addCard">
            <table>
              <tbody>
                <tr><td><p>Front</p></td></tr>
                <tr><td>
                  <textarea
                    name="front"
                    onChange={handleChange}
                    value={formData.front} />
                </td></tr>
                <tr><td><p>Back</p></td></tr>
                <tr><td>
                  <textarea
                    name="back"
                    onChange={handleChange}
                    value={formData.back} />
                </td></tr>
                <tr>
                  <td>
                    <button type="button" onClick={handleDone}>Done</button>
                  </td>
                  <td>
                    <button type="button" onClick={handleSave}>Save</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
    );
  }
  return "Loading...";
}
export default AddCard;
