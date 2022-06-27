import { gql } from "@apollo/client";

export const fetchSlideItems = gql`
	query fetchSlideItems($tabNo: Int!) {
		fetchSlideItems(tabNo: $tabNo) {
			__typename
			... on Poll {
				id
				title
				titleUrl
				description
				text
				poster
				note
				reward
			}
			... on Category {
				id
				title
				titleUrl
				description
				text
				poster
				note
			}
			... on Synopsis {
				id
				title
				titleUrl
				description
				text
				poster
				note
				srcId
				isOrigin
				author {
					id
					name
					thumbnail
				}
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
				user {
					id
					name
					thumbnail
				}
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
				model
				targetId
				color
			}
		}
	}
`;
