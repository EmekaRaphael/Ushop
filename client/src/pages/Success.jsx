import React from 'react'
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { mobile } from "../responsive"


const Container = styled.div`
`
const Wrapper = styled.div`
  padding: 20px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30vh;
  gap: 15px;
  ${mobile({ padding: "10px" })};
`

const Title = styled.h1`
    padding-top: 10px;
    font-size: 1.6rem;
    font-weight: 300;
    text-align: center;
`
const Text = styled.div`
    padding: 15px;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const PaymentInfo = styled.p`
    margin: 5px;
`

const Button = styled.button`
  padding: 10px;
  margin: 10px 0;
  font-weight: 600;
  cursor: pointer;
  border-radius: 4px;
  border: ${ props => props.type === "filled" && "none"};
  background-color: ${ props => props.type === "filled" ? "#2c2c2c" : "transparent"};
  color: ${ props => props.type === "filled" && "white"};
  transition: all 0.5s ease;

  &:hover {
    background-color: ${ props => props.type === "filled" ? "#1976d2" : "#e2e2e2" };
  }
`

const Success = () => {
    const location = useLocation();
    const { stripeData, products} = location.state || {};

    return (
        <Container>
            <Announcement />
            <Navbar />
            <Wrapper>
                <Title>
                    <h1>Payment Successful 🎉</h1>
                </Title>
                <Text>
                    {stripeData && products ? (
                        <div>
                            <PaymentInfo>
                                <p><strong>Transaction ID:</strong> {stripeData.id}</p>
                            </PaymentInfo>
                            <PaymentInfo>
                                <p><strong>Amount:</strong> ${(stripeData.amount / 100).toFixed(2)}</p>
                            </PaymentInfo>
                            <PaymentInfo>
                                <p><strong>Items:</strong> {products.products?.length || 0}</p>
                            </PaymentInfo>
                        </div>
                    ) : (
                            <p style={{ color: "red" }}>Missing payment information...</p>
                        )
                    }
                </Text>
                <Link to="/">
                    <Button>CONTINUE SHOPPING</Button>
                </Link>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    );
}

export default Success;





// return (
    //     <Container></Container>
    //     <div style={{ padding: '2rem' }}>
    //       <h1>Payment Successful 🎉</h1>
    //       {stripeData && products ? (
    //         <div>
    //           <p><strong>Transaction ID:</strong> {stripeData.id}</p>
    //           <p><strong>Amount:</strong> ${(stripeData.amount / 100).toFixed(2)}</p>
    //           <p><strong>Items:</strong> {products.products?.length || 0}</p>
    //         </div>
    //       ) : (
    //         <p>Missing payment information.</p>
    //       )}
    //     </div>
    // );