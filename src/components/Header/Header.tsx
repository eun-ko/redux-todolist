import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 52px;
  padding: 13px 255px 13px 12px;
  border-bottom: 1px solid #e5e5e5;
`;

const Title = styled.p`
  font-size: 21px;
`;

interface IProps {
  text: string;
}

const Header: React.FC<IProps> = ({ text }) => {
  return (
    <Wrapper>
      <Title>{text}</Title>
    </Wrapper>
  );
};
export default Header;
