import { Button, Table } from 'react-bootstrap'

const ToDoItemsList = (props) => {

    async function getItems() {
        try {
            alert('todo')
        } catch (error) {
            console.error(error)
        }
    }

    async function handleMarkAsComplete(item) {
        try {
            alert('todo')
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <h1>
                Showing {props.items.length} Item(s){' '}
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