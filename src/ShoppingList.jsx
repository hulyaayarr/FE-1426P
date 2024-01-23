import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import JSConfetti from "js-confetti";
import styled from "styled-components";
import img from "./assets/bg.png";
import { useDebouncedValue } from "./useDebouncedValue";

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

let nextId = 1;
export const ShoppingList = () => {
  const jsConfetti = new JSConfetti();
  // Shops
  const shops = [
    { id: 1, name: "Migros" },
    { id: 2, name: "Teknosa" },
    { id: 3, name: "BIM" },
  ];
  const [shopId, setShopId] = useState("");
  const handleChangeShop = (e) => setShopId(e.target.value);

  // Categories
  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Deli" },
    { id: 3, name: "Toys" },
    { id: 4, name: "Groceries" },
    { id: 5, name: "Bakery" },
  ];
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

  const getShopName = (shopId) => {
    const foundShop = shops.find((shop) => shop.id === shopId);
    return foundShop ? foundShop.name : "Unknown Shop";
  };
  const getCategoryName = (categoryId) => {
    const foundCategory = categories.find(
      (category) => category.id === categoryId
    );
    return foundCategory ? foundCategory.name : "Unknown Shop";
  };

  useEffect(() => {
    // Filter products based on sh

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

      // Combine all filters
      return shopFilter && categoryFilter && statusFilter && nameFilter;
    });

    // Set filteredProducts state with the filtered results
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

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (productInput.trim() !== "") {
      const newProduct = {
        id: nextId++,
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
                      <del>{getShopName(parseInt(product.shop, 10))}</del>
                    ) : (
                      getShopName(parseInt(product.shop, 10))
                    )}
                  </td>
                  <td>
                    {product.completed ? (
                      <del>
                        {getCategoryName(parseInt(product.categorie, 10))}
                      </del>
                    ) : (
                      getCategoryName(parseInt(product.categorie, 10))
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
