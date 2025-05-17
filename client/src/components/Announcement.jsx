import styled from 'styled-components'

const Container = styled.div`
    height: 30px;
    background-color: #38b6ff;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
`

const Announcement = () => {
  return (
    <div>
      <Container>
        Super Deal! Free Shipping on Orders Above $50.
      </Container>
    </div>
  )
}

export default Announcement
