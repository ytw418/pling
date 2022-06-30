import { gql } from "@apollo/client";

export const fetchStories = gql`
	query fetchStories(
		$synopsisId: Int!
		$skip: Int
		$take: Int
		$orderBy: StoryOrderByInput
	) {
		fetchStories(
			synopsisId: $synopsisId
			skip: $skip
			take: $take
			orderBy: $orderBy
		) {
			id
			poster
			subtitle
			description
			synopsisId
			rating
			poster
			displayGenre
			audio {
				unit
			}
		}
	}
`;
