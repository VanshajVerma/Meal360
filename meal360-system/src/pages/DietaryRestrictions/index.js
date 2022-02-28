import { Button, Navbar, Nav, Container, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AppNavbar from "../../components/navbar";

export default function DietaryRestrictionsPage() {
  let diet = "No Diet";
  let calories = "3000";
  let exclude = [""];

  const [sdiet, setDiet] = useState("");
  const [scalories, setCalories] = useState("");
  const [sexclude, setExclude] = useState([""]);

  function setDisplay() {
    console.log('setDisplay');
    const data = { 'email': 'green@gmail.com' };
    const response = fetch('/retrievePrefs', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      setDiet(data.preferences.diet)
      setCalories(data.preferences.targetCalories)
      setExclude(data.preferences.exclude.join(", "))
      console.log(data.preferences.exclude)
    })
    .catch(error => {
      console.log('Error: ', error); 
    })
  };

  async function handleApply() {
    console.log('apply');
    const data = { 'email': "green@gmail.com", 
                    'params': {
                      'email': "green@gmail.com",
                      'diet': diet,
                      'exclude': exclude,
                      'targetCalories': calories,
                    },
                 };
    const response = await fetch('/setPrefs', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('Preferences are set.');
      setDisplay()
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  function updateDiet(event) {
    diet = event.target.value
  }

  function updateCalories(event) {
    calories = event.target.value
  }

  function updateExclude(event) {
    exclude = event.target.value.split(', ');
  }

  useEffect(() => {
    setDisplay();
  }, []);

  return (<>
    <AppNavbar active={'dietaryRestrictions'}/>
    <br/>
    <Container>
      <h1 className="text-secondary">Dietary Restrictions</h1>

      <Card className='w-50 p-3 mb-4'>
        <Card.Title>Your Preferences</Card.Title>
        <Card.Body className="">
          <p><b>Diet:</b> {sdiet}</p>
          <p><b>Target Calories:</b> {scalories}</p>
          <p><b>Excluded Ingredients:</b><br></br> {sexclude}</p>
        </Card.Body>
      </Card>

      <Card className='w-50 p-3'>
        <Card.Title>Change Preferences</Card.Title>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Diet</Form.Label>
            <Form.Select aria-label="Default select example" onChange={updateDiet}>
              <option value="No Diet">No Diet</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Pescetarian">Pescetarian</option>
              <option value="Ketogenic">Ketogenic</option>
              <option value="Paleo">Paleo</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Target Calories</Form.Label>
            <Form.Control defaultValue={calories} onChange={updateCalories}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Exclude Ingredients</Form.Label>
            <Form.Control defaultValue={exclude} onChange={updateExclude}/>
          </Form.Group>


          <Button variant='primary' onClick={()=>handleApply()}>Apply</Button>
        </Form>
      </Card>
    </Container>

  </>)
}