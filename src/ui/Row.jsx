import styled, { css } from "styled-components";

const Row = styled.div`
  ${(props) =>
    props.type === "horizontal" &&
    css`
      align-items: center;
      justify-content: space-between;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}

  display: flex;
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
