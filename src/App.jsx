//import { useState } from "react";
import { Container } from "react-bootstrap";
import { ShoppingList } from "./ShoppingList";

function App() {
  //const [count, setCount] = useState(0);

  return (
    <>
      <Container>
        <ShoppingList></ShoppingList>
      </Container>
    </>
  );
}

export default App;
