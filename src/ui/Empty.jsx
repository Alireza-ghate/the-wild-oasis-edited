import styled from "styled-components";
const StyledErrorBox = styled.div`
  display: flex;
  justify-content: center;
`;
const ErrorMessage = styled.p`
  font-weight: 600;
  font-size: 2.4rem;
`;

function Empty({ resourceNmae }) {
  return (
    <StyledErrorBox>
      <ErrorMessage>No {resourceNmae} could be found.</ErrorMessage>
    </StyledErrorBox>
  );
}

export default Empty;
