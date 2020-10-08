import React, { useState } from 'react';
import styled from 'styled-components';
import SingleCarousel from './SingleCarousel';

const Layout = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-bottom: 50%;
`;

const LayoutInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  & > * {
    width: 100%;
    height: 100%;
  }
`;

export default {
  component: SingleCarousel,
  title: 'SingleCarousel',
  argTypes: {
    onSelect: { type: { name: 'function', required: true } },
    selected: { type: 'number' }
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => <Layout><LayoutInner><Story /></LayoutInner></Layout>
  ]
};

const ImageItem = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  background-image: url(${props => props.image});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`;

const ButtonRow = styled.div`
  position: absolute;
  left: 48px;
  bottom: 32px;

  display: flex;
  flex-direction: row;

  & button {
    margin: 8px;
    padding: 8px 16px;
    font-size: 14px;
    line-height: calc(16 / 14);

    border: 0 none;
    background: white;
    border-radius: 32px;

    box-shadow:
      0px 1px 4px 0px rgb(133 153 160 / 0.3),
      0 0 12px -4px rgb(133 153 160 / 50%);
    
    &:hover {
      cursor: pointer;
    }
  }
`;

const Item = ({ image }) => ( // eslint-disable-line react/prop-types
  <ImageItem image={image}>
    <ButtonRow>
      <button type="button">Watch</button>
      <button type="button">Purchase</button>
    </ButtonRow>
  </ImageItem>
);

const Template = args => {
  const [selected, setSelected] = useState(0);

  const onSelect = (newSelected) => {
    setSelected(newSelected);
    args.onSelect?.(newSelected);
  };

  return <SingleCarousel selected={selected} {...args} onSelect={onSelect} />;
};

export const Default = Template.bind({});
Default.args = {
  children: [
    <Item key="A" image="https://images.unsplash.com/photo-1596910547037-846b1980329f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />,
    <Item key="B" image="https://thoughtcatalog.com/wp-content/uploads/2015/06/michaelscott_theoffice.jpeg" />,
    <Item key="C" image="https://m.media-amazon.com/images/M/MV5BNDUwNjBkMmUtZjM2My00NmM4LTlmOWQtNWE5YTdmN2Y2MTgxXkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_UX477_CR0,0,477,268_AL_.jpg" />
  ]
};
