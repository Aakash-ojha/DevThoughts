const getInitailName = (name: string | undefined) => {
  if (!name) return "??";
  const parts = name.trim().split(" ");

  return parts.length >= 2
    ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    : name.slice(0, 2).toUpperCase();
};
export default getInitailName;
