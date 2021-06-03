import React from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import Movie from "../components/Movie";

const GET_MOVIE = gql`
  query Movie($id: ID!) {
    Movie(id: $id) {
      id
      title
      rating
      medium_cover_image
      description_intro
      language
      isLiked @client
    }
    Suggestions(id: $id) {
      id
      medium_cover_image
      isLiked @client
    }
  }
`;

const DetailWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  @media only screen and (max-width: 376px) {
    height: auto;
  }
`;
const Title = styled.h1`
  font-size: 35px;
  font-weight: 600;
  color: white;
  text-align: center;
  margin-bottom: 40px;
`;
const Content = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  /* color: white; */
  align-items: flex-start;
  margin-bottom: 50px;
  @media only screen and (max-width: 1000px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SubTitle = styled.div`
  display: flex;
  font-size: 20px;
  margin-bottom: 10px;
`;
const Description = styled.div`
  width: 80%;
`;
const SuggestionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SuggestionTitle = styled.div`
  font-size: 1.5rem;
  color: white;
  margin-bottom: 20px;
`;
const Suggestions = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  @media only screen and (max-width: 770px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 360px) {
    grid-template-columns: repeat(1, 1fr);
  }
  Img {
    width: 170px;
  }
`;

const Detail = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, { variables: { id } });

  return (
    <DetailWrapper>
      <Title>{loading ? "Loading..." : data?.Movie.title}</Title>
      {data && (
        <>
          <Content>
            <Info>
              <SubTitle>
                {data?.Movie.language.charAt(0).toUpperCase() +
                  data?.Movie.language.slice(1)}{" "}
                · {data?.Movie.rating}
              </SubTitle>
              <Description>{data?.Movie.description_intro}</Description>
            </Info>
            <Movie
              id={id}
              medium_cover_image={data?.Movie.medium_cover_image}
              isLiked={data?.Movie.isLiked}
            />
          </Content>
          <SuggestionsWrapper>
            <SuggestionTitle>Suggstions</SuggestionTitle>
            <Suggestions>
              {data &&
                data?.Suggestions.map((suggestion) => (
                  <Movie
                    medium_cover_image={suggestion.medium_cover_image}
                    isLiked={suggestion.isLiked}
                    id={suggestion.id}
                  />
                ))}
            </Suggestions>
          </SuggestionsWrapper>
        </>
      )}
    </DetailWrapper>
  );
};

export default Detail;
