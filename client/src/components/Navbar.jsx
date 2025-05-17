import { Search, ShoppingCartOutlined, Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material'
import { Badge } from '@mui/material'
import styled from 'styled-components'
import {mobile} from "../responsive.js"
import { useState } from 'react'
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { logout } from "../redux/userRedux.js"
// import { emptyCart } from "../redux/cartRedux.js";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { publicRequest } from '../requestMethod.js'


const Container = styled.div`
    height: 60px;
    ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`
const Language = styled.div`
    font-size: 14px;
    cursor: pointer;
    color: #2c2c2c;
    transition: all 0.5s ease;
    ${mobile({ display: "none" })}


    &:hover {
        color: #1976d2;
    }
`;

const SearchContainer = styled.div`
    border: 0.5px solid lightgrey;
    border-radius: 5px;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`
const Input = styled.input`
    border: none;
    ${mobile({ width: "40px" })};
`;

const Center = styled.div`
    flex: 1;
    text-align: center;
`
const Logo = styled.img`
    width: 150px;
    cursor: pointer;
    transition: all 0.5s ease;
    ${mobile({ width: "110px" })}
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ justifyContent: "center"})}
`;

const MenuItem = styled.div`
    color: #2c2c2c;
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    transition: all 0.5s ease;
    ${mobile({ display: "none" })}


    &:hover {
        color: #1976d2;
    }
`;

const HamburgerMenu = styled.div`
    display: none;
    ${mobile({ display: "block", cursor: "pointer" })}
`;

const MobileMenu = styled.div`
    position: absolute;
    top: 50px;
    right: 0;
    width: 50%;
    background-color: white;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    z-index: 10;
`;

const CloseButton = styled.div`
  align-self: flex-end;
  margin-right: 10px;
  cursor: pointer;
`;

const MobileMenuItem = styled.div`
    font-size: 14px;
    color: #2c2c2c;
    margin: 10px 0;
    cursor: pointer;

    &:hover {
    color: #1976d2;
    }
`;


const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const quantity = useSelector(state=>state.cart.quantity);
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          // Call the API to clear the session on the server side
          await publicRequest.post("/users/logout");
      
          // Remove the token from localStorage
          localStorage.removeItem("jwtToken");

          // Dispatch logout action in redux to update the user state
          dispatch(logout());

          // Dispatch removeItem action to empty the cart
        //   dispatch(emptyCart()); // clears redux state
        //   localStorage.removeItem('cart');
      
          // Optionally, close the menu if open
          setMenuOpen(false);
      
          // Optionally, redirect the user to the homepage
          navigate('/');
        } catch (err) {
          console.error("Error logging out from API:", err);
        }
    };

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder="Search"/>
                        <Search style={{ color:"#2c2c2c", fontSize:"20px", padding:"0 5px 0 5px", cursor:"pointer", transition:"all 0.5s ease" }}/>
                    </SearchContainer>
                </Left>
                <Link to="/">
                    <Center>
                        <Logo src="https://res.cloudinary.com/do8kn4hqh/image/upload/v1734734826/Group_370_c2ixxz.png"/>
                    </Center>
                </Link>
                <Right>
                    {user ? (
                        <>
                        <Link to="/cart">
                            <MenuItem>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlined />
                            </Badge>
                            </MenuItem>
                        </Link>
                        <MenuItem>
                            <span style={{ verticalAlign: "middle" }}>
                            <img
                                src="https://mui.com/static/images/avatar/1.jpg" // or your own avatar
                                alt="user"
                                style={{
                                width: "24px",
                                height: "24px",
                                borderRadius: "50%",
                                marginRight: "8px",
                                verticalAlign: "middle"
                                }}
                            />
                            {user.username}
                            </span>
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            LOG OUT
                        </MenuItem>
                        </>
                    ) : (
                        <>
                        <Link to="/register" style={{ textDecoration: "none" }}>
                            <MenuItem>REGISTER</MenuItem>
                        </Link>
                        <Link to="/login" style={{ textDecoration: "none" }}>
                            <MenuItem>LOGIN</MenuItem>
                        </Link>
                        <Link to="/cart">
                            <MenuItem>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlined />
                            </Badge>
                            </MenuItem>
                        </Link>
                        </>
                    )}

                    <HamburgerMenu onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <CloseIcon /> : <MenuIcon />}
                    </HamburgerMenu>
                </Right>
            </Wrapper>
            {menuOpen && (
                <MobileMenu>
                    <CloseButton onClick={() => setMenuOpen(false)}>
                        <CloseIcon />
                    </CloseButton>
                    {user ? (
                    <>
                        <Link to="/cart" onClick={() => setMenuOpen(false)}>
                        <MobileMenuItem>
                            <Badge badgeContent={quantity} color="primary">
                            <ShoppingCartOutlined />
                            </Badge>
                        </MobileMenuItem>
                        </Link>
                        <MobileMenuItem onClick={handleLogout}>
                            LOG OUT
                        </MobileMenuItem>
                    </>
                    ) : (
                    <>
                        <Link to="/register" style={{ textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
                        <MobileMenuItem>REGISTER</MobileMenuItem>
                        </Link>
                        <Link to="/login" style={{ textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
                        <MobileMenuItem>LOGIN</MobileMenuItem>
                        </Link>
                        <Link to="/cart" onClick={() => setMenuOpen(false)}>
                        <MobileMenuItem>
                            <Badge badgeContent={quantity} color="primary">
                            <ShoppingCartOutlined />
                            </Badge>
                        </MobileMenuItem>
                        </Link>
                    </>
                )}
                </MobileMenu>
            )}
        </Container>
    );
};

export default Navbar