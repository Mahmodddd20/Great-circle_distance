import React, { useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import data from './partners.json';
import {Col, Form, Row, Table} from 'react-bootstrap';

function App() {
    const {greatCircleDistance} = require("great-circle-distance");
    const [limit, setLimit] = useState('99999999');


    function getDistanse(num) {
        num = num.split(',');

        let coords = {
            lat1: "51.5144636",
            lng1: "-0.142571",
            lat2: num[0],
            lng2: num[1]
        };
        return parseInt(greatCircleDistance(coords));

    }

    function dynamicSort(property) {
        return function (a, b) {
            let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result;
        }
    }

    function show(id) {
        let temp = ' d-none ';
        data.map((data) => {
            if (data.id == id) {
                data.offices.map((data2) => {
                    if (getDistanse(data2.coordinates) <= limit) {
                        console.log(getDistanse(data2.coordinates))
                        temp = ' '

                        return temp;
                    }
                })

            }
        })
        return temp;

    }

    let sortedData = data.sort(dynamicSort('organization'))

    const newData = sortedData.map((data) => {
        return (
            <tr key={data.id} className={show(data.id)}>
                <td>
                    {data.organization}
                </td>
                <td>

                    {data.offices.map((dataItem) => {

                        return (
                            <span key={dataItem.coordinates}>
                                {dataItem.location}<br/>
                            </span>
                        )
                    })}
                </td>

            </tr>
        )
    })

    function handleChange(event) {
        if (event.target.value == '') {
            setLimit('99999')
        } else {
            setLimit(event.target.value)

        }
    }

    return (
        <div className="container mt-2">
            <Form.Group as={Row} controlId="filter">
                <Form.Label column sm="2">Filter The Results </Form.Label>
                <Col sm="10">
                    <Form.Control id='filter' onChange={handleChange}/>
                </Col>

            </Form.Group>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Company Name</th>
                    <th>addresses</th>
                </tr>
                </thead>
                <tbody>

                {newData}
                </tbody>

            </Table>
        </div>
    );
}

export default App;
