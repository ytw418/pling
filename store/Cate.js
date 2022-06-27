import { gql } from "@apollo/client";

export const showTabV2 = gql`
	query showTabV2($tabNo: Int, $page: Int) {
		showTabV2(tabNo: $tabNo, page: $page) {
			id
			title
			description
			typename
			numColumns
			unionList {
				__typename
				... on Synopsis {
					id
					poster
					subPoster
					title
					titleUrl
					description
					isAdult
					isOrigin
					text
					plinistId
					author {
						id
						name
						thumbnail
					}
					updatedAt
				}
				... on Story {
					id
					isLiked
					synopsisId
					synopsis {
						title
						isOrigin
						text
						plinistId
					}
					poster
					subtitle
					description
					displayGenre
					updatedAt
				}
				... on Plinist {
					id
					title
					titleUrl
					description
					text
					poster
					note
					channelName
					youtube
					thumbnail
					user {
						id
						name
						thumbnail
					}
					uploadedAt
				}
				... on Poll {
					id
					title
					reward
				}
				... on Category {
					id
					title
					description
					typename
					list
					numColumns
				}
				... on Product {
					id
					title
					titleUrl
					description
					text
					poster
					note
				}
				... on Event {
					id
					title
					titleUrl
					description
					text
					poster
					note
					url
					promo
					screen
					targetId
					color
					synopsis {
						title
					}
					synopsisId
				}
			}
		}
	}
`;
