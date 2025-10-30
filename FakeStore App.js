import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navbar, Nav, Container, Card, Button, Form, Spinner, Alert, Row, Col, Modal } from 'react-bootstrap';

// 🔹 Navbar Component
function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">FakeStore</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/add-product">Add Product</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

// 🔹 Home Page
function Home() {
  return (
    <Container className="text-center">
      <h1>Welcome to FakeStore</h1>
      <p>Your mock e-commerce site powered by FakeStoreAPI!</p>
      <Button as={Link} to="/products" variant="primary">Browse Products</Button>
    </Container>
  );
}

// 🔹 Product Listing Page
function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch products.');
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner animation="border" className="d-block mx-auto" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      <h2 className="text-center mb-4">Product Listing</h2>
      <Row>
        {products.map(product => (
          <Col key={product.id} md={4} sm={6} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={product.image} height="200" className="object-fit-contain p-3" />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Button as={Link} to={`/products/${product.id}`} variant="outline-primary">View Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

// 🔹 Product Details Page
function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Product not found.');
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`https://fakestoreapi.com/products/${id}`)
      .then(() => {
        alert('Product deleted successfully!');
        navigate('/products');
      })
      .catch(() => alert('Failed to delete product.'));
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!product) return null;

  return (
    <Container>
      <Row>
        <Col md={6}>
          <img src={product.image} alt={product.title} className="img-fluid" />
        </Col>
        <Col md={6}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <h4>Category: {product.category}</h4>
          <h3>${product.price}</h3>
          <Button as={Link} to={`/edit-product/${id}`} variant="warning" className="me-2">Edit</Button>
          <Button variant="danger" onClick={() => setShowModal(true)}>Delete</Button>
        </Col>
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

// 🔹 Add Product Page
function AddProduct() {
  const [form, setForm] = useState({ title: '', price: '', description: '', category: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('https://fakestoreapi.com/products', form)
      .then(() => setMessage('Product added successfully (test mode).'))
      .catch(() => setMessage('Failed to add product.'));
  };

  return (
    <Container>
      <h2 className="mb-3 text-center">Add New Product</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" value={form.title} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control name="price" type="number" value={form.price} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" value={form.description} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control name="category" value={form.category} onChange={handleChange} required />
        </Form.Group>
        <Button type="submit" variant="success">Add Product</Button>
      </Form>
    </Container>
  );
}

// 🔹 Edit Product Page
function EditProduct() {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', price: '', description: '', category: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => setForm(res.data))
      .catch(() => setMessage('Failed to load product data.'));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`https://fakestoreapi.com/products/${id}`, form)
      .then(() => setMessage('Product updated successfully (test mode).'))
      .catch(() => setMessage('Failed to update product.'));
  };

  return (
    <Container>
      <h2 className="mb-3 text-center">Edit Product</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" value={form.title} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control name="price" type="number" value={form.price} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" value={form.description} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control name="category" value={form.category} onChange={handleChange} />
        </Form.Group>
        <Button type="submit" variant="warning">Update Product</Button>
      </Form>
    </Container>
  );
}

// 🔹 Main App
export default function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
      </Routes>
    </Router>
  );
}
