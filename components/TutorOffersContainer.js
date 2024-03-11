import React, { useEffect, useState } from 'react';


function cap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const MyOffers = ({ tutorid }) => {
  const [offers, setOffers] = useState([]);
 


  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await fetch(`/api/TutorOffers?tutorId=${tutorid}`);
      const data = await response.json();
      setOffers(data);
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  const handleAcceptOffer = async (offerId, studentId, tutorId) => {
    try {
      const response = await fetch(`/api/AcceptOffers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ offerId, studentId, tutorId }),
      });
      const data = await response.json();
      console.log(data);
      fetchOffers();
    } catch (error) {
      console.error('Error accepting offer:', error);
    }
  };
  

  const handleRejectOffer = async (offerId) => {
    try {
      const response = await fetch(`/api/RejectOffers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ offerId }),
      });
      const data = await response.json();
      console.log(data);
      fetchOffers();
     
    } catch (error) {
      console.error('Error rejecting offer:', error);
    }
  };

  return (
    <div>
      <h2>My Offers</h2>
      {offers.map((offer) => (
        <div key={offer.OFFER_ID} >
          {/* Render offer details here */}
           <img src={offer.IMAGE} alt="Image" />
          <h3> Name: {cap(offer.NAME)} </h3>
          <p> {cap(offer.CLASS)} </p> 
          <p> Institution: {cap(offer.INSTITUTION)} </p>
          <p> Subject: {cap(offer.SUBJECTS)} </p>
          <p> Days per Week: {offer.DAYS_PER_WEEK} </p>
          <p> Tuition Type: {offer.TUITION_TYPE}</p>
          {offer.NOTE ? <p> Note: {cap(offer.NOTE)}</p> : null}




          <button onClick={() => handleAcceptOffer(offer.OFFER_ID, offer.STUDENT_ID, offer.TUTOR_ID)}>Accept</button>

          <button onClick={() => handleRejectOffer(offer.OFFER_ID)}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default MyOffers;
