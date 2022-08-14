import './App.css'
import { Image, Alert, Container, Row, Col } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import AddToDoItem from './components/AddToDoItem';
import ToDoItemsList from './components/ToDoItemsList';
import { CircularProgress } from '@material-ui/core';

const axios = require('axios')

const App = () => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getItems();
    }, [])

    const getItems = async () => {
        try {
            setError(null);
            setLoading(true);
            const response = await fetch('https://localhost:5001/api/todoitems/');
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            else {
                response.json().then(i => setItems(i));
            }
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }
    return (
        <div className="App">
            <Container>
                <Row>
                    <Col>
                        <Image src="clearPointLogo.png" fluid rounded />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Alert variant="success">
                            <Alert.Heading>Todo List App</Alert.Heading>
                            Welcome to the ClearPoint frontend technical test. We like to keep things simple, yet clean so your
                            task(s) are as follows:
                            <br />
                            <br />
                            <ol className="list-left">
                                <li>Add the ability to add (POST) a Todo Item by calling the backend API</li>
                                <li>
                                    Display (GET) all the current Todo Items in the below grid and display them in any order you wish
                                </li>
                                <li>
                                    Bonus points for completing the 'Mark as completed' button code for allowing users to update and mark
                                    a specific Todo Item as completed and for displaying any relevant validation errors/ messages from the
                                    API in the UI
                                </li>
                                <li>Feel free to add unit tests and refactor the component(s) as best you see fit</li>
                            </ol>
                        </Alert>
                    </Col>
                </Row>
                <Row>
                    <Col><AddToDoItem onItemAdded={() => getItems()} /></Col>
                </Row>
                <br />
                <Row>
                    {loading && <CircularProgress size={20} />}
                </Row>
                <Row>
                    {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {error}
                    </div>}
                </Row>
                <Row>
                    <Col><ToDoItemsList items={items} handleRefresh={() => getItems()} /></Col>
                </Row>
            </Container>
            <footer className="page-footer font-small teal pt-4">
                <div className="footer-copyright text-center py-3">
                    © 2021 Copyright:
                    <a href="https://clearpoint.digital" target="_blank" rel="noreferrer">
                        clearpoint.digital
                    </a>
                </div>
            </footer>
        </div>
    )
}

export default App
