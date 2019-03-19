declare type CFRanking = {
	rating: number | null,
	rank: number | null
}

declare type CFUser = {
	handle: string, 
	standing: CFRanking
}