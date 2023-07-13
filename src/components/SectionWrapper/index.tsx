import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, styled } from '@mui/material';

const Section = styled(Box)(
  ({ theme }) => `
        padding: 15px 40px 15px 40px;
`
);

interface SectionWrapperProps {
  children?: ReactNode;
}

const SectionWrapper: FC<SectionWrapperProps> = ({ children }) => {
  return <Section className="">{children}</Section>;
};

SectionWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default SectionWrapper;
