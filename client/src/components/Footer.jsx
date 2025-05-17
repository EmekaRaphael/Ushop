import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, X } from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 30px;
`;
const Logo = styled.img`
  width: 250px;
  cursor: pointer;
  transition: all 0.5s ease;
  ${mobile({ width: "170px" })};
`;
const Desc = styled.p`
  margin: 10px 0;
  padding-right: 10%;
  color: #2c2c2c;
`;
const SocialContainer = styled.div`
  display: flex;
  margin: 10px 0;
`;
const SocialIcon = styled.div`
  width: 60px;
  height: 60px;
  color: #2c2c2c;, cursor:"pointer";
  transition: all 0.5s ease;

  &:hover {
    color: #1976d2;
  }
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;
const Title = styled.h3`
  margin-bottom: 30px;
  color: #2c2c2c;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  color: #2c2c2c;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    color: #1976d2;
  }
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  color: #2c2c2c;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    color: #1976d2;
  }
`;
const LocationItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  color: #2c2c2c;
`;
const Payment = styled.img`
  width: 50%;
`;


const Footer = () => {
  return (
    <Container>
      <Left>
        <Link to="/">
          <Logo src="https://res.cloudinary.com/do8kn4hqh/image/upload/v1734734826/Group_370_c2ixxz.png"/>
        </Link>
        <Desc>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Desc>
        <Desc>WittyUnlimited ©</Desc>
        <SocialContainer>
          <SocialIcon>
            <Facebook style={{fontSize:"30px", cursor:"pointer"}}/>
          </SocialIcon>
          <SocialIcon>
            <Instagram style={{fontSize:"30px", cursor:"pointer"}}/>
          </SocialIcon>
          <SocialIcon>
            <X style={{fontSize:"30px", cursor:"pointer"}}/>
          </SocialIcon>
          <SocialIcon>
            <Pinterest style={{fontSize:"30px", cursor:"pointer"}}/>
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wish List</ListItem>
          <ListItem>Terms & Condition</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
          <ContactItem>
            <Phone style={{marginRight:"10px", cursor:"pointer"}}/> +234 905 9399 253
          </ContactItem>
          <ContactItem>
            <MailOutline style={{marginRight:"10px", cursor:"pointer"}}/> emekaraphael13@gmail.com
          </ContactItem>
          <LocationItem>
            <Room style={{marginRight:"10px"}}/> Lagos, Nigeria
          </LocationItem>
          <Payment src="https://res.cloudinary.com/do8kn4hqh/image/upload/v1729875334/secure-stripe-payment-logo-e1649109826843_yh0gsc.png"/>
      </Right>
    </Container>
  )
}

export default Footer