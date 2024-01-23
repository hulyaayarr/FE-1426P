import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDebouncedValue } from "./useDebouncedValue";
import { shops, getShopName } from "./shops.jsx";
import { categories, getCategoryName } from "./categories.jsx";

import Table from "react-bootstrap/Table";
import JSConfetti from "js-confetti";
import styled from "styled-components";

import TrashIcon from "./TrashIcon";
import CheckCircleIcon from "./CheckCircleIcon";

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

  //Shop useState
  const [shopId, setShopId] = useState("");
  const handleChangeShop = (e) => setShopId(e.target.value);

  //Category useState
  const [categoryId, setCategoryId] = useState("");
  const handleChangeCategorie = (e) => setCategoryId(e.target.value);

  //Products
  const [productInput, setProductInput] = useState("");
  const [products, setProducts] = useState([]);

  //Filters
  const [filteredShopId, setFilteredShopId] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredCategoryId, setFilteredCategoryId] = useState("");
  const [filteredStatus, setFilteredStatus] = useState("");
  const [filteredName, setFilteredName] = useState("");
  const debouncedQuery = useDebouncedValue(filteredName, 400);

  useEffect(() => {
    let result = products.filter((item) => {
      const shopFilter = !filteredShopId || item.shop.includes(filteredShopId);
      const categoryFilter =
        !filteredCategoryId || item.categorie.includes(filteredCategoryId);

      const statusFilter =
        filteredStatus === "all" ||
        !filteredStatus ||
        (filteredStatus === "bought" && item.completed) ||
        (filteredStatus === "notBought" && !item.completed);

      const nameFilter = item.name
        .toLowerCase()
        .includes(debouncedQuery.toLowerCase());

      return shopFilter && categoryFilter && statusFilter && nameFilter;
    });

    setFilteredProducts(result);
  }, [
    filteredShopId,
    filteredCategoryId,
    filteredStatus,
    filteredName,
    products,
    debouncedQuery,
  ]);

  const completeTheProduct = (id) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          completed: !product.completed,
        };
      }
      return product;
    });

    if (updatedProducts.every((item) => item.completed)) {
      jsConfetti.addConfetti();
    }

    setProducts(updatedProducts);
  };

  const removeProduct = (value) => {
    setProducts((oldValues) =>
      oldValues.filter((product) => product.id !== value.id)
    );
  };

  const clearFilters = () => {
    setFilteredShopId("");
    setFilteredProducts([]);
    setFilteredCategoryId("");
    setFilteredStatus("");
    setFilteredName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (productInput.trim() !== "") {
      const newProduct = {
        id: ++nextId,
        name: productInput,
        shop: shopId,
        categorie: categoryId,
        completed: false,
      };

      setProducts([...products, newProduct]);
      setProductInput("");
      setShopId("");
      setCategoryId("");
    }
  };

  return (
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
            value={shopId}
            onChange={handleChangeShop}
          >
            <option value="" disabled>
              Select a shop
            </option>
            {shops.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </Form.Select>

          <Form.Select value={categoryId} onChange={handleChangeCategorie}>
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((item) => {
              return (
                <option key={item.id} value={item.id}>
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
      <FormDiv className="mb-3">
        <FormDiv className="mx-2">
          <Form.Select
            value={filteredShopId}
            onChange={(e) => setFilteredShopId(e.target.value)}
          >
            <option value="" disabled>
              Shop
            </option>
            {shops.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </Form.Select>
        </FormDiv>
        <FormDiv className="mx-2">
          <Form.Select
            value={filteredCategoryId}
            onChange={(e) => setFilteredCategoryId(e.target.value)}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </Form.Select>
        </FormDiv>
        <FormDiv className="mx-2">
          <input
            type="text"
            name="name"
            className="ms-2 py-2 rounded"
            value={filteredName}
            onChange={(e) => setFilteredName(e.target.value)}
            aria-label="Product"
          />
        </FormDiv>
      </FormDiv>
      <FormDiv className="mb-3">
        <Form.Check
          aria-label="all"
          type="radio"
          label="All"
          name="radAnswer"
          value="all"
          checked={filteredStatus === "all"}
          onChange={(e) => setFilteredStatus(e.target.value)}
          className="mx-2"
        />
        <Form.Check
          aria-label="bought"
          type="radio"
          label="Bought"
          name="radAnswer"
          value="bought"
          checked={filteredStatus === "bought"}
          onChange={(e) => setFilteredStatus(e.target.value)}
          className="mx-2"
        />
        <Form.Check
          aria-label="not bought"
          type="radio"
          label="Not Bought"
          name="radAnswer"
          value="notBought"
          checked={filteredStatus === "notBought"}
          onChange={(e) => setFilteredStatus(e.target.value)}
          className="mx-2"
        />
      </FormDiv>
      <FormDiv className="mb-3">
        <StyledButton
          className="mx-2"
          variant="secondary"
          onClick={clearFilters}
        >
          Clear Filters
        </StyledButton>
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
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <button
                    type="button"
                    className={`btn btn-success ${
                      product.completed ? product.completed : ""
                    }`}
                    onClick={() => completeTheProduct(product.id)}
                  >
                    <CheckCircleIcon />
                  </button>
                </td>
                <td>
                  {product.completed ? <del>{product.name}</del> : product.name}
                </td>
                <td>
                  {product.completed ? (
                    <del>{getShopName(parseInt(product.shop, 10), shops)}</del>
                  ) : (
                    getShopName(parseInt(product.shop, 10), shops)
                  )}
                </td>
                <td>
                  {product.completed ? (
                    <del>
                      {getCategoryName(
                        parseInt(product.categorie, 10),
                        categories
                      )}
                    </del>
                  ) : (
                    getCategoryName(parseInt(product.categorie, 10), categories)
                  )}
                </td>
                <td>
                  <TrashIcon onClick={() => removeProduct(product)} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableDiv>
    </StyledDiv>
  );
};
