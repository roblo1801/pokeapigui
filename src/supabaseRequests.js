import { supabaseClient } from "./supabase";

export const getData = async ({ token, userId }) => {
  const supabase = await supabaseClient(token);
  console.log(supabase);

  const { data: userData } = await supabase
    .from("userdata")
    .select("*")
    .eq("user_id", userId);

  console.log(userData, "userData");

  return userData;
};

export const addToPokemon = async ({ token, userId, data }) => {
  const supabase = await supabaseClient(token);

  const { data: userData } = await supabase
    .from("userdata")
    .select("pokemon")
    .eq("user_id", userId);

  if (userData[0].pokemon) {
    if (userData[0].pokemon.includes(data.name)) return "Already Collected";

    const { data: collection } = await supabase
      .from("userdata")
      .update({
        pokemon: userData[0].pokemon.concat(data.name),
      })
      .eq("user_id", userId)
      .select("pokemon");
    return collection;
  }

  const { data: collection } = await supabase
    .from("userdata")
    .update({
      pokemon: [data.name],
    })
    .eq("user_id", userId)
    .select("pokemon");
  console.log(collection, "insert");
  return collection;
};

export const removeFromPokemon = async ({ token, userId, data }) => {
  const supabase = await supabaseClient(token);

  const { data: userData } = await supabase
    .from("userdata")
    .select("pokemon")
    .eq("user_id", userId);

  if (userData[0].pokemon) {
    if (!userData[0].pokemon.includes(data.name)) return "Not Collected";

    const indexOfData = userData[0].pokemon.findIndex(
      (pokemon) => pokemon === data.name
    );

    const { data: collection } = await supabase
      .from("userdata")
      .update({
        pokemon: userData[0].pokemon.toSpliced(indexOfData, 1),
      })
      .eq("user_id", userId)
      .select("pokemon");
    return collection;
  }

  return userData;
};

export const addToCards = async ({ token, userId, data }) => {
  const supabase = await supabaseClient(token);

  const { data: userData } = await supabase
    .from("userdata")
    .select("cards")
    .eq("user_id", userId);

  if (userData[0].cards) {
    if (userData[0].cards.includes(data.id)) return "Already Collected";

    const { data: collection } = await supabase
      .from("userdata")
      .update({
        cards: userData[0].cards.concat(data.id),
      })
      .eq("user_id", userId)
      .select("cards");
    return collection;
  }

  const { data: collection } = await supabase
    .from("userdata")
    .update({
      cards: [data.id],
    })
    .eq("user_id", userId)
    .select("cards");
  console.log(collection, "insert");
  return collection;
};

export const removeFromCards = async ({ token, userId, data }) => {
  const supabase = await supabaseClient(token);

  const { data: userData } = await supabase
    .from("userdata")
    .select("cards")
    .eq("user_id", userId);

  if (userData[0].cards) {
    if (!userData[0].cards.includes(data.id)) return "Not Collected";

    const indexOfData = userData[0].cards.findIndex(
      (pokemon) => pokemon === data.id
    );

    const { data: collection } = await supabase
      .from("userdata")
      .update({
        cards: userData[0].cards.toSpliced(indexOfData, 1),
      })
      .eq("user_id", userId)
      .select("cards");
    return collection;
  }

  return userData;
};
