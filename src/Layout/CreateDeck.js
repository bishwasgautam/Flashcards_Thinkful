import React, { useState } from "react";
import { createDeck } from "../utils/api/index";
import { Link, useHistory } from "react-router-dom";

function CreateDeck(  ) {
  /*
  const [newDeck, setNewDeck] = useState({});
  
  useEffect(() => {
    if(newDeck.name) {
      createDeck(newDeck)
      // .then(deck => console.log(deck))
      .then(deck => history.push(`/decks/${deck.id}`))
      .catch(error => console.log(error));
    }
  }, [newDeck]);
  */

  const history = useHistory();

  const initialFormState = {
    name: "Deck Name",
    description: "Brief description of the deck"
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleCancel = () => history.push("");
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const newDeck = {
      name: formData.name,
      description: formData.description
    };
    // setNewDeck(newDeck);
    /*async function updateData() {
      try { const deck = await createDeck(newDeck); history.push(`/decks/${deck.id}`); }
      catch (error) { if (error !== "AbortError") { throw error; } }
    }
    updateData();
    */
   console.log("yo");
    const deck = await createDeck(newDeck);
    history.push(`/decks/${deck.id}`);
  };
  
  return (
    <div>
      <ul className="breadcrumb">
        <li><Link to="/">Home</Link></li>
        <li>Create Deck</li>
      </ul>
      <h1>Create Deck</h1>
      <form name="createDeck">
          <table>
            <tbody>
              <tr><td><p>Name</p></td></tr>
              <tr><td>
                <input
                  name="name"
                  onChange={handleChange}
                  value={formData.name} />
              </td></tr>
              <tr><td><p>Description</p></td></tr>
              <tr><td>
                <textarea
                  name="description"
                  onChange={handleChange}
                  value={formData.description} />
              </td></tr>
              <tr>
                <td>
                  <button type="button" onClick={handleCancel}>Cancel</button>
                </td>
                <td>
                  <button type="button" onClick={handleSubmit}>Submit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
  );
}
export default CreateDeck;
