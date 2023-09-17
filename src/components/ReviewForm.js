/*
Coding Steps:
- ReviewForm, which displays a form at the bottom of a movie component which then allows users to leave reviews. When submitted, the review should be added to the movie.
- All this data is to be stored in an array, no networking or database needed for this assignment
*/


import React, { useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ReactStars from './Stars';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";

//Adding an example so users can follow
export default function ReviewModal(props) {
    const [show, setShow] = useState(false);
    const [reviewList, setReviewList] = useState([
        {
            id: 1,
            name: 'Sam Smith',
            info: 'One of the best movies I have ever seen!',
            star: '5★',
        }
    ]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const name = useRef(null);
    const info = useRef(null);
    let starRating = [];

    const changedStarRating = (newStarRating) => {
        let newRating = `${newStarRating}★`;
        starRating.push(newRating);
    }

//Creating function to take new review and add to review list once submitted 
//Ensuring that form is cleared once review is submitted
    function saveNewReviewButton() {
        setReviewList(current => [...current, {
            name: name.current.value,
            info: info.current.value,
            star: starRating[starRating.length-1]
        }]);
        
        console.log(`Saved`);
        name.current.value = '';
        info.current.value = '';
        starRating = [];
    }

//Creating function to save all the reviews using the map function
//List of movies displayed in the MovieList Card component
    function AllReviews() {
        const itemList = reviewList.map((review) => (
            <>
                <ListGroup>
                    <ListGroupItem variant ='primary'>{review.info}</ListGroupItem>
                    <ListGroupItem>{review.star}</ListGroupItem>
                    <ListGroupItem>--{review.name}</ListGroupItem>
                </ListGroup>
            </>
        ));

        return (
            <div>
                {itemList}
            </div>
        );
    }

//Creating form to submit reviews using Modal React component
    return (
        <>
            <Button variant='dark' onClick={handleShow}>
                Review This Movie
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Review Form for {props.movieTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id='reviewForm'>
                        <Form.Group className='mb-3'>
                            <Form.Control ref={name} type='text' placeholder='Name' />
                        </Form.Group>
                        <Form.Group className='mb-4' controlId='exampleForm.ControlTextarea1'>
                            <Form.Control as='textarea' rows={5} placeholder='Please write your review here!' ref={info} />
                            <ReactStars count={5} size={28} onChange={changedStarRating} />
                        </Form.Group>
                    </Form>     
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant='primary' onClick={saveNewReviewButton}>
                        Submit Review
                    </Button>
                </Modal.Footer>

                <h3 className='text-center'>
                    <b><strong>Reviews</strong></b>
                </h3>
                <div>
                    <AllReviews key={reviewList.id} />
                </div>
            </Modal>
        </>
    );
}