declare interface CodeforceRanking {
	rating: number | null;
	rank: number | null;
}

declare interface CodeforceUser {
	handle: string;
	standing: CodeforceRanking;
}
