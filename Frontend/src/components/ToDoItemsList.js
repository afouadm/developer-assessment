import { CircularProgress } from '@material-ui/core';
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'

const ToDoItemsList = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);

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

    const handleMarkAsComplete = (item) => {
        try {
            alert('todo')
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <h1>
                {loading && <CircularProgress size={20} />}
                Showing {items.length} Item(s){' '}
                <Button variant="primary" className="pull-right" onClick={() => getItems()}>
                    Refresh
                </Button>
            </h1>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.description}</td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => handleMarkAsComplete(item)}>
                                    Mark as completed
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default ToDoItemsList;