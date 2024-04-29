import { useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
import "./Home.css";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";

function Home() {
  const [code, setCode] = useState("");
  const [textData, setTextData] = useState("");
  const [clientCode, setClientCode] = useState("");
  const [loading, setLoading] = useState(false);

  const headers = {
    "Content-Type": "application/json",
  };

  const handleCopy = async (e) => {
    copy(textData);
    toast("Text copied to clipboard 🥳🥳");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/store`, {
      method: "POST",
      body: JSON.stringify({
        text: textData,
      }),
      headers: headers,
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      setCode(data.code);
      toast("Data uploaded ✈️✈️");
    }
    setLoading(false);
  };

  const handleGetText = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/retrieve/${clientCode}`,
      {
        method: "GET",
        header: headers,
      }
    );
    if (response.ok) {
      const data = await response.json();
      setTextData(data.text);
      toast("Data received 😍😍");
    } else if (response.status == 404) {
      toast("No Data found 😒");
    }
    setLoading(false);
  };

  return (
    <>
      <NavigationBar />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Form>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Paste anything & share anywhere"
                className="pasteContainer"
                value={textData}
                onChange={(event) => setTextData(event.target.value)}
              />
              <div className="mt-4">
                <Button type="submit" onClick={handleSubmit}>
                  Share
                </Button>
                {textData.length > 0 ? (
                  <Button onClick={handleCopy} style={{ marginLeft: "20px" }}>
                    Copy
                  </Button>
                ) : null}
              </div>

              <p className="mt-4" style={{ fontSize: "20px", color: "black" }}>
                Sharing Code:
                <b> {code}</b>
              </p>

              <Form.Control
                as="input"
                placeholder="Code"
                value={clientCode}
                onChange={(e) => setClientCode(e.target.value)}
                style={{ height: "50px" }}
              />
              <Button type="submit" onClick={handleGetText} className="mt-4">
                Get
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Modal show={loading} centered>
        <Modal.Header>
          <Modal.Title>Loading Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status"></Spinner>
              <p>Loading...</p>
            </div>
          ) : (
            <p>Content loaded successfully!</p>
          )}
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default Home;
