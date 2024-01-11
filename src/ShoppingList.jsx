import { Form } from "react-bootstrap";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import JSConfetti from "js-confetti";
import styled from "styled-components";
import img from "./assets/bg.png";

const Wrapper = styled.section`
  background-image: url(${img});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  height: 100vh;
`;

const StyledDiv = styled.div`
  background-color: #35576b8d;
  text-align: center;
  border-radius: 10px;
  height: 100vh;
  padding-top: 5vh;
  padding-bottom: 5vh;
`;

const StyledButton = styled.button`
  /* Adapt the colors based on primary prop */
  background: #35576b;
  color: #fff;

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #35576b;
  border-radius: 3px;
`;

const FormDiv = styled.div`
  display: flex;
  justify-content: center;
`;
const TableDiv = styled.div`
  display: flex;
  justify-content: center;
  padding-left: 100px;
  padding-right: 100px;
`;

let nextId = 0;
export const ShoppingList = () => {
  const jsConfetti = new JSConfetti();
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

  const completeTheProduct = (index) => {
    const newProducts = [...products];
    newProducts[index].completed = !newProducts[index].completed;

    if (newProducts.every((item) => item.completed)) {
      jsConfetti.addConfetti();
    }

    setProducts(newProducts);
  };

  const removeProduct = (value) => {
    setProducts((oldValues) =>
      oldValues.filter((product) => product.id !== value.id)
    );
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (productInput.trim() !== "") {
      const newProduct = {
        id: nextId++,
        name: productInput,
        shop: shop,
        categorie: categorie,
        completed: false, // Initialize completed to false
      };

      setProducts([...products, newProduct]);
      setProductInput("");
      setShop("");
      setCategorie("");
    }
  };
  return (
    <Wrapper>
      <StyledDiv>
        <FormDiv>
          <Form onSubmit={handleSubmit}>
            <Form.Group className=" mt-3 mb-3">
              <Form.Label className="text-white fs-1">Product Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product"
                value={productInput}
                onChange={(e) => setProductInput(e.target.value)}
                className="d-inline"
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

            <StyledButton
              className="mt-3"
              $primary
              variant="primary"
              type="submit"
            >
              Submit
            </StyledButton>
          </Form>
        </FormDiv>

        <TableDiv>
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Purchased</th>
                <th>Product Name</th>
                <th>Market Name</th>
                <th>Category</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>
                    <button
                      type="button"
                      className={`btn btn-success ${
                        product.completed ? product.completed : ""
                      }`}
                      onClick={() => completeTheProduct(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-check2-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                        <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                      </svg>
                    </button>
                  </td>
                  <td>
                    {product.completed ? (
                      <del>{product.name}</del>
                    ) : (
                      product.name
                    )}
                  </td>
                  <td>
                    {product.completed ? (
                      <del>{product.shop}</del>
                    ) : (
                      product.shop
                    )}
                  </td>
                  <td>
                    {product.completed ? (
                      <del>{product.categorie}</del>
                    ) : (
                      product.categorie
                    )}
                  </td>
                  <td>
                    <svg
                      onClick={() => removeProduct(product)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      fill="#ff7272"
                      className={` bi bi-trash-fill`}
                      style={{ cursor: "pointer" }}
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableDiv>
      </StyledDiv>
    </Wrapper>
  );
};
