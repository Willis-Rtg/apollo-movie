import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const TOGGLE_LIKE = gql`
  mutation toggleLike($id: ID) {
    toggleLike(id: $id) @client
  }
`;

const MovieWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  transition: opacity 0.2s linear;
  &:hover {
    opacity: 0.7;
  }
  &:active {
    opacity: 1;
  }
  text-align: center;
  div {
    position: absolute;
    top: 10px;
    right: 25px;
    z-index: 2;
    font-size: 1.2rem;
  }
`;
const Poster = styled.img`
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 10px;
  outline: none;
`;

const Movie = ({ id, isLiked, medium_cover_image }) => {
  const [toggleLike] = useMutation(TOGGLE_LIKE, {
    variables: { id },
  });
  return (
    <MovieWrapper>
      <Link to={`/${id}`}>
        <Poster src={medium_cover_image} alt="movie" />
      </Link>
      <div onClick={toggleLike}>
        {isLiked ? (
          <FontAwesomeIcon icon={faHeart} />
        ) : (
          <FontAwesomeIcon icon={emptyHeart} />
        )}
      </div>
    </MovieWrapper>
  );
};

export default Movie;
