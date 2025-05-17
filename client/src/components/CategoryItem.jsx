import styled from "styled-components"
import { mobile } from "../responsive"
import { Link } from "react-router-dom";


const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  transition: all 0.5s ease;
  ${mobile({ height: "70vh" })}
`;

const Container = styled.div`
  padding-top: 30px;
  flex: 1;
  margin: 10px;
  height: 70vh;
  position: relative;

  &:hover ${Image}{
    transform: scale(1.05);
  }
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  color: #2c2c2c;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: 2px solid #2c2c2c;
  border-radius: 5px;
  padding: 10px;
  background-color: transparent;
  color: #2c2c2c;
  cursor: pointer;
  font-weight: 900;
  transition: all 0.5s ease;

  &:hover {
    color: white;
    background-color: #2c2c2c;
    border: 2px solid #2c2c2c;
  }
`;

const CategoryItem = ({item}) => {
  return (
    <div>
        <Container>
          <Link to={`/products/${item.cat}`}>
            <Image src={item.img}/>
            <Info>
              <Title>{item.title}</Title>
              <Button>SHOP NOW</Button>
            </Info>
          </Link>
        </Container>
    </div>
  )
}

export default CategoryItem