import styled from "styled-components"
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import { Add, Remove } from "@mui/icons-material"
import { mobile } from "../responsive"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import StripeCheckout from "react-stripe-checkout"

const KEY = import.meta.env.VITE_STRIPE_KEY;



const Container = styled.div`
`
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })};
`

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`
const TopButton = styled.button`
  padding: 10px;
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
const TopTexts = styled.div`
  ${mobile({ display: "none" })};
`
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
  transition: all 0.5s ease;

  &:hover {
    color: #1976d2;
  }
`
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })};
`

const Info = styled.div`
  flex: 3;
`
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })};
`

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`

const Image = styled.img`
  width: 200px;
`
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const ProductName = styled.span``
const ProductId = styled.span``
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${ props => props.color}
`
const ProductSize = styled.span``

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })};
`
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })};
`
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin: 25px 0 25px 25px;
`

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 20px 20px 0;
  height: 50vh;
`
const SummaryTitle = styled.h1`
  font-weight: 200;
`
const SummaryItem = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${ props => props.type === "total" && "500"};
  font-size: ${ props => props.type === "total" && "24px" };
`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #2c2c2c;
  color: white;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.5s ease;
  border: none;

  &:hover {
    background-color: #1976d2;
  }
`


const Cart = () => {
  const cart = useSelector(state => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const shippingFee = 5.99;
  const discount = 0;

  const onToken = (token) => {
    setStripeToken(token);
  }

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100 + shippingFee * 100 - discount * 100,
        });
        // Navigate to success page
        navigate("/success", {
          state: {
            stripeData: res.data,
            products: cart,
          }
        });
      } catch (err) {
        console.error(err);
      }
    };

    if (stripeToken) {
      makeRequest();
      setStripeToken(null);
    } 
  }, [stripeToken, cart, navigate]);


  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag (2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <StripeCheckout 
            name="U-shop" 
            image="https://res.cloudinary.com/do8kn4hqh/image/upload/v1744754248/Logo_gwnl8p.png"
            billingAddress
            shippingAddress
            description={`Your total is $${cart.total + shippingFee - discount}`}
            amount={cart.total * 100 + shippingFee * 100 - discount * 100}
            token={onToken}
            stripeKey={KEY}    
          >
            <TopButton type="filled">CHECKOUT NOW</TopButton>
          </StripeCheckout>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product, index)=>(
              <Product key={product._id || index}>
                <ProductDetail>
                  <Image src={product.img}/>
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color}/>
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove />
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal:</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping Fee:</SummaryItemText>
              <SummaryItemPrice>$ {shippingFee}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Discount:</SummaryItemText>
              <SummaryItemPrice>$ {discount}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total:</SummaryItemText>
              <SummaryItemPrice>$ {cart.total + shippingFee - discount}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout 
              name="U-shop" 
              image="https://res.cloudinary.com/do8kn4hqh/image/upload/v1744754248/Logo_gwnl8p.png"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total + shippingFee - discount}`}
              amount={cart.total * 100 + shippingFee * 100 - discount * 100}
              token={onToken}
              stripeKey={KEY}    
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Cart