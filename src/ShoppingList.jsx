import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";

let nextId = 0;
export const ShoppingList = () => {
  // Shops
  const shops = [
    { id: 1, name: "Migros" },
    { id: 2, name: "Teknosa" },
    { id: 3, name: "BIM" },
  ];
  const [shop, setShop] = useState("");
  const handleChangeShop = (e) => setShop(e.target.value);

  // Categories
  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Deli" },
    { id: 3, name: "Toys" },
    { id: 4, name: "Groceries" },
    { id: 5, name: "Bakery" },
  ];
  const [categorie, setCategorie] = useState("");
  const handleChangeCategorie = (e) => setCategorie(e.target.value);

  //Products

  const [productInput, setProductInput] = useState("");

  const [products, setProducts] = useState([]);

  //Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (productInput.trim() !== "") {
      //Deleting all the spaces and checking if the user given an empty string or not
      setProducts([
        ...products,
        {
          id: nextId++,
          name: productInput,
          shop: shop,
          categorie: categorie,
        },
      ]);
      setProductInput("");
      // Reset selected values
      setShop("");
      setCategorie("");
    }
  };
  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group className=" mt-3 mb-3">
            <Form.Label>Product Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product"
              value={productInput}
              onChange={(e) => setProductInput(e.target.value)}
            />
          </Form.Group>

          <Form.Select
            className="mb-3"
            value={shop}
            onChange={handleChangeShop}
          >
            <option value="" disabled>
              Select a shop
            </option>
            {shops.map((item) => {
              return (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </Form.Select>

          <Form.Select value={categorie} onChange={handleChangeCategorie}>
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((item) => {
              return (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </Form.Select>

          <Button className="mt-3" variant="primary" type="submit">
            Submit
          </Button>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                {product.name} -{product.shop} -{product.categorie}
              </li>
            ))}
          </ul>
        </Form>
      </Container>
    </>
  );
};
