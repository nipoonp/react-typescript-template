import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import LoaderWidget from '../../components/Loader';
import logo from '../../assets/images/logo.png';
import { useAPI } from '../../context/api-context';

export const Login = () => {
    const history = useHistory();
    const { setIsUserLoggedIn, loginUser, refreshToken } = useAPI();
    const [showSpinner, setShowSpinner] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        (async function token() {
            try {
                await refreshToken();

                redirectUser();
            } catch (e) {
                console.log(e.message);
            }
        })();
    }, []);

    const redirectUser = () => {
        setIsUserLoggedIn(true);
        history.replace("/")
    }


    const handleValidSubmit = async (event: any, values: any) => {
        setShowSpinner(true);
        try {
            let res = await loginUser(values.username, values.password);
            console.log(res);

            if (res.error) {
                throw Error(res.data.error);
            } else {
                redirectUser();
            }
        } catch (e) {
            setError(e.message);
            console.log("onError", e);
            // console.log("message ", e.message);
            // console.log("status ", e.response.status);
        } finally {
            setShowSpinner(false);
        }
    };

    return (
        <>
            <div className="account-pages mt-5 mb-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={5}>
                            <Card>
                                <div className="card-header pt-4 pb-4 text-center bg-primary">
                                    <Link to="/">
                                        <span>
                                            <img src={logo} alt="" height="18" />
                                        </span>
                                    </Link>
                                </div>

                                <CardBody className="p-4 position-relative">
                                    {/* preloader */}
                                    {showSpinner && <LoaderWidget />}

                                    <div className="text-center w-75 m-auto">
                                        <h4 className="text-dark-50 text-center mt-0 font-weight-bold">
                                            Sign In
                                                </h4>
                                        <p className="text-muted mb-4">
                                            Enter your username and password to access admin panel.
                                                </p>
                                    </div>

                                    {error && (
                                        <Alert color="danger" isOpen={error ? true : false}>
                                            <div>{error}</div>
                                        </Alert>
                                    )}

                                    <AvForm onValidSubmit={handleValidSubmit}>
                                        <AvField
                                            name="username"
                                            label="Username"
                                            placeholder="Enter your username"
                                            required
                                        />

                                        <AvGroup>
                                            <Label for="password">Password</Label>
                                            <AvInput
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="Enter your password"
                                                required
                                            />
                                            <AvFeedback>This field is invalid</AvFeedback>
                                        </AvGroup>

                                        <FormGroup>
                                            <Button color="success">Submit</Button>
                                        </FormGroup>
                                    </AvForm>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}