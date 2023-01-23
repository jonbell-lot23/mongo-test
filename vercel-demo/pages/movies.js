import clientPromise from "../lib/mongodb";

export default function Movies({ movies }) {
  return (
    <div>
      <ul className="bg-red-500">
        {movies.map((movie) =>
          movie.poster ? <img src={movie.poster} width="200" /> : null
        )}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const movies = await db
      .collection("movies")
      .find({})
      .sort({ metacritic: -1 })
      .limit(200)
      .toArray();

    return {
      props: { movies: JSON.parse(JSON.stringify(movies)) },
    };
  } catch (e) {
    console.error(e);
  }
}
