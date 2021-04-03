import { React, useState, useEffect } from 'react'
import './Error.css';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { Container } from "react-bootstrap"

export default function Error() {
    return (
        <Container className="main">
            <div class="err">4</div>
            <i><FaRegQuestionCircle className="error-icon" /></i>
            <div class="err2">4</div>
            <div class="msg">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?<p>Let's go <a href="#">home</a> and try from there.</p></div>
        </Container>
    )
}