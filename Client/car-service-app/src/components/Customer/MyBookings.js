import React, { useEffect, useState } from "react";
import CustomerService from "../../services/customer/customer_service";
import AuthService from "../../services/customer/authentication/auth_service";
import "./CSS/MyBookings.css";
import { Card, Grid, CardContent, Dialog,  ButtonDialog, DialogTitle, DialogContent, DialogActions, TextField, Button  } from "@material-ui/core";

function MyBookings() {
  const [orders, setorders] = useState([]);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [review, setReview] = useState("");
  const [currentOrderId, setCurrentOrderId] = useState("");


  useEffect(() => {
    const user = AuthService.getCurrentCustomer();
    CustomerService.findMyOrders(user.userId)
      .then((res) => {
        setorders(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const openReviewModel = (orderId) => {
    setOpenReviewModal(true);
    setCurrentOrderId(orderId);
  };

  const closeReviewModal = () => {
    setOpenReviewModal(false);
    setReview("");
  };

  const handleReviewSubmit = () => {
    CustomerService.updateOrder(currentOrderId, review)
      .then((res) => {
        console.log(res);
        closeReviewModal();
      })
      .catch((err) => {
        console.log(err);
      });
      window.location.reload();
  };
  const getOrderCards = (order) => {
    return (
      <Grid item key={order._id}>
        <Card variant="outlined" className="service_card">
          <CardContent className="mybooking">
            <h1>Status comanda: {order.status}</h1>
            <hr />
            <h4>Masina : {order.carName}</h4>
            <h4>Nr. Auto: {order.carNumber}</h4>
            <h4>Adresa: {order.custAddress}</h4>
            <h4>Serviciu: {order.serviceName}</h4>
            <h4>Pret: {order.servicePrice}</h4>
            <h4>Review: {order.review ? order.review : "-"}</h4>
            {order.status === "Finalizat" && <Button
              fullWidth
              variant="contained"
              color="primary"
              className="order_button"
              onClick={() => openReviewModel(order._id)}
            >
              {order.review ? "Modifica Review" : "Adauga Review"}
            </Button>}
          </CardContent>
        </Card>
      </Grid>
    );
  };
  return (
    <div className="container">
      <h1 className="summary_title">Comenzile mele</h1>
      {orders ? (
        <Grid container spacing={4} className="grid-bookings">
          {orders.map((order) => getOrderCards(order))}
        </Grid>
      ) : (
        <div>
          <br />
          <h1 className="summary_title">Nu ai comenzi.</h1>
        </div>
      )}
       <Dialog open={openReviewModal} onClose={closeReviewModal}>
        <DialogTitle>Adauga Review</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Review"
            type="text"
            fullWidth
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeReviewModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleReviewSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MyBookings;
