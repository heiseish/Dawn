declare namespace news {
	declare interface article {
		source: { 
			id: string, 
			name: string 
		},
		author: string,
		title: string,
		description: string,
		url: string,
		urlToImage: string,
		publishedAt: string,
		content: string
	}

	declare interface responseObject {
		totalResults: number,
		articles: article[]
	}
}