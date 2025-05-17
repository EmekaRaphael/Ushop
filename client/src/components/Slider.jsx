import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material'
import { useState } from 'react'
import styled from 'styled-components'
import { sliderItems } from '../data'
import { mobile } from '../responsive'

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile({ display: "none" })}
`
const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${(props) => props.direction === "left" && "10px"};
    right: ${(props) => props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;
`

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${(props) => props.$slideIndex * -100}vw);
`
const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #${props=>props.$bg};
`
const ImgContainer = styled.div`
    height: 100%;
    flex: 1;
`
const Image = styled.img`
    margin: 10% 0 0 10%;
    height: 65%;
    border-radius: 15px;
    align-items: center;
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
`
const Title = styled.h1`
    color: #2c2c2c;
    font-size: 70px;
`
const Desc = styled.p`
    margin: 50px 0;
    color: #2c2c2c;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
`
const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    border: 2px solid #2c2c2c;
    background-color: transparent;
    cursor: pointer;
    border-radius: 7px;
    transition: all 0.5s ease;

    &:hover {
        color: #fff;
        background-color: #2c2c2c;
        border: solid 1px #2c2c2c;
    }
`

const Slider = () => {
    
    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = (direction) => {
        if(direction === 'left') {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
        }
    };

  return (
    <div>
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowLeftOutlined />
            </Arrow>
            <Wrapper $slideIndex={slideIndex}>
                {sliderItems.map(item=>(
                    <Slide $bg={item.bg} key={item.id} >
                        <ImgContainer>
                            <Image src={item.img} />
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>
                                {item.desc}
                            </Desc>
                            <Button>
                                SHOP NOW
                            </Button>
                        </InfoContainer>
                    </Slide>
                ))}
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowRightOutlined />
            </Arrow>
        </Container>
    </div>
  )
}

export default Slider;


// import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material'
// import { useState } from 'react'
// import styled from 'styled-components'
// import { sliderItems } from '../data'
// import { mobile } from '../responsive'

// const Container = styled.div`
//     width: 100%;
//     height: 100vh;
//     display: flex;
//     position: relative;
//     overflow: hidden;
//     ${mobile({ height: "50vh" })}
// `

// const Arrow = styled.div`
//     width: 50px;
//     height: 50px;
//     background-color: #fff7f7;
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     position: absolute;
//     top: 0;
//     bottom: 0;
//     left: ${(props) => props.direction === "left" && "10px"};
//     right: ${(props) => props.direction === "right" && "10px"};
//     margin: auto;
//     cursor: pointer;
//     opacity: 0.5;
//     z-index: 2;
//     ${mobile({ width: "30px", height: "30px" })}
// `

// const Wrapper = styled.div`
//     height: 100%;
//     display: flex;
//     transition: all 1.5s ease;
//     transform: translateX(${(props) => props.$slideIndex * -100}vw);
// `

// const Slide = styled.div`
//     width: 100vw;
//     height: 100vh;
//     display: flex;
//     align-items: center;
//     background-color: #${props => props.$bg};
//     ${mobile({ flexDirection: "column", height: "50vh" })}
// `

// const ImgContainer = styled.div`
//     height: 100%;
//     flex: 1;
//     ${mobile({ height: "50%", width: "50%" })}
// `

// const Image = styled.img`
//     margin: 10% 0 0 10%;
//     height: 65%;
//     border-radius: 15px;
//     align-items: center;
//     ${mobile({ margin: "5% 0 0 5%", height: "80%" })}
// `

// const InfoContainer = styled.div`
//     flex: 1;
//     padding: 50px;
//     ${mobile({ padding: "10px", textAlign: "center" })}
// `

// const Title = styled.h1`
//     color: #2c2c2c;
//     font-size: 70px;
//     ${mobile({ fontSize: "30px" })}
// `

// const Desc = styled.p`
//     margin: 50px 0;
//     color: #2c2c2c;
//     font-size: 20px;
//     font-weight: 500;
//     letter-spacing: 3px;
//     ${mobile({ margin: "20px 0", fontSize: "16px", letterSpacing: "1px" })}
// `

// const Button = styled.button`
//     padding: 10px;
//     font-size: 20px;
//     border: 2px solid #2c2c2c;
//     background-color: transparent;
//     cursor: pointer;
//     border-radius: 7px;
//     transition: all 0.5s ease;

//     &:hover {
//         color: #fff;
//         background-color: #2c2c2c;
//         border: solid 1px #2c2c2c;
//     }

//     ${mobile({ fontSize: "16px", padding: "8px" })}
// `

// const Slider = () => {
//     const [slideIndex, setSlideIndex] = useState(0);
//     const handleClick = (direction) => {
//         if (direction === 'left') {
//             setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
//         } else {
//             setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
//         }
//     };

//     return (
//         <div>
//             <Container>
//                 <Arrow direction="left" onClick={() => handleClick("left")}>
//                     <ArrowLeftOutlined />
//                 </Arrow>
//                 <Wrapper $slideIndex={slideIndex}>
//                     {sliderItems.map(item => (
//                         <Slide $bg={item.bg} key={item.id}>
//                             <ImgContainer>
//                                 <Image src={item.img} />
//                             </ImgContainer>
//                             <InfoContainer>
//                                 <Title>{item.title}</Title>
//                                 <Desc>
//                                     {item.desc}
//                                 </Desc>
//                                 <Button>
//                                     SHOP NOW
//                                 </Button>
//                             </InfoContainer>
//                         </Slide>
//                     ))}
//                 </Wrapper>
//                 <Arrow direction="right" onClick={() => handleClick("right")}>
//                     <ArrowRightOutlined />
//                 </Arrow>
//             </Container>
//         </div>
//     )
// }

// export default Slider