import React, { Children, ReactNode, useState, useRef, useLayoutEffect } from 'react';
import {
  Flex,
  Box,
  Text
} from '@chakra-ui/react';
import { Direction, TouchListener } from './touch';

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



type LayoutProps = {
  children: ReactNode
}
function Layout({children}: LayoutProps) {
  const [page, setPage] = useState<number>(0);
  const [ primary, ...secondary ] = Children.toArray(children);
  const ref = useRef<HTMLDivElement>(null);

  const nPages = secondary.length;
  const offset = `-${page*100}%`;
  useLayoutEffect(() => {
    if(ref.current) {
      const listener = (evt: KeyboardEvent) => {
        console.log(evt);
        if(evt.code === 'ArrowLeft') {
          setPage((p: number) => (p-1+nPages) % nPages);
        } else if(evt.code === 'ArrowRight') {
          setPage((p: number) => (p+1+nPages) % nPages);
        }
      }
      window.addEventListener('keydown', listener);
      const touchListener = new TouchListener((dir: Direction) => {
        if(dir === 'left') {
          setPage((p: number) => p === nPages-1 ? p : p+1);
        } else if(dir === 'right') {
          setPage((p: number) => p === 0 ? p : p-1);
        }
      });
      touchListener.add(ref.current);
      return () => {
        console.log("removig listener...");
        if(ref.current) {
          touchListener.remove(ref.current);
        }
        window.removeEventListener('keydown', listener);
      }
    }
  }, []);
  return (
    <Flex
      direction='column'
      backgroundColor='red'
      h='100%'
      w={['100%', '25%']}
    >
      <Content>
        { primary }
      </Content>
      <Box
        position='relative'
        backgroundColor='yellow'
        overflow='hidden'
        flex='1'
        ref={ref}
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
          {
            secondary.map( (child, i) =>
              <Content key={i}>
                { child }
              </Content>
            )
          }
        </Flex>
      </Box>
    </Flex>
  );
}
function App() {
  return (
    <Layout>
      <Text> Hello </Text>
      <Box
        border='1px solid black'
        w='100%'
        h='100%'
      />
      <Text> Ding </Text>
      <Text> Dong </Text>
    </Layout>
  );
}

export default App;
