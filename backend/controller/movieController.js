import userModel from "../models/userModel.js"


export const postFavoriteMovie = async (req, res) => {
    try {
        const { movieId, userId, movieTitle } = await req.body
        const user = await userModel.findById(userId)
        const filterMovie = user.movies.some((movie) => movie.movieId === movieId)
        if (filterMovie) {
            res.status(401).send("Movie duplicated")
        } else {
            user.movies.push({ movieId: movieId, title: movieTitle })
            await user.save()
            res.status(201).send("Movie added")
        }
    }
    catch (error) {
        res.status(404).json('error favorite movie')
    }
}