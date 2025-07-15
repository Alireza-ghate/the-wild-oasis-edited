import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  // navigate function returned from useNavigate() can NOT be use in top lvl code always use it inside another function like useeffect fun or other callback fun
  const navigate = useNavigate();
  // 1) load the authenticated user
  const { isLoading, isAuthenticated } = useUser();
  // 3) if there is NO authenticated user, redirect to /login page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, navigate, isLoading]
  );

  // 2) while loading, show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4) if there is a authenticated user render the app (return this children)
  // children === app itself
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
