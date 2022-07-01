import { gql } from "@apollo/client";

export const showSynopsisDetail = gql`
	query showSynopsisDetail($id: ID!) {
		showSynopsisDetail(id: $id) {
			id
			poster
			title
			summary
			description
			commentsCount
			srcIsLiked
			srcLikeCount
			srcId
			text
			previewUrl
			note
			updatedAt
			authorId
			actors
			writers
			tips
			viewCount
			hasAudio
			latestPayment
			SynopsisComment 
		}
	}
`;
