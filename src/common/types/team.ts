export type Team = {
	id: string;
	name: string;
	role: TeamRole;
	bankNumber: string | null;
	bankAccountHolder: string | null;
	bankProvider: string | null;
	discordUserId: string | null;
	discordChannelId: string | null;
};

export enum TeamRole {
	ADMIN = "ADMIN",
	ARTIST = "ARTIST",
	CODER = "CODER",
}
