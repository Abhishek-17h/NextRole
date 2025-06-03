import superbaseClient from "@/utils/superbase";

export async function getCompanies(token) {
    const superbase = await superbaseClient(token);

    const { data, error } = await superbase
        .from("companies")
        .select("*");

    if (error) {
        throw error;
    }

    return data;
}