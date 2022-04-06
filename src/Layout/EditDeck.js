import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";

function EditDeck(  ) {
  
  const { deckId } = useParams();
  const history = useHistory();
  // const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState({
    name: "name",
    description: "description"
  });
  
  useEffect(() => {
    readDeck(deckId)
    // .then(response => setDeck(response))
    .then(response => setFormData({
      name: response.name,
      description: response.description
    }));
  }, [deckId]);
  
  if(formData) {
    const deckUrl = `/decks/${deckId}`;
    const handleChange = ({ target }) => {
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    };
    const handleCancel = () => history.push(deckUrl);
    const handleSubmit = async (event) => {
      event.preventDefault();
    
      const newDeck = {
        name: formData.name,
        description: formData.description,
        id: deckId
      };
      await updateDeck(newDeck);
      history.push(deckUrl);
    };
    
    return (
      <div>
        <ul className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li><Link to={deckUrl}>{formData.name}</Link></li>
          <li>Edit Deck</li>
        </ul>
        <h1>Edit Deck</h1>
        <form name="editDeck">
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
  return "Loading...";
}
export default EditDeck;
