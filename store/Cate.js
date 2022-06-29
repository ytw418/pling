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
					text
					updatedAt
					srcId
					srcIsLiked
				}
				... on Story {
					id
					synopsisId
					# __ref:Synopsis:몇번 (아이디가 있는 경우)
					synopsis {
						id
						title
						isOrigin
						text
						srcId
						srcIsLiked
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
