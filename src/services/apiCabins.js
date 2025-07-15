import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("cabins could not be deleted");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.trunc(Math.random() * 1000000000) + 1}-${
    newCabin.image.name
  }`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. create/edit cabin

  // A. edit cabin
  let query = supabase.from("cabins");

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  const { error: editError } = await query.select();
  if (editError) throw new Error("cabin could not be edited");

  // B. create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("cabin could not be created");
  }

  // 2. upload image
  // if image was already uploaded there is no need to upload it again
  if (hasImagePath) return;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // delete the cabin if there was an error while uploading image
  if (storageError) {
    const { data } = await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "cabin image could not be uploaded and cabin was not created"
    );
  }

  return data;
}
