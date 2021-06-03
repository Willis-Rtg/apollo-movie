import React from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Movie from "../components/Movie";

const GET_MOVIES = gql`
  {
    Movies {
      id
      title
      medium_cover_image
      isLiked @client
    }
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Header = styled.div`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  height: 45vh;
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Loading = styled.div``;
const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
`;
const SubTitle = styled.h3`
  font-size: 35px;
`;
const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @media only screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 376px) {
    grid-template-columns: repeat(1, 1fr);
  }
  /* justify-content: center; */
  grid-gap: 25px;
  width: 60%;
  position: relative;
  top: -50px;
`;

const Home = () => {
  const { loading, data } = useQuery(GET_MOVIES);
  return (
    <Container>
      <Header>
        <Title>Apollo movie</Title>
        <SubTitle>Sub title</SubTitle>
      </Header>
      {loading && <Loading>Loading...</Loading>}
      {data?.Movies && (
        <Movies>
          {data.Movies.map((movie, index) => (
            <Movie
              key={index}
              id={movie.id}
              title={movie.title}
              isLiked={movie.isLiked}
              medium_cover_image={movie.medium_cover_image}
            />
          ))}
        </Movies>
      )}
    </Container>
  );
};

export default Home;
