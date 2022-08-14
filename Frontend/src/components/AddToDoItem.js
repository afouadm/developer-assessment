import { CircularProgress } from '@material-ui/core';
import { useCallback, useState } from 'react';
import { Button, Container, Row, Col, Form, Stack } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const AddToDoItem = () => {
    const [description, setDescription] = useState('');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    function handleClear() {
        setDescription('');
        setError(null);
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleAdd = async () => {
        try {
            setError(null);
            setSaving(true);
            const response = await fetch('https://localhost:5001/api/todoitems/', {
                method: 'POST',
                body: JSON.stringify({ description: description.trim(), isCompleted: false }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            else {
                handleClear();
            }
        } catch (error) {
            setError(error.message);
        }
        setSaving(false);
    };

    return (
        <Container>
            <h1>Add Item</h1>
            {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {error}
            </div>}
            <Form.Group as={Row} className="mb-3" controlId="formAddTodoItem">
                <Form.Label column sm="2">
                    Description
                </Form.Label>
                <Col md="6" >
                    <Form.Control
                        type="text"
                        placeholder="Enter description..."
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </Col>
                <div className='col-sm-2'>{saving && <CircularProgress size={20} />}</div>
            </Form.Group>
            <Form.Group as={Row} className="mb-3 offset-md-2" controlId="formAddTodoItem">
                <Stack direction="horizontal" gap={2}>
                    <Button variant="primary" disabled={!description || !description.trim()} onClick={() => handleAdd()}>
                        Add Item
                    </Button>
                    <Button variant="secondary" onClick={() => handleClear()}>
                        Clear
                    </Button>
                </Stack>
            </Form.Group>
        </Container>
    )
}

export default AddToDoItem;