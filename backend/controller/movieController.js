import userModel from "../models/userModel.js"


export const postFavoriteMovie = async (req, res) => {
    try {
        const { movieId, userId, movieTitle, isFavorite, isWatchlist } = await req.body
        const user = await userModel.findById(userId)
        const filterMovie = user.movies.some((movie) => movie.movieId === movieId)
        if (filterMovie) {
            res.status(401).send("Movie duplicated")
        } else {
            user.movies.push({ movieId: movieId, title: movieTitle, isFavorite, isWatchlist })
            await user.save()
            res.status(201).send("Movie added")
        }
    }
    catch (error) {
        res.status(404).json('error favorite movie')
    }
}

export const deleteMovie = async (req, res) => {
    try {
        const { movieId, userId } = await req.body
        const user = await userModel.findById(userId)
        const indexMovie = user.movies.findIndex(item => item.movieId === movieId);
        if (indexMovie === -1) {
            return res.status(404).send("Movie not found")
        }
        const deleteItem = user.movies.splice(indexMovie, 1)
        await user.save()
        res.status(200).send(deleteItem)
    } catch (error) {
        res.status(404).json('error delete movie')

    }
}

export const getAllMovies = async (req, res) => {
    try {
        const userId = await req.params.id
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).send("user not found")
        } else {
            res.status(200).json(user.movies)
        }

    } catch (error) {
        res.status(404).json('error get all movies')

    }
}