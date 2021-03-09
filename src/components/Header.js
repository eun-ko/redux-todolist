import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';

const Wrapper = styled.div`
height: 52px;
padding: 13px 255px 13px 12px;
border-bottom:1px solid #e5e5e5;
`;

const Title = styled.p`
font-size:21px;
`;

const Header = ({ text }) => {
    return (
        <Wrapper>
            <Title>{text}</Title>
        </Wrapper>
    )
}
export default Header;

Header.propTypes = {
    text: PropTypes.string
}

