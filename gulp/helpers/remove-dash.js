export const RemoveDash = word => {
	if (typeof word !== "string") return "";
	return word.replace(/-/g, "");
};
