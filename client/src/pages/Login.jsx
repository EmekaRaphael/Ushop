import styled from "styled-components"
import { mobile } from "../responsive"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5), 
    rgba(255, 255, 255, 0.5)
    ),
    url("https://res.cloudinary.com/do8kn4hqh/image/upload/v1734649927/shopping_jexscy.jpg") 
    center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  ${mobile({ width: "75%"})};
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
`
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 3px;
`

const Button =  styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  border-radius: 3px;
  margin-bottom: 10px;
  &:disabled{
    color: green;
    cursor: not-allowed;
  }
`
const Link = styled.a`
  margin: 5px 0;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`
const Error = styled.span`
  color: red;
`

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {isFetching, error} = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, {username, password});
  }

  return (
    <Container>
      <Wrapper>
          <Title>SIGN IN</Title>
          <Form>
              <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
              <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
              <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
              {error && <Error>Something went wrong...</Error>}
              <Link>FORGOT PASSWORD?</Link>
              <Link>CREATE NEW ACCOUNT</Link>
          </Form>
      </Wrapper>
    </Container>
  )
}

export default Login