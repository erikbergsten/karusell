import React, { ReactNode, useState, useRef, useLayoutEffect } from 'react';
import {
  Flex,
  Box,
  Text
} from '@chakra-ui/react';

type ContentProps = {
  children?: ReactNode
}
function Content({children}: ContentProps){
  return (
    <Box
      flex='1'
    >
      { children }
    </Box>
  );
}
function App() {
  const nPages = 5;
  const [page, setPage] = useState<number>(0);
  const offset = `-${page*100}%`;
  useLayoutEffect(() => {
    const listener = (evt: KeyboardEvent) => {
      console.log(evt);
      if(evt.code === 'ArrowLeft') {
        setPage((p: number) => (p-1+nPages) % nPages);
      } else if(evt.code === 'ArrowRight') {
        setPage((p: number) => (p+1+nPages) % nPages);
      }
    }
    window.addEventListener('keydown', listener);
    return () => {
      console.log("removig listener...");
      window.removeEventListener('keydown', listener);
    }
  }, []);
  return (
    <Flex
      direction='column'
      backgroundColor='red'
      h='100%'
      w={['20%', '50%']}
    >
      <Box
        position='relative'
        backgroundColor='yellow'
        overflow='hidden'
        flex='1'
      >
        <Flex
          direction='row'
          w='300%'
          h='100%'
          backgroundColor='green'
          color='white'
          position='absolute'
          left={offset}
          transition='left 1s ease-in-out'
          top='0'
        >
          <Content>
            <Text w='100%' backgroundColor='yellow' color='blue'> Hello! </Text>
          </Content>
          <Content>
            <Text w='100%' backgroundColor='pink' color='blue'> Hello! </Text>
          </Content>
          <Content>
            <Box
              w='100%'
              h='100%'
              backgroundColor='cyan'
              border='1px solid black'
              boxSizing='border-box'
            />
          </Content>
        </Flex>
      </Box>
    </Flex>
  );
}

export default App;
