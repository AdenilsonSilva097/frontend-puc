import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: white;
  width: 270px;
  border-radius: 8px;
  border: 1px solid #D7D7D7;
  right: 25px;
  top: 60px;
  overflow: hidden;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
  padding-bottom: 10px;
  line-height: 15px;
  border-bottom: solid 0.5px lightgray;
  width: 100%;
  margin-bottom: 10px;

  > :first-child {
    font-weight: bold;
  }

  > :last-child {
    font-size: 13px;
  }
`;

export { Container, UserInfo };
