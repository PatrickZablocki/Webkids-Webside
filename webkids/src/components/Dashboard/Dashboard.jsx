import dash from './dash.module.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Navbar from '../Navbar'



export default function Dashboard() {
    return (
        <>
            <Navbar />
            <div>
                <InputGroup className={dash.main} >
                    <Button variant="primary">Add Photo/Video</Button>
                    <Form.Control
                        placeholder="What's on your mind?"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-secondary" id="button-addon2">
                        Post
                    </Button>
                </InputGroup>
            </div>
        </>
    )
}
