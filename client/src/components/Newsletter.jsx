import { Send } from "@mui/icons-material"
import styled from "styled-components"
import { mobile } from "../responsive"


const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Title = styled.h1`
  color: #2c2c2c;
  font-size: 70px;
`

const Desc = styled.div`
  color: #2c2c2c;
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center", fontSize: "18px", margin: "0px 30px 20px 30px" })}
`

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgrey;
  border-radius: 5px;
  ${mobile({ width: "80%" })}
`

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`

const Button = styled.button`
  flex: 1;
  border: 2px solid #2c2c2c;
  border-radius: 5px;
  background-color: transparent;
  color: #2c2c2c;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    border: 2px solid #2c2c2c;
    background-color: #2c2c2c;
    color: white;
  }
`

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates for your favorite products.</Desc>
      <InputContainer>
        <Input placeholder="Your email"/>
        <Button>
          <Send/>
        </Button>
      </InputContainer>
    </Container>
  )
}

export default Newsletter