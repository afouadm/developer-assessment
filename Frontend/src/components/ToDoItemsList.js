import { useState } from 'react';
import { Button, Table } from 'react-bootstrap'

const ToDoItemsList = (props) => {
    const [error, setError] = useState(null);

    const handleMarkAsComplete = async (item) => {
        try {
            item.isCompleted = true;
            setError(null);
            const response = await fetch(`https://localhost:5001/api/todoitems/${item.id}`, {
                method: 'PUT',
                body: JSON.stringify(item),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            else {
                props.handleRefresh();
            }
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <>
            {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {error}
            </div>}
            <h1>
                Showing {props.items.length} Item(s){' '}
                <Button variant="primary" className="pull-right" onClick={props.handleRefresh}>
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
                    {props.items.map((item) => (
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