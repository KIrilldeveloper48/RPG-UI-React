const URL = `https://randomuser.me/api/`

export const fetchRandomName = async () => (
  await fetch(URL)
    .then(res => res.json())
    .then(({ results }) => {
      const userData = results[0];
      return `${userData.name.first} ${userData.name.last}`;
    })
)
